const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoFilter = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", delTodo);
todoFilter.addEventListener("change", filterTodo);

//  addTodo
function addTodo(e) {
  e.preventDefault();

  if (todoInput.value === "") {
    todoInput.style.border = "solid 1px red";
    return;
  }
  // create Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // create button complete
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fa fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // create button trash
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //   append div to ul
  todoList.appendChild(todoDiv);

  //   clear input
  todoInput.value = "";
  todoInput.style.border = "none";

  //

  filterTodo();
}

//   delTodo
function delTodo(e) {
  const target = e.target;

  // trash button
  if (
    target.classList.contains("trash-btn") ||
    target.parentElement.classList.contains("trash-btn")
  ) {
    const todo = target.classList.contains("trash-btn")
      ? target.parentElement
      : target.parentElement.parentElement;
    todo.classList.add("slide");

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    filterTodo();
  }

  //  complete button
  if (
    target.classList.contains("complete-btn") ||
    target.parentElement.classList.contains("complete-btn")
  ) {
    const todo = target.classList.contains("complete-btn")
      ? target.parentElement
      : target.parentElement.parentElement;
    todo.classList.toggle("completed");
    filterTodo();
  }
}

// filterTodo

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (todoFilter.value) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
