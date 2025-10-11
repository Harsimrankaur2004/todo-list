let todoList = JSON.parse(localStorage.getItem('todoList')) || [
  { name: "Buy groceries", done: false },
  { name: "Read book", done: false }
];

// Ensures fallback data is stored
saveToStorage();

let inputTask = document.getElementById("inputTask");

// Isolated storage logic for reusability
function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Shared task-add logic for click/enter
function addTasks() {
  let name = inputTask.value.trim();
  if (name === "") return;

  todoList.push({ name, done: false });
  saveToStorage();
  renderPage();
  inputTask.value = '';
}

// Handles Add button
document.querySelector(".add-btn").addEventListener("click", () => {
  addTasks();
});

// Handles Enter key press
inputTask.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTasks();
  }
});

// Main render function — refreshes UI fully
function renderPage() {
  const container =   document.querySelector(".todo-task-container");
  container.innerHTML = "";
  
  // Generate task markup
  todoList.forEach((todo, index) => {
    const box = document.createElement("div");
    box.classList = "todo-task-box";

    const check = document.createElement("div");
    check.classList = "check-box";
    todo.done ? check.classList.add("checked") : "";

    const task = document.createElement("div");
    task.classList = "todo-task";
    todo.done ? task.classList.add("done") : "";

    task.textContent = todo.name;

    const delBtn = document.createElement("button");
    delBtn.classList = "dlt-btn";
    delBtn.innerHTML =  `<img src="image/delete.svg" alt="">`;

    // Toggle done state
    check.addEventListener("click", () => {
      check.classList.toggle("checked");
      task.classList.toggle("done");
      todoList[index].done = check.classList.contains("checked");
      saveToStorage();
    });

    // Delete task on button click
    delBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      saveToStorage();
      renderPage();
    });

    box.appendChild(check);
    box.appendChild(task);
    box.appendChild(delBtn);
    container.appendChild(box);
  });

}

// Initial render
renderPage();
