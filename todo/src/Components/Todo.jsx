import React,{ useEffect, useRef, useState }from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'
const Todo = () => {
    const inputRef= useRef();

    const [todoList,setTodoList]=useState(localStorage.getItem("todo")?JSON.parse(localStorage.getItem("todo")):[]);

    const add=()=>{
        const inputText=inputRef.current.value.trim();
        if(inputText==="")
        {
            return null;
        }
        const newTodo={
            id:Date.now(),
            text: inputText,
            isComplete:false,
        }
        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value="";
    }

    const dele=(id)=>{
        setTodoList(
            (prevTodos)=>{
                return  prevTodos.filter((todo)=> todo.id!=id)
            })
        }
    const toggle =(id)=>{
        setTodoList((prev)=>{
            return prev.map((todo)=>{
                if (todo.id === id){
                    return {...todo,isComplete:!todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todo",JSON.stringify(todoList));
    },[todoList])

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-x1'>

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text font-semibold'>BackPack Check</h1>
            </div>

            {/* INPUT FIELD */}
            <div className='flex item-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Items'/>
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-lg font-medium cursor-pointer'>ADD+</button>
            </div>
            {/* inputs */}
            <div>
                {todoList.map((item,index)=>{
                    return<Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} dele={dele} toggle={toggle}/>
                })}
            </div>
        </div>
    )
}

export default Todo
