const createTodo = document.getElementById("create-todo")
const todoListItem = document.getElementById("todo-list")
const doneListItem = document.getElementById("done-list")
let todos = [];


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
  .then(console.log);

  createTodo.addEventListener("submit"), (event) => {
    event.preventDefault();

    let description = createTodo[0];
  }
