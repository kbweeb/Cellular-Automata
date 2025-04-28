import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

class CellularAutomaton:
    def __init__(self, size, rule_function, neighbors='Moore', boundary='periodic'):
        self.size = size
        self.grid = np.random.randint(2, size=(size, size))  # Initialize grid with random 0s and 1s
        self.rule_function = rule_function
        self.neighbors = neighbors
        self.boundary = boundary
    
    def apply_boundary_conditions(self, i, j):
        """Apply boundary conditions: periodic or fixed edges."""
        if self.boundary == 'periodic':
            i = i % self.size
            j = j % self.size
        elif self.boundary == 'fixed':
            i = max(0, min(i, self.size - 1))
            j = max(0, min(j, self.size - 1))
        return i, j
    
    def get_neighbors(self, i, j):
        """Get neighbors based on chosen configuration (Moore or Von Neumann)."""
        neighbors = []
        if self.neighbors == 'Moore':
            # 8 neighbors (including diagonals)
            for di in [-1, 0, 1]:
                for dj in [-1, 0, 1]:
                    if di == 0 and dj == 0:
                        continue
                    ni, nj = self.apply_boundary_conditions(i + di, j + dj)
                    neighbors.append(self.grid[ni, nj])
        elif self.neighbors == 'Von Neumann':
            # 4 neighbors (N, E, S, W)
            for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                ni, nj = self.apply_boundary_conditions(i + di, j + dj)
                neighbors.append(self.grid[ni, nj])
        return neighbors
    
    def update(self):
        """Update the grid based on the rule function."""
        new_grid = self.grid.copy()
        for i in range(self.size):
            for j in range(self.size):
                neighbors = self.get_neighbors(i, j)
                new_grid[i, j] = self.rule_function(self.grid[i, j], neighbors)
        self.grid = new_grid
    
    def run(self, frames, interval=200):
        """Run the Cellular Automaton and animate."""
        fig, ax = plt.subplots()
        img = ax.imshow(self.grid, cmap='binary', interpolation='nearest')
        ax.set_title("Cellular Automaton")

        def update_frame(frame_num, img):
            self.update()
            img.set_data(self.grid)
            return img,

        ani = animation.FuncAnimation(fig, update_frame, fargs=(img,), frames=frames, interval=interval)
        plt.show()

def game_of_life_rule(cell, neighbors):
    """Conway's Game of Life rule."""
    total = sum(neighbors)
    if cell == 1:
        if total < 2 or total > 3:
            return 0  # Dies
        return 1  # Survives
    else:
        if total == 3:
            return 1  # Becomes alive
        return 0  # Remains dead

# Usage
size = 50  # Size of the grid (50x50)
rule_function = game_of_life_rule  # The rule function, e.g., Game of Life
neighbors_type = 'Moore'  # Type of neighborhood (Moore or Von Neumann)
boundary_type = 'periodic'  # Boundary condition (periodic or fixed)

# Create the CellularAutomaton instance
ca = CellularAutomaton(size=size, rule_function=rule_function, neighbors=neighbors_type, boundary=boundary_type)

# Run the Cellular Automaton with 100 frames
ca.run(frames=100, interval=100)
