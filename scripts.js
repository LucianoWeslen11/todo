// Elements HTML
const listTodos = document.querySelector("#app .list-todos");
const input = document.querySelector("#app .input-group input");
const button = document.querySelector("#app .input-group button");

// Load list
const todos = JSON.parse(localStorage.getItem("list_todos")) || [];

// function for render list
function renderListTodos() {
  // Clear List
  listTodos.innerHTML = "";

  // If list is empty
  if (todos.length == 0) {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("class", "noItem");
    const todoText = document.createTextNode("Não há TO:DO cadastrado");

    todoItem.appendChild(todoText);
    listTodos.appendChild(todoItem);
  } else {
    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.setAttribute("class", "todo");
      const todoText = document.createTextNode(todo);

      const buttonRemove = document.createElement("button");
      buttonRemove.setAttribute("class", "remove");
      const imageButton = document.createElement("img");
      imageButton.setAttribute("src", "assets/icons/remove.svg");

      const pos = todos.indexOf(todo);

      buttonRemove.addEventListener("click", function () {
        removeTodo(pos);
      });

      const buttonRemoveText = document.createTextNode("X");

      buttonRemove.appendChild(imageButton);

      todoItem.appendChild(todoText);
      todoItem.appendChild(buttonRemove);
      listTodos.appendChild(todoItem);
    });
  }
}
// function for add new item
function addTodo() {
  const todoText = input.value;

  if (todoText !== "") {
    todos.push(todoText);
  }

  input.value = "";

  reload();
}

// function for remove item
function removeTodo(pos) {
  todos.splice(pos, 1);

  reload();
}

// function save storage
function saveToStorage() {
  localStorage.setItem("list_todos", JSON.stringify(todos));
}

function reload() {
  renderListTodos();
  saveToStorage();
}

renderListTodos();

button.addEventListener("click", function () {
  addTodo();
});
