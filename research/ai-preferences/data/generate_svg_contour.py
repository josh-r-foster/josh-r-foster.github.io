import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import urllib.parse
import os

def main():
    csv_path = "./research/ai-preferences/data/results.csv"
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return

    df = pd.read_csv(csv_path)
    
    # We expect 'menu_type' == 'estimation' and 'menu_type' == 'mirror'
    est = df[df['menu_type'] == 'estimation'].copy()
    mir = df[df['menu_type'] == 'mirror'].copy()
    
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
    
    grid_df = points.pivot(index='sigma_grid', columns='mu_grid', values='score')
    grid_df = grid_df.sort_index()
    
    if base_sigma in grid_df.index and base_mu in grid_df.columns:
        grid_df.at[base_sigma, base_mu] = 0.0
        
    X = grid_df.index.values    # sigma
    Y = grid_df.columns.values  # mu
    Z = grid_df.values.T        # Transpose Z so rows match mu (Y) and cols match sigma (X)
    Z_plot = np.nan_to_num(Z, nan=0.0)
    
    # Use a dummy figure to extract the contour path without showing it
    fig, ax = plt.subplots()
    CS = ax.contour(X, Y, Z_plot, levels=[0.0])
    
    # Extract the paths from the contour
    try:
        paths = CS.collections[0].get_paths()
    except AttributeError:
        paths = CS.get_paths()
    
    # SVG construction
    svg_width = 1000
    svg_height = 1000
    
    # SVG origin (sigma=0, mu=0)
    origin_x = 351
    origin_y = 751
    scale = 10.0 # 10 pixels per unit
    
    svg_paths_str = ""
    for path in paths:
        vertices = path.vertices
        # Map to SVG coordinates
        svg_vertices = []
        for sigma, mu in vertices:
            vx = origin_x + sigma * scale
            vy = origin_y - mu * scale
            svg_vertices.append(f"{vx},{vy}")
        
        # Build the 'd' attribute for the SVG path
        if svg_vertices:
            d = "M " + " L ".join(svg_vertices)
            svg_paths_str += f"<path d='{d}' fill='none' stroke='%234F2683' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/>"

    # Base bundle dot at (30, 10)
    base_x = origin_x + base_sigma * scale
    base_y = origin_y - base_mu * scale
    
    svg = f"""<svg xmlns='http://www.w3.org/2000/svg' width='{svg_width}' height='{svg_height}'>
        {svg_paths_str}
        <circle cx='{base_x}' cy='{base_y}' r='7.5' fill='%234F2683'/>
        <text x='{base_x + 16}' y='{base_y + 5}' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='black'>Base Bundle</text>
    </svg>"""

    # Print the encoded data URL for CSS
    encoded_svg = urllib.parse.quote(svg.replace('\n', '').replace('    ', ''))
    data_url = f"url(\"data:image/svg+xml,{encoded_svg}\")"
    
    with open("svg_output.txt", "w") as f:
        f.write(data_url)
        
    print("Successfully generated svg_output.txt!")

if __name__ == "__main__":
    main()
