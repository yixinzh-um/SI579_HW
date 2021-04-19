import * as moment from 'moment';
import $ from 'jquery';

const savedStr = localStorage.getItem('saved');
const savedElements = savedStr ? JSON.parse(savedStr) : [];
const timeLeft=$('#time_left');
const currentTask=$('#current_task');
const clock=$('#clock');
const dailyListElem = document.getElementById('dailyList');
console.log(savedElements);
// console.log(dailyListElem);

const todaylistElem = $('#todayList');
const taskList = $('#toDo');

const dailyAddButton = document.getElementById('daily_button');
const todayAddButton = document.getElementById('#today_button');
const dailyInputElem = document.getElementById('daily_input');
const todayInputElem = document.getElementById('today_input');

dailyAddButton.addEventListener('click',()=>{
    const task = dailyInputElem.value;
    if(task){
    addTask(task,dailyListElem);}
})

todayAddButton.addEventListener('click',()=>{
    const task = todayInputElem.value;
    if(task){
    addTask(task,todayyListElem);}
})





function addTask(task, listElem){

    const newTask=document.createElement('li');
    const HourInput=document.createElement('input');
    const taskText=document.createElement('p');
    const removeButton=document.createElement('i');

    taskText.textContent=task
    taskText.setAttribute('style','display:inline-block')
    taskText.setAttribute('id',task)
    HourInput.setAttribute('min','0');
    HourInput.setAttribute('type','number');
    HourInput.setAttribute('step','0.5');
    HourInput.setAttribute('class','col-sm-3 hour');
    HourInput.setAttribute('value','0');



    newTask.setAttribute('style','margin-bottom:10px col-sm-1')
    newTask.append(taskText);
    newTask.append(HourInput);
    newTask.append(removeButton);
    
    newTask.addEventListener('click',function(){taskToCurrent(task,newTask)});
    taskList.append(newTask);
    taskToCurrent(task,newTask);   


///////new///////////////////////////////////
    savedElements.push(task);
    localStorage.setItem('saved',JSON.stringify(savedElements)) 
    updateTaskDisplay(listElem);


}

function taskToCurrent(task,newTask){
    currentTask.textContent=task;
    
    const hours=newTask.children[1].value;
    clock.textContent=moment().add(hours,'hour').format('YYYY-MM-DD HH:mm:ss A');
    timeLeft.textContent=moment.utc(hours*60*60*1000).format('HH:mm:ss')
    updateCurrentTask();

    
};

// const dailytask = ['Exercise','Cooking'];

// if (savedElements.length==0){
//     dailytask.forEach((task,idx)=>{
//         addTask(task,dailyListElem);
//         console.log(task);
//     })
// }

function updateTaskDisplay(listElem){
    // const t = listElem.innerText;
    listElem.innerHTML="";
    // listElem.innerText=t;
    savedElements.forEach((task,idx)=>{
        
        const taskItemElem = document.createElement('div');
        const taskItemElemSub = document.createElement('div');
        const removeButton=document.createElement('i');
        taskItemElem.setAttribute('class','py-2 mb-0 small lh-sm border-bottom w-100 taskItem');
        taskItemElemSub.setAttribute('class','d-flex justify-content-between');
        
        removeButton.setAttribute('class','fas fa-trash')
        removeButton.style.display = 'inline-block';
        removeButton.style.position = 'relative';
        removeButton.addEventListener('click',()=>{
            savedElements.splice(idx,1);
            localStorage.setItem('saved',JSON.stringify(savedElements));
            console.log(savedElements);
            updateTaskDisplay(listElem);
            
        })
    

        taskItemElemSub.textContent=task;
        taskItemElemSub.append(removeButton);
        taskItemElem.append(taskItemElemSub);
        listElem.append(taskItemElem);
        //mark 3
        console.log('mark3')
        
    })
}

updateTaskDisplay(dailyListElem);






///////////////////////////////////old/////////////////////////////////////
const addButton=document.getElementById('add_button');

addButton.addEventListener('click',() =>{
    const taskInput = $('#task_input');
    const task=taskInput.value;
    if(!task){
        alert('Please enter a task');
}else if(document.getElementById(task)){
    alert('Task '+task+' already in the list')
}else{
    addTask(task);
    taskInput.value=''
}})



function updateCurrentTask(){
    // const clock = document.getElementById('clock');
    var diff= moment(clock.textContent,'YYYY-MM-DD HH:mm:ss A').diff(moment());
    
    if (diff>0){
        var update=setInterval(updateTimeLeft,1000);}    
};

function updateTimeLeft(){
    
    // const clock = document.getElementById('clock');
    var diff= moment(clock.textContent,'YYYY-MM-DD HH:mm:ss A').diff(moment());
    if (diff<=0){
        
        timeLeft.textContent=moment.utc(0).format('HH:mm:ss');
    }else{
    timeLeft.textContent=moment.utc(diff).format('HH:mm:ss');
    
}}


const finishedButton=document.getElementById('finished')
finishedButton.addEventListener('click', finishTask)


function finishTask(){
    const taskText= document.getElementById(currentTask.textContent);
    taskText.setAttribute('style','display:inline-block;text-decoration:line-through;color:black;')
    clock.textContent=moment().format('YYYY-MM-DD HH:mm:ss A');
    timeLeft.textContent=moment.utc(0).format('HH:mm:ss');
    
}




