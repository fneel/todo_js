  const createForm = document.getElementById("create-form");
  const todoListItem = document.getElementById("todo-list");
  const doneListItem = document.getElementById("done-list");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  // const createdDate = document.getElementById("created-date");

  let todos = [];
  let idCounter = 31;

// document.addEventListener("DOMContentLoaded", function () {
// init();

createForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let description = createForm.children[0];

  createTodo(title.value, description.value, todos, () => {
    renderTodos(todos);
  });
  description.value = "";
});

// function init() {
//   fetch("https://dummyjson.com/todos")
//     .then((res) => res.json())
//     .then((values) => {
//       todos = values.todos;
//       renderTodos(todos);
//     });
// }

function renderTodos(todos) {
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

  //hämta tidigare sparade todos
  // let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  // savedTodos.forEach(function (todo) {
  //   let todoItem = createTodoItem(
  //     todo.title,
  //     todo.description,
  //     todo.createdDate,
  //     todo.completedDate
  //   );
  //   if (todo.completed) {
  //     doneListItem.appendChild(todoItem);
  //   } else {
  //     todoListItem.appendChild(todoItem);
  //   }
  // });

  // lyssnar efter submit, sen förhinra att sidan refreshar
  // createForm.addEventListener("submit", function (event) {
  //   event.preventDefault();

  //   var todoInput = createForm.querySelector("input");
  //   var title = todoInput.value;
  //   var description = description.value;
  //   //  var createdDate = new Date();
  //   var createdDate = new Date();
  //   if (title.trim() === "") {
  //     alert("A title would be nice");
  //     return;
  //   }
  // });

function createTodoElement(todo) {
  let li = document.createElement("li");
  li.classList.add("todo-item");
  let article = document.createElement("article");

  let description = document.createElement("p");
  let completed = document.createElement("input");
  let removeBtn = document.createElement("button");

  completed.type = "checkbox";
  description.innerText = todo.todo;
  completed.checked = todo.completed;
  removeBtn.innerText = "Remove";

  completed.addEventListener("change", (event) => {
    todo.completed = event.target.checked;
    renderTodos(todos);
  });

  removeBtn.addEventListener("click", () => {
    removeTodo(todo, todos, () => {
      renderTodos(todos);
    });
  });

  article.append(description, completed, removeBtn);

  li.append(article);
  return li;
}

function createTodo(description, todos, after) {
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: description,
      completed: false,
      userId: 1, // Hardcode this property since it is unused.
    }),
  })
    .then((res) => res.json())
    .then((value) => {
      value.id = idCounter++; // Fake this value because otherwise all created todos will have id 151.
      todos.push(value);
      after();
    });
}

function removeTodo(todo, todos, after) {
  fetch("https://dummyjson.com/todos/" + todo.id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((value) => {
      if (value.isDeleted) {
        let index = todos.findIndex((todo) => todo.id === value.id);
        if (index !== -1) {
          todos.splice(index, 1);
        }}
        after();
})};
//   //skapa <li> -element för nya todos
//   var todoItem = createTodoItem(title, description, createdDate);
//   todoListItem.appendChild(todoItem);
//   //återställer formuläret
//   createForm.reset();

//   // lagrar ny todo i localStorage
//   var newTodo = {
//     title: title,
//     description: description,
//     createdDate: createdDate,
//     completedDate: null,
//     completed: false,
//   };
//   savedTodos.push(newTodo);
//   localStorage.setItem("todos", JSON.stringify(savedTodos));

//   //skapa ny todo-item
//   function createTodoItem(title, description, createdDate, completedDate) {
//     var todoItem = document.createElement("li");
//     todoItem.classList.add("todo-item");
//     todoItem.innerHTML =
//       "<h3>" +
//       title +
//       "</h3><p>" +
//       description +
//       "</p><p>Created: " +
//       createdDate +
//       "</p>";

//     // knapp för att markera todo som genomförd
//     var completeButton = document.createElement("button");
//     completeButton.innerText = "You did it?!";
//     todoItem.appendChild(completeButton);
//     //
//     completeButton.addEventListener("click"),
//       function () {
//         let completedDate = new Date().toLocaleString();
//         todoItem.removeChild(completeButton);
//         todoItem.innerHTML += "<p>Done: " + completedDate + "</p>";

//         let index = savedTodos.findIndex(function (todo) {
//           return todo.title === description;
//         });

//         if (index !== -1) {
//           savedTodos[index].completed = true;
//           savedTodos[index].completedDate = completedDate;
//           localStorage.setItem("todos", JSON.stringify(savedTodos));
//         }
//       };
//   }
// });
