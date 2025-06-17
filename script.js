const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoListPending = document.getElementById('todo-list-pending');
const todoListCompleted = document.getElementById('todo-list-completed');
const tabs = document.querySelectorAll('.tab');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentTab = 'pending';

function renderTodos() {
    todoListPending.innerHTML = '';
    todoListCompleted.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
            <span class="">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Excluir</button>
        `;
        if (todo.completed) {
            todoListCompleted.appendChild(li);
        } else {
            todoListPending.appendChild(li);
        }
    });
    saveTodos();
}

function showTab(tab) {
    currentTab = tab;
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[onclick="showTab('${tab}')"]`).classList.add('active');
    
    if (tab === 'pending') {
        todoListPending.style.display = 'block';
        todoListCompleted.style.display = 'none';
    } else {
        todoListPending.style.display = 'none';
        todoListCompleted.style.display = 'block';
    }
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

new Sortable(todoListPending, {
    group: 'todo-lists',
    animation: 150,
    onEnd: updateTodosOrder
});

new Sortable(todoListCompleted, {
    group: 'todo-lists',
    animation: 150,
    onEnd: updateTodosOrder
});


function updateTodosOrder() {
    const newTodos = [];
    const pendingItems = todoListPending.querySelectorAll('.todo-item');
    const completedItems = todoListCompleted.querySelectorAll('.todo-item');
    
    pendingItems.forEach((item) => {
        const index = todos.findIndex(t => t.text === item.querySelector('.todo-text').textContent && !t.completed);
        if (index !== -1) newTodos.push(todos[index]);
    });
    
    completedItems.forEach((item) => {
        const index = todos.findIndex(t => t.text === item.querySelector('.todo-text').textContent && t.completed);
        if (index !== -1) newTodos.push(todos[index]);
    });
    
    todos = newTodos;
    saveTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

renderTodos();
showTab('pending');