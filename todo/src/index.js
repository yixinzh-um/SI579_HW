import * as moment from 'moment';
import $ from 'jquery';

const timeLeft=$('#time_left');
const currentTask=$('#current_task');
const clock=$('#clock');
const taskListElem = $('.taskList');
const taskList = $('#toDo');
console.log(taskListElem);

function addTask(description){

    const newTask=document.createElement('li');
    const HourInput=document.createElement('input');
    const descriptionText=document.createElement('p');
    const removeButton=document.createElement('i')

    descriptionText.textContent=description
    descriptionText.setAttribute('style','display:inline-block')
    descriptionText.setAttribute('id',description)
    HourInput.setAttribute('min','0');
    HourInput.setAttribute('type','number');
    HourInput.setAttribute('step','0.5');
    HourInput.setAttribute('class','col-sm-3 hour');
    HourInput.setAttribute('value','0');

    removeButton.setAttribute('class','fas fa-trash')


    newTask.setAttribute('style','margin-bottom:10px col-sm-1')
    newTask.append(descriptionText);
    newTask.append(HourInput);
    newTask.append(removeButton);
    
    newTask.addEventListener('click',function(){taskToCurrent(description,newTask)});
    taskList.append(newTask);
    taskToCurrent(description,newTask);   


///////new///////////////////////////////////
    const taskItemElem = document.createElement('div');
    const taskItemElemSub = document.createElement('div');
    const strongElem = document.createElement('strong')
    const aElem = document.createElement('a')
    taskItemElem.setAttribute('class','py-2 mb-0 small lh-sm border-bottom w-100 taskItem');
    taskItemElemSub.setAttribute('class','d-flex justify-content-between');
    strongElem.setAttribute('class','text-grey-dark');
    removeButton.style.display = 'inline-block';
    removeButton.style.position = 'relative';
    aElem.href='#'
    aElem.textContent='Follow'
    


    removeButton.addEventListener('click',()=>{
        newTask.remove();
        taskItemElem.remove();
    })

    taskItemElemSub.textContent=description;

    // taskItemElemSub.append(strongElem);
    taskItemElemSub.append(removeButton);
    taskItemElem.append(taskItemElemSub);
    taskListElem.append(taskItemElem);
    console.log(removeButton);   




}

function taskToCurrent(description,newTask){
    currentTask.textContent=description;
    
    const hours=newTask.children[1].value;
    clock.textContent=moment().add(hours,'hour').format('YYYY-MM-DD HH:mm:ss A');
    timeLeft.textContent=moment.utc(hours*60*60*1000).format('HH:mm:ss')
    updateCurrentTask();

    
};


addTask('Exercise')
addTask('Cooking')





const addButton=document.getElementById('add_button');

addButton.addEventListener('click',() =>{
    const descriptionInput = $('#task_input');
    const description=descriptionInput.value;
    if(!description){
        alert('Please enter a task');
}else if(document.getElementById(description)){
    alert('Task '+description+' already in the list')
}else{
    addTask(description);
    descriptionInput.value=''
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
    const descriptionText= document.getElementById(currentTask.textContent);
    descriptionText.setAttribute('style','display:inline-block;text-decoration:line-through;color:black;')
    clock.textContent=moment().format('YYYY-MM-DD HH:mm:ss A');
    timeLeft.textContent=moment.utc(0).format('HH:mm:ss');
    
}




