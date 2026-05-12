import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import argparse
import os

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", type=str, required=True, help="Path to binary_results.csv")
    parser.add_argument("--out", type=str, default="indifference_curve.png", help="Output plot image")
    parser.add_argument("--base_mu", type=float, default=10.0, help="Base mu")
    parser.add_argument("--base_sigma", type=float, default=30.0, help="Base sigma")
    parser.add_argument("--summary_report", type=str, help="Path to summary_report.txt to extract structural estimates")
    args = parser.parse_args()
    
    print(f"Loading {args.csv}")
    df = pd.read_csv(args.csv)
    
    # We expect 'menu_type' == 'estimation' and 'menu_type' == 'mirror'
    est = df[df['menu_type'] == 'estimation'].copy()
    mir = df[df['menu_type'] == 'mirror'].copy()
    
    if len(est) == 0 or len(mir) == 0:
        print("Error: Missing estimation or mirror menus in the dataset.")
        return
        
    # Merge on pair_id
    paired = est.merge(mir[['pair_id', 'delta_u']], on='pair_id', suffixes=('_est', '_mir'))
    
    if len(paired) == 0:
        print("Error: Could not pair canonical and mirror menus.")
        return
        
    # delta_z = 0.5 * (delta_u_canonical - delta_u_mirror)
    paired['delta_z'] = 0.5 * (paired['delta_u_est'] - paired['delta_u_mir'])
    
    base_mu = args.base_mu
    base_sigma = args.base_sigma
    
    def get_grid_point(row):
        # If A is the base bundle:
        if abs(row['mu_A'] - base_mu) < 1e-9 and abs(row['sigma_A'] - base_sigma) < 1e-9:
            # delta_z is logit(A) - logit(B) = logit(Base) - logit(Grid)
            # So logit(Grid) - logit(Base) = -delta_z
            return row['mu_B'], row['sigma_B'], -row['delta_z']
        else:
            # B is the base bundle, A is grid
            # delta_z is logit(A) - logit(B) = logit(Grid) - logit(Base)
            return row['mu_A'], row['sigma_A'], row['delta_z']

    # Apply the logic
    points = paired.apply(get_grid_point, axis=1, result_type='expand')
    points.columns = ['mu_grid', 'sigma_grid', 'score']
    
    # Pivot to a 2D grid
    grid_df = points.pivot(index='sigma_grid', columns='mu_grid', values='score')
    grid_df = grid_df.sort_index()  # y-axis is sigma
    
    # Make sure we don't have NaNs blocking the contour
    # The base point itself isn't in the grid (we skipped it during generation)
    # We should add it back as exactly 0 so the contour connects properly
    if base_sigma in grid_df.index and base_mu in grid_df.columns:
        grid_df.at[base_sigma, base_mu] = 0.0
    else:
        # If the grid didn't naturally include the exact row/col, we can't easily insert it
        pass
        
    X = grid_df.index.values    # sigma
    Y = grid_df.columns.values  # mu
    Z = grid_df.values.T        # Transpose Z so rows match mu (Y) and cols match sigma (X)
    
    # Fill any remaining NaNs with nearest or 0 for plotting robustness
    Z_plot = np.nan_to_num(Z, nan=0.0)
    
    plt.figure(figsize=(10, 8))
    
    max_val = max(0.1, np.max(np.abs(Z_plot)))
    
    # Plot heatmap
    plt.pcolormesh(X, Y, Z_plot, shading='nearest', cmap='RdBu', vmin=-max_val, vmax=max_val)
    plt.colorbar(label='Logit(Grid) - Logit(Base)')
    
    # Plot empirical indifference curve (Z = 0)
    tolerance = max_val * 0.05
    try:
        CS = plt.contour(X, Y, Z_plot, levels=[-tolerance, 0.0, tolerance], colors=['gray', 'black', 'gray'], linestyles=['dashed', 'solid', 'dashed'])
        plt.clabel(CS, inline=True, fontsize=8)
    except ValueError:
        print("Warning: Could not draw contours (maybe not enough data points)")
        
    # Extract model name for title from the csv path
    # e.g., .../meta-llama_Llama-3.1-8B-Instruct/results.csv
    import os
    model_name_safe = os.path.basename(os.path.dirname(args.csv))
    plt.title(f'Indifference Curve ({model_name_safe})')
    
    # Plot structural estimated indifference curve if summary report provided
    if args.summary_report and os.path.exists(args.summary_report):
        theta_mu = None
        theta_mu2 = None
        theta_sigma2 = None
        
        with open(args.summary_report, 'r') as f:
            for line in f:
                if "unrestricted_mv" in line and "paired corrected" in line and "paired_unrestricted_mv" in line:
                    tokens = line.strip().split()
                    if len(tokens) >= 14:
                        try:
                            theta_mu = float(tokens[7])
                            theta_mu2 = float(tokens[11])
                            theta_sigma2 = float(tokens[13])
                        except ValueError:
                            pass
                    break
                    
        if theta_mu is not None and theta_mu2 is not None and theta_sigma2 is not None:
            U_base = theta_mu * base_mu + theta_mu2 * (base_mu**2) + theta_sigma2 * (base_sigma**2)
            
            # Create a dense grid for the structural curve
            sigma_dense = np.linspace(min(X), max(X), 200)
            mu_dense = np.linspace(min(Y), max(Y), 200)
            Sigma_grid, Mu_grid = np.meshgrid(sigma_dense, mu_dense)
            U_grid = theta_mu * Mu_grid + theta_mu2 * (Mu_grid**2) + theta_sigma2 * (Sigma_grid**2)
            
            plt.contour(Sigma_grid, Mu_grid, U_grid, levels=[U_base], colors=['gold'], linestyles=['dotted'], linewidths=[2.5])
            # Dummy plot for legend
            plt.plot([], [], color='gold', linestyle='dotted', linewidth=2.5, label='Structural Curve (Unrestricted MV)')
        else:
            print("Warning: Could not parse unrestricted_mv from summary_report.txt")
    
    # Mark the base point
    plt.plot([base_sigma], [base_mu], marker='*', color='gold', markersize=15, label=f'Base Bundle (sigma={base_sigma}, mu={base_mu})')
    
    plt.xlabel('Risk (sigma)')
    plt.ylabel('Expected Return (mu)')
    plt.legend()
    
    plt.grid(True, alpha=0.3)
    
    os.makedirs(os.path.dirname(args.out) if os.path.dirname(args.out) else '.', exist_ok=True)
    plt.savefig(args.out, dpi=300, bbox_inches='tight')
    print(f"Plot saved to {args.out}")

if __name__ == "__main__":
    main()
