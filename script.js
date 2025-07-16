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
  let todoHTML = "";

  // Generate task markup
  todoList.forEach((todo, index) => {
    let { name } = todo;
    todoHTML += `
      <div class="todo-task-box">
        <div class="check-box ${todo.done ? "checked" : ""}"></div>
        <div class="todo-task ${todo.done ? "done" : ""}">
          ${name}
        </div>
        <button class="dlt-btn">
          <img src="image/delete.svg" alt="">
        </button>
      </div>
    `;
  });

  // Inject all tasks at once
  document.querySelector(".todo-task-container").innerHTML = todoHTML;

  // Toggle done state
  document.querySelectorAll(".check-box").forEach((checkBox, index) => {
    checkBox.addEventListener("click", () => {
      checkBox.classList.toggle("checked");
      checkBox.nextElementSibling.classList.toggle("done");
      todoList[index].done = checkBox.classList.contains("checked");
      saveToStorage();
    });
  });

  // Delete task on button click
  document.querySelectorAll(".dlt-btn").forEach((dlt, index) => {
    dlt.addEventListener("click", () => {
      todoList.splice(index, 1);
      saveToStorage();
      renderPage();
    });
  });
}

// Initial render
renderPage();
