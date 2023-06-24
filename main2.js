
  const createForm = document.getElementById("create-form");
  const todoListItem = document.getElementById("todo-list");
  const doneListItem = document.getElementById("done-list");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const createdDate = document.getElementById("created-date");

  let todoItems = [];

document.addEventListener("DOMContentLoaded", function () {

  //hämta tidigare sparade todos
  var savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(function (todo) {
    var todoItem = createTodoItem(
      todo.title,
      todo.description,
      todo.createdDate,
      todo.completedDate
    );
    if (todo.completed) {
      doneListItem.appendChild(todoItem);
    } else {
      todoListItem.appendChild(todoItem);
    }
  });

  // lyssnar efter submit, sen förhinra att sidan refreshar
  createForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var todoInput = createForm.querySelector("input");
    var title = todoInput.value;
    var description = description.value;
    //  var createdDate = new Date();
    var createdDate = new Date();
    // var dd = String(createdDate.getDate()).padStart(2, "0");
    // var mm = String(createdDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = createdDate.getFullYear();

    // createdDate = mm + "/" + dd + "/" + yyyy;
    //document.write(createdDate);
    //console.log(createdDate);

    if (title.trim() === "") {
      alert("A title would be nice");
      return;
    }
  });

  //skapa <li> -element för nya todos
  var todoItem = createTodoItem(title, description, createdDate);
  todoListItem.appendChild(todoItem);
  //återställer formuläret
  createForm.reset();

  // lagrar ny todo i localStorage
  var newTodo = {
    title: title,
    description: description,
    createdDate: createdDate,
    completedDate: null,
    completed: false,
  };
  savedTodos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));

  //skapa ny todo-item
  function createTodoItem(title, description, createdDate, completedDate) {
    var todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML =
      "<h3>" +
      title +
      "</h3><p>" +
      description +
      "</p><p>Created: " +
      createdDate +
      "</p>";

    // knapp för att markera todo som genomförd
    var completeButton = document.createElement("button");
    completeButton.innerText = "You did it?!";
    todoItem.appendChild(completeButton);
    //
    completeButton.addEventListener("click"),
      function () {
        let completedDate = new Date().toLocaleString();
        todoItem.removeChild(completeButton);
        todoItem.innerHTML += "<p>Done: " + completedDate + "</p>";

        let index = savedTodos.findIndex(function (todo) {
          return todo.title === description;
        });

        if (index !== -1) {
          savedTodos[index].completed = true;
          savedTodos[index].completedDate = completedDate;
          localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
      };
  }
});
