    // const title = document.getElementById("title");
  // const description = document.getElementById("description");
  // const createdDate = document.getElementById("created-date");


  
  const createForm = document.getElementById("create-form");
  const todoListItem = document.getElementById("todo-list");
  const doneListItem = document.getElementById("done-list");
  let todos = [];
  let idCounter = 31;

document.addEventListener("DOMContentLoaded", function () {


//skapar formuläret för todo
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  let title = document.getElementById("input-title");
  let description = document.getElementById("input-description");

  createTodo(title.value, description.value, todos, () => {
    renderTodos(todos);
  });
  description.value = "";
  title.value = "";
});



function renderTodos(todos) {
  todoListItem.innerHTML = "";
  doneListItem.innerHTML = "";
  for (let todo of todos) {
    let element = createTodoElement(todo);

    if (todo.done) {
      doneListItem.append(element);
    } else {
      todoListItem.append(element);
    }
  }
}


function createTodoElement(todo) {
  let li = document.createElement("li");
  li.classList.add("todo-item");
  let article = document.createElement("article");
  let title = document.createElement("h3");
  let description = document.createElement("p");

  let done = document.createElement("input");
  let removeBtn = document.createElement("button");

  done.type = "checkbox";
  title.innerText = todo.header;
  description.innerText = todo.todo;
  done.checked = todo.done;
  removeBtn.innerText = "Remove";

  done.addEventListener("change", (event) => {
    todo.done = event.target.checked;
    renderTodos(todos);
  });

  removeBtn.addEventListener("click", () => {
    removeTodo(todo, todos, () => {
      renderTodos(todos);
    });
  });

  article.append(title, description, done, removeBtn);

  li.append(article);
  return li;
}

function createTodo(title, description, todos, after) {
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      header: title,
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
});

  //hämta tidigare sparade todos
  // let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  // savedTodos.forEach(function (todo) {
  //   let todoItem = createTodoItem(
  //     todo.title,
  //     todo.description,
  //     todo.createdDate,
  //     todo.doneDate
  //   );
  //   if (todo.done) {
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
//     doneDate: null,
//     done: false,
//   };
//   savedTodos.push(newTodo);
//   localStorage.setItem("todos", JSON.stringify(savedTodos));

//   //skapa ny todo-item
//   function createTodoItem(title, description, createdDate, doneDate) {
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
//         let doneDate = new Date().toLocaleString();
//         todoItem.removeChild(completeButton);
//         todoItem.innerHTML += "<p>Done: " + doneDate + "</p>";

//         let index = savedTodos.findIndex(function (todo) {
//           return todo.title === description;
//         });

//         if (index !== -1) {
//           savedTodos[index].done = true;
//           savedTodos[index].doneDate = doneDate;
//           localStorage.setItem("todos", JSON.stringify(savedTodos));
//         }
//       };
//   }
// });
