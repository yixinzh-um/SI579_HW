import moment from 'moment';
import {useRef,useState} from 'react';
import $ from 'jquery';




export default function TodoListDisplay(){
    const taskListElem = document.createElement('table')
    const savedStr = localStorage.getItem('saved');
    const savedElements = savedStr ? JSON.parse(savedStr) : [];

    let newTask;

    function addTask(){
        

        const newTaskElem=document.getElementById('taskInput')
        
        newTask = newTaskElem.value;
        savedElements.push({newTask});
        localStorage.setItem('saved',JSON.stringify(savedElements));
        newTaskElem.value='';
        updatedSavedElementDisplay();
        
    }


    function updatedSavedElementDisplay(){
        // taskListRef.current.value='';
        // console.log(document.getElementById('task_list'));
        
        savedElements.forEach(({newTask},idx)=>{

        const newTaskTr = document.createElement('tr');
        const TaskTd = document.createElement('td');
        const RemoveTd = document.createElement('td');
        const removeButton=document.createElement('i');
        removeButton.setAttribute('class','fas fa-trash');

        removeButton.addEventListener('click',()=>{
            savedElements.splice(idx,1)
            localStorage.setItem('saved',JSON.stringfy(savedElements))
            updatedSavedElementDisplay();
            })        

        TaskTd.textContent=newTask;
        RemoveTd.append(removeButton);
        newTaskTr.appendChild(TaskTd);
        newTaskTr.appendChild(RemoveTd);
        taskListElem.append(newTaskTr);  
        
        })
        return taskListElem;
        
    }

   const table = [updatedSavedElementDisplay()]


    return(

        <div className='row'>

        <div id='toDo' className='col-sm-4'>
            <h1>Task List</h1>


            <div>
  
            </div>
            <div id='add_input' >

                <input id='taskInput' className='col-sm-8' type='text' placeholder="task"/>
                <button id='add_button' onClick={addTask}>Add</button>

            </div>
        </div>


        <div id='inProgress'className='col-sm-7'>
 
            <h1>Current Task</h1>

            <h2 id='current_task'></h2>
            <div id='clock'></div>
            <div>
                <i className="fas fa-clock fa-9x"></i>
            </div>
            <div id='time_left'></div>
            <button id='finished'>Finished</button>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossOrigin="anonymous" />

       
        </div>  

    );



}
