'use strict'

const input=document.getElementById('todo-input');
const btn_add=document.querySelector('.btn-add');
const tasks=document.querySelector('.tasks')
const task=document.querySelector('.task')
const required_field=document.querySelector('.required_field')
const second_task=document.querySelector('.second-task')

// btn_add.style.backgroundColor='red'



// tasks.append(new_task)

let taskArray=[];


if (localStorage.getItem('tasks')) {
    
    taskArray = JSON.parse(localStorage.getItem('tasks'));
    
    taskArray.forEach((taskTitle) => {
        const new_task = createTask(taskTitle);
        listMounted(new_task);
    });
}

btn_add.addEventListener('click', addTask);

function addTask(event){
    event.preventDefault();
    // event.stopPropogation();

    let newTitle=input.value;

    if(newTitle.trim() !== ""){
        let new_task=createTask(newTitle)
        listMounted(new_task);
        taskArray.push(newTitle)
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }else{
        alert("The input is empty");
        // required_field.style.color='red'
        // required_field.innerText="The new task should not be empty*";
       
    }
    
    input.value=""
    
    
}

function createTask(title){
    const new_task=document.createElement('div');
    new_task.classList.add('task');

    new_task.style.display='flex';
    
   
    const span=document.createElement('span');
    span.innerText=title;

    const new_btns=document.createElement('div');
    new_btns.classList.add('btns');
   
    const update_btn=document.createElement('button');
    
    update_btn.innerText='Update';
    update_btn.style.backgroundColor='green';
    update_btn.style.color='white';

    const delete_btn=document.createElement('button');
    
    delete_btn.innerText="Delete";
    
    new_btns.append(update_btn,delete_btn);

    new_task.append(span,new_btns);
    span.addEventListener('click', () => {
        moveTaskToCompleted(new_task);
    });
    
    
    update_btn.addEventListener('click', () => {
        updateTask(new_task);
    });
    
    return new_task;
    // return new_task
    
}


function listMounted(task_node){
    tasks.append(task_node);
}



function moveTaskToCompleted(task) {
    task.classList.add('completed');

   
    const taskButtons = task.querySelector('.task-buttons');
    if (taskButtons) {
        taskButtons.remove();
        // localStorage.setItem('tasks', JSON.stringify(taskArray));
    }

    second_task.appendChild(task);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}




function updateTask(task) {
const span = task.querySelector('span');
const newTitle = prompt('Enter the new title for the task:', span.innerText);
if (newTitle !== null) {
    span.innerText = newTitle;

}
}



tasks.addEventListener('click', handleDelete);

function handleDelete(event) {
    const targetElement = event.target;
    if (targetElement.innerText === 'Delete') {
        const task = targetElement.closest('.task');
        if (task) {
            const span = task.querySelector('span');
            const taskIndex = taskArray.indexOf(span.innerText);
            if (taskIndex !== -1) {
                taskArray.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(taskArray));
            }
          
            task.remove();
        }
    }
}




