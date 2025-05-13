
# 🧬 Cellular Automaton Simulator

This project is a Python-based 2D **Cellular Automaton** simulator using `matplotlib` for visualization. It supports configurable rules, neighborhood types, and boundary conditions. By default, it runs **Conway’s Game of Life** on a 2D grid.

---

## 🧠 Features

* Supports **Moore** (8-neighbor) and **Von Neumann** (4-neighbor) neighborhoods
* **Periodic** and **fixed** boundary conditions
* Easily plug in your own **rule functions**
* Animated grid visualization using `matplotlib.animation`
* Default rule: **Conway’s Game of Life**

---

## 🛠️ Requirements

* Python 3.x
* `numpy`
* `matplotlib`

You can install the dependencies with:

```bash
pip install numpy matplotlib
```

---

## 🚀 How to Run

```bash
python cellular_automaton.py
```

Or, run it from a Python IDE or Jupyter Notebook.

---

## 🧾 Usage

### Modify Parameters

Inside the script:

```python
size = 50                     # Grid size (50x50)
rule_function = game_of_life_rule
neighbors_type = 'Moore'      # or 'Von Neumann'
boundary_type = 'periodic'    # or 'fixed'
```

You can also define and plug in your **own rule function**:

```python
def my_custom_rule(cell, neighbors):
    # Your logic here
    return new_state
```

Then pass it to the simulator:

```python
ca = CellularAutomaton(size=50, rule_function=my_custom_rule)
```

---

## 🎥 Output

The simulator will open a matplotlib window showing the evolving grid.
Each frame updates according to the rule you define.

---

## 📌 Example Rule: Conway’s Game of Life

```python
def game_of_life_rule(cell, neighbors):
    total = sum(neighbors)
    if cell == 1:
        return 1 if 2 <= total <= 3 else 0
    else:
        return 1 if total == 3 else 0
```

---

## 📂 Project Structure

```
cellular_automaton.py   # Main simulation script
```

You can rename this script as needed.

---

## 📄 License

This project is open-source and free to use under the MIT License.

---

Let me know if you want a version in Markdown format (`README.md`) or hosted on GitHub!
