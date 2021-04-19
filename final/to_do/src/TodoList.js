import moment from "moment";

const timeLeft=document.getElementById('time_left');
const currentTask=document.getElementById('current_task');
const clock=document.getElementById('clock');

function todoList(){

    function addTask(description){
        const taskList=document.getElementById('task_list');
        
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
        removeButton.addEventListener('click',()=>{
            newTask.remove()
        })

        newTask.setAttribute('style','margin-bottom:10px col-sm-1')
        newTask.append(descriptionText);
        newTask.append(HourInput);
        newTask.append(removeButton);
        taskList.append(newTask);
        newTask.addEventListener('click',function(){taskToCurrent(description,newTask)});
        taskToCurrent(description,newTask)   
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
        const descriptionInput = document.getElementById('task_input');
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
        
    };


    // setInterval(()=>{console.log(1)},1000); 




    return(
        <div class='row'>


        <div id='toDo' class='col-sm-4'>
            <h1>Task List</h1>
            <table>
                <tr><td>Task</td><td>Hour(s)</td></tr>
            </table>
            <ul id='task_list'>          
            </ul>
            <div id='add_input' >

                <input id='task_input' class='col-sm-8' type='text' placeholder="task"/>
                <button id='add_button'>Add</button>

            </div>
        </div>


        <div id='inProgress'class='col-sm-7'>
            <h1>Current Task</h1>
            <p>Click the task in the left side to add it to current</p>

            <h2 id='current_task'></h2>
            <div id='clock'></div>
            <i class="fas fa-clock fa-9x"></i>
            <div id='time_left'></div>
            <button id='finished'>Finished</button>
        </div>
    </div>  

    );

}

export default todoList;
