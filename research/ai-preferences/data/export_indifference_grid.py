"""
Export the indifference-curve grid data from results.csv to a compact JSON file
for use in the Reveal.js presentation's client-side canvas renderer.

Output format:
{
  "sigma": [14, 15, 16, ...],      // x-axis values (risk)
  "mu": [2, 3, 4, ...],            // y-axis values (expected return)
  "scores": [[...], ...],          // 2D array [mu_index][sigma_index] of delta_z scores
  "base_mu": 10.0,
  "base_sigma": 30.0
}
"""

import pandas as pd
import numpy as np
import json
import os

def main():
    csv_path = os.path.join(os.path.dirname(__file__), "results.csv")
    out_path = os.path.join(os.path.dirname(__file__), "indifference_grid.json")

    print(f"Loading {csv_path}")
    df = pd.read_csv(csv_path)

    # Split by menu_type
    est = df[df['menu_type'] == 'estimation'].copy()
    mir = df[df['menu_type'] == 'mirror'].copy()

    if len(est) == 0 or len(mir) == 0:
        print("Error: Missing estimation or mirror menus in the dataset.")
        return

    # Merge on pair_id and compute position-corrected delta_z
    paired = est.merge(mir[['pair_id', 'delta_u']], on='pair_id', suffixes=('_est', '_mir'))
    paired['delta_z'] = 0.5 * (paired['delta_u_est'] - paired['delta_u_mir'])

    base_mu = 10.0
    base_sigma = 30.0

    def get_grid_point(row):
        if abs(row['mu_A'] - base_mu) < 1e-9 and abs(row['sigma_A'] - base_sigma) < 1e-9:
            return row['mu_B'], row['sigma_B'], -row['delta_z']
        else:
            return row['mu_A'], row['sigma_A'], row['delta_z']

    points = paired.apply(get_grid_point, axis=1, result_type='expand')
    points.columns = ['mu_grid', 'sigma_grid', 'score']

    # Pivot to 2D grid
    grid_df = points.pivot(index='sigma_grid', columns='mu_grid', values='score')
    grid_df = grid_df.sort_index()

    # Insert base point as exactly 0
    if base_sigma in grid_df.index and base_mu in grid_df.columns:
        grid_df.at[base_sigma, base_mu] = 0.0

    sigma_vals = grid_df.index.tolist()       # x-axis: risk
    mu_vals = grid_df.columns.tolist()        # y-axis: expected return
    Z = grid_df.values.T                      # [mu_index][sigma_index]

    # Replace NaN with null for JSON
    scores = []
    for row in Z:
        scores.append([None if np.isnan(v) else round(float(v), 6) for v in row])

    result = {
        "sigma": [round(float(s), 4) for s in sigma_vals],
        "mu": [round(float(m), 4) for m in mu_vals],
        "scores": scores,
        "base_mu": base_mu,
        "base_sigma": base_sigma
    }

    with open(out_path, 'w') as f:
        json.dump(result, f)

    print(f"Exported {len(mu_vals)}×{len(sigma_vals)} grid to {out_path}")
    print(f"  sigma range: [{min(sigma_vals)}, {max(sigma_vals)}]")
    print(f"  mu range: [{min(mu_vals)}, {max(mu_vals)}]")
    print(f"  score range: [{np.nanmin(Z):.4f}, {np.nanmax(Z):.4f}]")

if __name__ == "__main__":
    main()
