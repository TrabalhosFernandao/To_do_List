const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];


function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Excluir</button>
        `;
        todoList.appendChild(li);
    });
    saveTodos();
}


function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        renderTodos();
    }
}


function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}


function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


new Sortable(todoList, {
    animation: 150,
    onEnd: () => {
        const newTodos = [];
        todoList.querySelectorAll('.todo-item').forEach((item) => {
            const index = Array.from(todoList.children).indexOf(item);
            newTodos.push(todos[index]);
        });
        todos = newTodos;
        saveTodos();
    }
});


addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

renderTodos();