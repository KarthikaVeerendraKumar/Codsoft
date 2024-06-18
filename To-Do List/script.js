function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskList.removeChild(listItem);
        };

        listItem.appendChild(deleteButton);
        listItem.onclick = () => {
            listItem.classList.toggle('completed');
        };

        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}
