import React, { useRef, useState } from 'react'
import './DemoDragDrop.css';
import { useSpring, animated } from 'react-spring'

const defaultValue = [
    { id: 1, taskName: 'Task-1' },
    { id: 2, taskName: 'Task-2' },
    { id: 3, taskName: 'Task-3' },
    { id: 4, taskName: 'Task-4' },
    { id: 5, taskName: 'Task-5' },
]


export default function DemoDragDrop() {
    const [taskList, setTaskList] = useState(defaultValue)

const [propsSpring, set, stop] = useSpring(() => ({ from: { bottom: -25 }, to: { bottom: 0 },config:{duration:250},reset:true }));
    const taskDrag = useRef({})
    const tagDragEnter=useRef({})
    const handleDragStart = (e, task, index) => {
        taskDrag.current = task;
        // console.log(e.target)
    }
    console.log(taskDrag.current)

    const handleOnDragEnter = (e, taskDragEnter, index) => {
        set({bottom:0})
        tagDragEnter.current={...taskDragEnter}
        // console.log(e.target)
        const taskListUpdate = [...taskList];

        let indexTaskDrag = taskListUpdate.findIndex(task => task.id === taskDrag.current.id)
        // console.log(indexTaskDrag)
        let indexTaskDragEnter = taskListUpdate.findIndex(task => task.id === taskDragEnter.id)
        // console.log(indexTaskDragEnter)
        let temp = taskListUpdate[indexTaskDrag];
        taskListUpdate[indexTaskDrag] = taskListUpdate[indexTaskDragEnter];
        taskListUpdate[indexTaskDragEnter] = temp;
        setTaskList(taskListUpdate)
    }

    const handleDragEnd=(e)=>{
       
    }   


    return (
        <div className='container ' onDragOver={(e)=>{
            e.stopPropagation();
            e.preventDefault()
        }} onDrop={()=>{
            taskDrag.current={}
            setTaskList([...taskList])  
        }}>
            <div className='text-center display-4'>Task list</div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8  bg-dark p-5'>
                    {taskList.map((task, index) => {

                        let cssTagDrag= task.id===taskDrag.current.id ? 'dragTag' : ''

                        if(task.id===tagDragEnter.current.id){
                            return <animated.div
                            key={index} draggable='true' className={`bg-success text-white m-1 p-3 `} style={{
                                position:'relative',
                                bottom: propsSpring.bottom.interpolate(numBottom => `${numBottom}px`)   
                            }} onDragStart={(e) => {
                                handleDragStart(e, task, index)
                            }} onDragEnter={(e) => {
                                handleOnDragEnter(e, task, index)
                            }} onDragEnd={handleDragEnd}>
                                {task.taskName}
                            </animated.div>
                        }
                    
                        return <div key={index} draggable='true' className={`bg-success text-white m-1 p-3 ${cssTagDrag} `} onDragStart={(e) => {
                            handleDragStart(e, task, index)
                        }} onDragEnter={(e) => {
                            handleOnDragEnter(e, task, index)
                        }} onDragEnd={handleDragEnd} >{task.taskName}</div>
                    })}
                </div>
                <div className='col-2'></div>
            </div>
        </div>
    )
}

