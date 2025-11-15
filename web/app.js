(() => {
  const canvas = document.getElementById('grid');
  const ctx = canvas.getContext('2d');
  const runBtn = document.getElementById('runBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stepBtn = document.getElementById('stepBtn');
  const clearBtn = document.getElementById('clearBtn');
  const speedInput = document.getElementById('speed');
  const wrapInput = document.getElementById('wrap');
  const sizeInput = document.getElementById('size');

  let rows = parseInt(sizeInput.value, 10);
  let cols = rows;
  let cellSize = Math.floor(Math.min(canvas.width, canvas.height) / rows);
  let grid = createGrid(rows, cols);
  let running = false;
  let rafId = null;

  function createGrid(r, c) {
    return Array.from({ length: r }, () => Array.from({ length: c }, () => 0));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = grid[y][x] ? '#4c6ef5' : '#13131d';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }

  function step() {
    const next = createGrid(rows, cols);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            let ny = y + dy;
            let nx = x + dx;
            if (wrapInput && wrapInput.checked) {
              // toroidal wrap
              ny = (ny + rows) % rows;
              nx = (nx + cols) % cols;
              neighbors += grid[ny][nx];
            } else {
              if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) neighbors += grid[ny][nx];
            }
          }
        }
        const alive = grid[y][x] === 1;
        if (alive && (neighbors < 2 || neighbors > 3)) next[y][x] = 0;
        else if (!alive && neighbors === 3) next[y][x] = 1;
        else next[y][x] = grid[y][x];
      }
    }
    grid = next;
    draw();
  }

  function loop() {
    if (!running) return;
    step();
    const delay = parseInt(speedInput.value, 10);
    rafId = setTimeout(() => requestAnimationFrame(loop), delay);
  }

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width / cellSize);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height / cellSize);
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      grid[y][x] = grid[y][x] ? 0 : 1;
      draw();
    }
  });

  runBtn.onclick = () => {
    if (!running) {
      running = true;
      loop();
    }
  };
  pauseBtn.onclick = () => {
    running = false;
    if (rafId) clearTimeout(rafId);
  };
  stepBtn.onclick = () => step();
  clearBtn.onclick = () => { grid = createGrid(rows, cols); draw(); };
  sizeInput.onchange = () => {
    rows = Math.max(10, Math.min(100, parseInt(sizeInput.value, 10) || 40));
    cols = rows;
    cellSize = Math.floor(Math.min(canvas.width, canvas.height) / rows);
    grid = createGrid(rows, cols);
    draw();
  };

  draw();
})();
