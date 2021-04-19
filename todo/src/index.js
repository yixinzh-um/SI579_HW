import * as moment from 'moment';
// import $ from 'jquery';
//local storage
const savedDailyStr = localStorage.getItem('daily');
const savedDailyElements = savedDailyStr ? JSON.parse(savedDailyStr) : [];
const savedTodayStr = localStorage.getItem('today');
const savedTodayElements = savedDailyStr ? JSON.parse(savedTodayStr) : [];

//time settings
const timeLeft=document.getElementById('time_left');
const currentTask=document.getElementById('current_task');
const clock=document.getElementById('clock');
const dailyListElem = document.getElementById('dailyList');
const todayListElem = document.getElementById('todayList');


//task list
const dailyAddButton = document.getElementById('daily_button');
const todayAddButton = document.getElementById('today_button');
const dailyInputElem = document.getElementById('daily_input');
const todayInputElem = document.getElementById('today_input');

const taskEditHourElem=document.getElementById('task_focus');
const hourInputElem=document.getElementById('hour_input');

const finishedButton=document.getElementById('finished')

dailyAddButton.addEventListener('click',()=>{
    const task = dailyInputElem.value;
    if(task){
    addTask(task,'daily',dailyListElem,savedDailyElements)};
    dailyInputElem.value=""

})

todayAddButton.addEventListener('click',()=>{
    
    const task = todayInputElem.value;
    if(task){
        
    addTask(task,'today',todayListElem,savedTodayElements)};
    todayInputElem.value="";
})

hourInputElem.addEventListener('click',()=>{
    
    if(taskEditHourElem.textContent){
        console.log(1);
    let hourInput = hourInputElem.value;
    
    let taskFocus = taskEditHourElem.textContent;
    let taskHourElem = document.getElementById(taskFocus).children[1];
    // console.log(taskHourElem);
    taskHourElem.textContent = hourInput;
    }
})


finishedButton.addEventListener('click', finishTask)


function addTask(task,type,listElem,savedElements){
///////new///////////////////////////////////
    savedElements.push(task);
    localStorage.setItem(type,JSON.stringify(savedElements)) 
    updateTaskDisplay(type,listElem,savedElements);


}


function updateTaskDisplay(type,listElem,savedElements){
    listElem.innerHTML="";
    
    savedElements.forEach((task,idx)=>{
        
        const taskItemElem = document.createElement('div');
        const taskItemElemSub = document.createElement('div');
        const priorityElem=document.createElement('div');
        const removeButton=document.createElement('i');
        taskItemElem.setAttribute('class','py-2 mb-0 small lh-sm border-bottom w-100 taskItem');
        taskItemElemSub.setAttribute('class','d-flex justify-content-between');
        
        priorityElem.style.backgroundColor='#007bff';
        priorityElem.style.width='32px';
        priorityElem.style.height='32px';

        removeButton.setAttribute('class','fas fa-trash')
        removeButton.style.display = 'inline-block';
        removeButton.style.position = 'relative';
        removeButton.addEventListener('click',()=>{
            savedElements.splice(idx,1);
            localStorage.setItem(type,JSON.stringify(savedElements));
            console.log(savedDailyElements);
            updateTaskDisplay(type,listElem,savedElements);
            const rowElem = document.getElementById(task);
            rowElem.remove();
            
            
            
        })
        taskItemElemSub.append(priorityElem);
        taskItemElemSub.textContent=task;
        taskItemElemSub.append(removeButton);
        taskItemElem.append(taskItemElemSub);
        listElem.append(taskItemElem);
        updateTaskList(task);
        
    })
}





///////////////////////////////////old/////////////////////////////////////

function updateTaskList(task){
    const rowElem=document.createElement('tr');
    const taskTd=document.createElement('td');
    const hourTd=document.createElement('td');

    const HourInput=document.getElementById('hour_input');
    const taskEditElm=document.getElementById('task_edit');
    const tableElem= document.getElementById('table_content');
    

    // const taskText=document.createElement('p');
    // const removeButton=document.createElement('i');

    taskTd.textContent=task;
    // HourTd.textContent=0;
    rowElem.id=task;
    rowElem.append(taskTd);
    rowElem.append(hourTd);
    rowElem.addEventListener('click',()=>{
        taskEditHourElem.textContent=task;
        taskToCurrent(task,rowElem);
    })
    tableElem.append(rowElem);
    $('#table').bootstrapTable();
    console.log(tableElem);}


function updateCurrentTask(){
    var diff= moment(clock.textContent,'YYYY-MM-DD HH:mm:ss A').diff(moment());
    
    if (diff>0){
        var update=setInterval(updateTimeLeft,1000);}    
};

function updateTimeLeft(){
    
    const clock = document.getElementById('clock');
    var diff= moment(clock.textContent,'YYYY-MM-DD HH:mm:ss A').diff(moment());
    if (diff<=0){
        
        timeLeft.textContent=moment.utc(0).format('HH:mm:ss');
    }else{
    timeLeft.textContent=moment.utc(diff).format('HH:mm:ss');
    
}}





function finishTask(){
    const taskText= document.getElementById(currentTask.textContent).children[0];
    // console.log(taskText);
    taskText.setAttribute('style','display:inline-block;text-decoration:line-through;color:black;')
    clock.textContent=moment().format('YYYY-MM-DD HH:mm:ss A');
    timeLeft.textContent=moment.utc(0).format('HH:mm:ss');
    
}


function taskToCurrent(task,rowElem){
    currentTask.textContent=task;
    
    const hours=rowElem.children[1].textContent;
    clock.textContent=moment().add(hours,'hour').format('YYYY-MM-DD HH:mm:ss A');
    timeLeft.textContent=moment.utc(hours*60*60*1000).format('HH:mm:ss')
    updateCurrentTask();  
};

updateTaskDisplay('daily',dailyListElem,savedDailyElements);
updateTaskDisplay('today',todayListElem,savedTodayElements);