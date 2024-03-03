const todoForm = document.getElementById("todo-form");
const todoNameInput = document.getElementById("todo-name");
const todoDescriptionInput = document.getElementById("todo-description");
const todoDeadlineInput = document.getElementById("todo-deadline");
const todoList = document.getElementById("todo-list");
const filterOption = document.getElementById("filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();

    const newName = todoNameInput.value.trim();
    const newDescription = todoDescriptionInput.value.trim();
    const newDeadline = todoDeadlineInput.value.trim();

    if (!newName || !newDescription || !newDeadline) {
        alert("Please enter name, description, and select a deadline for the todo.");
        return;
    }

    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo");

    const todoName = document.createElement("div");
    todoName.classList.add("todo-name");
    todoName.innerText = newName;
    todoDiv.appendChild(todoName);

    const todoDescription = document.createElement("div");
    todoDescription.classList.add("todo-description");
    todoDescription.innerText = newDescription;
    todoDiv.appendChild(todoDescription);

    const todoDeadline = document.createElement("div");
    todoDeadline.classList.add("todo-deadline");
    todoDeadline.innerText = "Deadline: " + newDeadline;
    todoDiv.appendChild(todoDeadline);

    const todoOptions = document.createElement("div");
    todoOptions.classList.add("todo-options");

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoOptions.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoOptions.appendChild(trashButton);

    todoDiv.appendChild(todoOptions);

    todoList.appendChild(todoDiv);

    saveLocalTodos({ name: newName, description: newDescription, deadline: newDeadline, completed: false });

    todoNameInput.value = "";
    todoDescriptionInput.value = "";
    todoDeadlineInput.value = "";
}

function handleTodoClick(e) {
    const target = e.target;
    const todo = target.closest(".todo");

    if (target.classList.contains("complete-btn")) {
        toggleTodoComplete(todo);
    }

    if (target.classList.contains("trash-btn")) {
        removeTodoElement(todo);
    }
}

function toggleTodoComplete(todo) {
    todo.classList.toggle("completed");
    updateLocalTodos(todo);
}

function removeTodoElement(todo) {
    todo.remove();
    removeLocalTodos(todo);
}

function filterTodo() {
    const todos = document.querySelectorAll(".todo");
    todos.forEach(function (todo) {
        switch (filterOption.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
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

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("li");
        todoDiv.classList.add("todo");

        const todoName = document.createElement("div");
        todoName.classList.add("todo-name");
        todoName.innerText = todo.name;
        todoDiv.appendChild(todoName);

        const todoDescription = document.createElement("div");
        todoDescription.classList.add("todo-description");
        todoDescription.innerText = todo.description;
        todoDiv.appendChild(todoDescription);

        const todoDeadline = document.createElement("div");
        todoDeadline.classList.add("todo-deadline");
        todoDeadline.innerText = "Deadline: " + todo.deadline;
        todoDiv.appendChild(todoDeadline);

        const todoOptions = document.createElement("div");
        todoOptions.classList.add("todo-options");

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoOptions.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoOptions.appendChild(trashButton);

        todoDiv.appendChild(todoOptions);

        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = Array.from(todoList.children).indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = Array.from(todoList.children).indexOf(todo);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
}
