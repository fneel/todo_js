const todoListItem = document.getElementById("todo-list");
const doneListItem = document.getElementById("done-list");
let todos = [];
let idCounter = 1;


//ladda innehåll, skapa formulär, förhindra refresh
document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.getElementById("create-form");
  createForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    createTodo(titleInput.value, descriptionInput.value);
    titleInput.value = "";
    descriptionInput.value = "";
  });

  //skapa todo-element med alla delar
  function createTodoElement(todo) {
    let li = document.createElement("li");
    li.classList.add("todo-item");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let createdDate = document.createElement("p");
    let done = document.createElement("input");
    let removeBtn = document.createElement("button");

    done.type = "checkbox";
    title.innerText = todo.title;
    description.innerText = todo.description;
    createdDate.innerText = formatDate(todo.createdDate);
    done.checked = todo.completed;
    removeBtn.innerText = "Remove";

    done.addEventListener("change", () => {
      markAsCompleted(todo.id);
    });

    removeBtn.addEventListener("click", () => {
      removeTodo(todo.id);
    });

    li.append(title, description, createdDate, done, removeBtn);
    return li;
  }

 //visar upp todon i lista
  function renderTodos() {
    todoListItem.innerHTML = "";
    doneListItem.innerHTML = "";
    for (let todo of todos) {
      let element = createTodoElement(todo);
      if (todo.completed) {
        doneListItem.append(element);
      } else {
        todoListItem.append(element);
      }
    }
  }
//skapa innehållet
  function createTodo(title, description) {
    let todo = {
      id: idCounter++,
      title: title,
      description: description,
      createdDate: new Date().toISOString(),
      completed: false,
      completedDate: null,
    };
    todos.push(todo);
    renderTodos();
  }
//checka av som genomförd
  function markAsCompleted(todoId) {
    let todo = todos.find((item) => item.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      if (todo.completed) {
        todo.completedDate = new Date().toISOString();
      } else {
        todo.completedDate = null;
      }
      renderTodos();
    }
  }
//radera
  function removeTodo(todoId) {
    todos = todos.filter((item) => item.id !== todoId);
    renderTodos();
  }
//format för datum
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
});
