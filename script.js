let tasks = [];
let currentFilter = "all";

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, done: false });

    input.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

function clearAll() {
    tasks = [];
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    let count = document.getElementById("taskCount");

    list.innerHTML = "";

    let filtered = tasks.filter(t => {
        if (currentFilter === "active") return !t.done;
        if (currentFilter === "completed") return t.done;
        return true;
    });

    filtered.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.done ? 'done' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>

            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    count.innerText = tasks.length + " Tasks";
}

renderTasks();