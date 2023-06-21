const createTodo = document.getElementById("create-todo");
const todoListItem = document.getElementById("todo-list");
const doneListItem = document.getElementById("done-list");
let todos = [];

function createTodo(description, todos, after) {
  //från dummyjson
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: "Use DummyJSON in the project",
      completed: false,
      userId: 5,
    }),
  })
    .then((res) => res.json())
    .then((value) => {
      value.id = idCounter++;
      todos.push(value);
      after();
    });
}

// createTodo.addEventListener("submit"), (event) => {
//   event.preventDefault();

//   let description = createTodo[0];
// }

//från 'freshman'
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
// form.addEventListener('submit', event => {
// //förhindrar att sidan refreshar iom submit
//   event.preventDefault();
//   const text = input.value.trim();
//   if (text !== '') {
//     addTodo(text);
//     input.value.trim();
//     input.value = '';
//     input.focus();
//   }

// });
