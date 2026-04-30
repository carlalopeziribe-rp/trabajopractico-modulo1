const DEFAULTS = {
  seca: [
    "Limpiar con limpiador suave",
    "Tónico hidratante",
    "Serum con ácido hialurónico",
    "Crema nutritiva",
    "Protector solar"
  ],
  mixta: [
    "Limpiar rostro",
    "Tónico equilibrante",
    "Serum liviano",
    "Crema oil-free",
    "Protector solar"
  ],
  grasa: [
    "Limpieza profunda",
    "Tónico astringente",
    "Serum con niacinamida",
    "Crema ligera",
    "Protector solar oil-free"
  ]
};

let currentType = null;

function getKey(type) {
  return "rutina_" + type;
}

function loadTasks(type) {
  const data = localStorage.getItem(getKey(type));

  if (data) {
    const parsed = JSON.parse(data);

  
    if (parsed.length > 0) {
      return parsed;
    }
  }

  return DEFAULTS[type].map((t, i) => ({
    id: Date.now() + i,
    text: t,
    done: false
  }));
}

function saveTasks(type, tasks) {
  localStorage.setItem(getKey(type), JSON.stringify(tasks));
}

function renderTasks(type) {
  const list = document.getElementById("task-list");
  const title = document.getElementById("rutina-titulo");

  list.innerHTML = "";
  title.textContent = "Rutina para piel " + type;

  const tasks = loadTasks(type);

  console.log("Renderizando:", type, tasks);

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "d-flex align-items-center justify-content-between mb-2";

    const left = document.createElement("div");
    left.className = "d-flex align-items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = !task.done;
      saveTasks(type, tasks);
      renderTasks(type);
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.style.textDecoration = "line-through";

    left.appendChild(checkbox);
    left.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Eliminar";
    delBtn.className = "btn btn-sm btn-danger";

    delBtn.onclick = () => {
      const newTasks = tasks.filter(t => t.id !== task.id);
      saveTasks(type, newTasks);
      renderTasks(type);
    };

    li.appendChild(left);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("skin-select");
  const form = document.getElementById("task-form");
  const input = document.getElementById("new-task");
  const resetBtn = document.getElementById("reset-btn");

select.addEventListener("change", e => {
  const type = e.target.value.trim().toLowerCase();

  if (DEFAULTS[type]) {
    currentType = type;
    renderTasks(type);
  } else {
    console.warn("Tipo inválido:", type);
  }
});

form.addEventListener("submit", e => {
    e.preventDefault();

    if (!currentType) {
      alert("Primero elegí tu tipo de piel");
      return;
    }

    const tasks = loadTasks(currentType);

    tasks.push({
      id: Date.now(),
      text: input.value,
      done: false
    });

    saveTasks(currentType, tasks);
    input.value = "";
    renderTasks(currentType);
  });

resetBtn.addEventListener("click", () => {
    if (!currentType) return;

    localStorage.removeItem(getKey(currentType));
    renderTasks(currentType);
  });
});