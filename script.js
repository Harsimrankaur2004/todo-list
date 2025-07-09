let todoList = JSON.parse(localStorage.getItem('todoList')) || [
  {
    name: "Buy groceries",
    done: false
  },
  {
    name: "Read book",
    done: false
  }
];

saveToStorage();

let inputTask = document.getElementById("inputTask");

// It saves everything in localStorage
function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Add an event listener to add-button
document.querySelector(".add-btn")
  .addEventListener("click", () => {
    let name = inputTask.value.trim();

    if(name === "") return;

    todoList.push({ name, done: false });
    saveToStorage();
    renderPage();
    inputTask.value = '';
  });

// Add an event listener to inputTask
inputTask.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    let name = inputTask.value.trim();

    if(name === "") return;

    todoList.push({ name, done: false });
    saveToStorage();
    renderPage();
    inputTask.value = '';
  }
});

// It will render the whole page
function renderPage() {

  // A variable that saves the html
  let todoHTML = "";

  // It generates the HTML
  todoList.forEach((todo, index) => {
    let { name } = todo;
    todoHTML += `
    <div class="todo-task-box">
      <div class="check-box ${todo.done ? "checked": ""}">
      </div>
      <div class="todo-task ${todo.done ? "done" : ""}">
        ${name}
      </div>
      <button class="dlt-btn">
        <img src="image/delete.svg" alt="">
      </button>
    </div>
  `;
  });

  document.querySelector(".todo-task-container")
    .innerHTML = todoHTML;

  // console.log(todoHTML);


  // This code checked and unchecked the tick-box
  document.querySelectorAll(".check-box")
    .forEach((checkBox, index) => {
      checkBox.addEventListener("click", () => {
        checkBox.classList.toggle("checked");
        const taskText = checkBox.nextElementSibling;

        taskText.classList.toggle("done");

        todoList[index].done = checkBox.classList.contains("checked");
        saveToStorage();
      });
    });

  // Add an event listener to delete button
  document.querySelectorAll(".dlt-btn")
    .forEach((dlt, index) => {
      dlt.addEventListener("click", () => {
        todoList.splice(index, 1);
        saveToStorage();
        renderPage();
      });
    });
}

renderPage();
