const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  const todo = document.createElement('li');
  todo.className = 'todo-container';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.addEventListener('change', function () {
    updateUncheckedCount();
    saveTodos();
  });

  const input = document.createElement('input');
  input.className = 'todo-input';
  input.type = 'text';
  input.placeholder = 'Your task...';
  input.addEventListener('blur', function () {
    if (!this.value) {
      todo.remove();
      updateItemCount();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'todo-delete';
  deleteBtn.addEventListener('click', function () {
    todo.remove();
    updateItemCount();
    updateUncheckedCount();
    saveTodos();
  });

  todo.appendChild(checkbox);
  todo.appendChild(input);
  todo.appendChild(deleteBtn);

  list.appendChild(todo);

  updateItemCount();
  updateUncheckedCount();

  saveTodos();

  input.focus();

  return todo;
}

function updateItemCount() {
  const totalCount = list.getElementsByTagName('li').length;
  itemCountSpan.textContent = totalCount;
}

function updateUncheckedCount() {
  const uncheckedCount = list.querySelectorAll('input[type="checkbox"]:not(:checked)').length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function saveTodos() {
  const todos = [];
  list.querySelectorAll('li').forEach(todoEl => {
    const todo = {
      text: todoEl.querySelector('.todo-input').value,
      checked: todoEl.querySelector('.todo-checkbox').checked
    };
    todos.push(todo);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach(todo => {
    const todoEl = newTodo();
    todoEl.querySelector('.todo-input').value = todo.text;
    todoEl.querySelector('.todo-checkbox').checked = todo.checked;
  });
}

document.addEventListener('DOMContentLoaded', loadTodos);
