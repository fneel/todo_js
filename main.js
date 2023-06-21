document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.getElementById("create-form");
  const todoListItem = document.getElementById("todo-list");
  const doneListItem = document.getElementById("done-list");
  //let todoItems = [];

  //hämta tidigare sparade todos 
  var savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(function(todo) {
    var todoItem = createTodoItem(todo.title, todo.descriptionm, todo.createdDate, todo.completedDate);
    if (todo.completed) {
      doneListItem.appendChild(todoItem);
    } else {
      todoListItem.appendChild(todoItem);
    }
    
  });

// lyssnar efter submit, sen förhinra att sidan refreshar
createForm.addEventListener("submit"), function (event) {
   event.preventDefault();


   var todoInput = createForm.querySelector('input');
   var title = todoInput.value;
   var description = todoInput.value;
   var createdDate = new Date().toLocaleString();

   if (title.trim() === '') {
    alert('A title would be nice');
    return;
   }

   //create a new todo
   function createTodoItem(title, description, createdDate, completedDate) {
      var todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = '<h3>' + title + '</h3><p>' + description + '</p><p>Created: ' + createdDate + '</p>';
   }

   //creates a <li> -element for new todos
   var todoItem = createTodoItem(title, description, createdDate);
   todoListItem.appendChild(todoItem);



   };

   // function createTodo(description, todos, after) {
//   //från dummyjson
//   fetch("https://dummyjson.com/todos/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       todo: "Use DummyJSON in the project",
//       completed: false,
//       userId: 5,
//     }),
//   })
//     .then((res) => res.json())
//     .then((value) => {
//       value.id = idCounter++;
//       todos.push(value);
//       after();
//     });
// }
//   let description = createTodo[0];
// }

// från 'freshman'
// function addTodo(text) {
//   const todo = {
//     text,
//     checked: false,
//     id: Date.now(),
//   };

//   todoItems.push(todo);
//   console.log(todoListItem);
// }
//  //välj elementet 'form'
// const form = document.querySelector('.js-form');
// //submit todo
// createForm.addEventListener('submit', (event) => {
// //förhindrar att sidan refreshar iom submit
//   event.preventDefault();
//   const input = document.querySelector('.js-todo-input');

//tar värdet av input och trimmar det
// const text = input.value.trim();
// if (text !== '') {
//   addTodo(text);
//   input.value.trim();
//   input.value = '';
//   input.focus();
// }

//});
