import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus, faCircleArrowLeft, faTrashCan, faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons'

import img_1 from "../assets/image/empty.png"

const TodoPage = () => {
    const {state} = useLocation();
    const {id, name} = state;
    const [todoloaded, setTodoLoaded] = useState(false);
    const [todoCompleted, setTodoCompleted] = useState([]);
    const [lists, setLists] = useState([]);
    const [todos, setTodos] = useState([]);
    const [todoItemNames, setTodoItemNames] = useState('');
    const [error, setError] = useState(false);
    const [showAddNewTodo, setShowAddNewTodo] = useState(false);
    const [showDeleteTodo, setShowDeleteTodo] = useState(false);
    const [showDeleteTodoMenu, setShowDeleteTodoMenu] = useState(false);
    const navigate = useNavigate()

    const handleSubmitTodo = (e) => {
        e.preventDefault();
        if (todoItemNames) {
            setError(false);
            let newId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newTodoItem = {
                id: newId,
                name: todoItemNames,
                complete: false
            }
            setTodos([newTodoItem, ...todos])
            setTodoItemNames('');
            setShowAddNewTodo(false);   
        } else {
            setError(true);
            setTodoItemNames('');
        }
        
    }

    const deleteTodo = (id) => {
		let newtodos = todos.filter((e) => e.id !== id);
		setTodos([...newtodos]);
        setTodoItemNames('');
        setShowDeleteTodoMenu(false);
        setShowDeleteTodo(false);
	};

    const DeleteTodoMenu = () => {
        if (showDeleteTodoMenu) {
            let deleteId = todoItemNames;
            return(
                <>
                <div className="justify-center backdrop-blur-lg items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className=" w-full p-1 rounded-lg flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                    <div className="border-0 rounded-lg shadow-lg relative w-full bg-gray-800 outline-none focus:outline-none">
                    <div className="border-0 rounded-lg relative flex flex-col w-full bg-gray-900/50 outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 rounded-t">
                        <h3 className="text-3xl font-semibold font">

                            Delete Todo 
                        </h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-neutral-50 text-lg leading-relaxed text">
                                Are you sure to delete this item?
                            </p>
                        </div>
                        <div className="flex items-center justify-end p-6 rounded-b">
                        <button
                            className="text text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowDeleteTodoMenu(false)}
                        >
                            Close
                        </button>
                        <button
                            className="text bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => 
                                deleteTodo(deleteId)  
                            }
                        >
                            Delete Todo
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )
        }      
    };

    const toggleComplete = (id) => {
		todos.find((todo) => {
			if (todo.id === id) {
				todo.complete = !todo.complete;
			}
			return setTodos([...todos]);
		});
	};

    useEffect(() => {
		const lists = JSON.parse(localStorage.getItem('lists'));
		if (lists) {
			setLists(lists);
            const i = lists.findIndex(value => value.id === id);
            setTodos(lists[i].todos);
            setTodoLoaded(true);
		}
	}, [id]);

	useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);

	useEffect(() => {
        if(todoloaded){
            const updatedLists = lists.map(p =>p.id === id
                ? { ...p, todos: todos }
                : p
                );
		    localStorage.setItem('lists', JSON.stringify(updatedLists));
        }
	}, [todos, lists, id, todoloaded]);

    useEffect(()=> {
        let completed = [];
		todos.filter((todo) => todo.complete === true && completed.push(todo));
        setTodoCompleted(completed.length);
    },[todos])

    return (
        <>
        <>
        {showAddNewTodo ? (
            <>
            <div className="justify-center backdrop-blur-lg items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className=" w-full p-1 rounded-lg flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                <div className="border-0 rounded-lg shadow-lg relative w-full bg-gray-800 outline-none focus:outline-none">
                <div className="border-0 rounded-lg relative flex flex-col w-full bg-gray-900/50 outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 rounded-t">
                    <h3 className="text-3xl font-semibold font">
                        Add New Todo 
                    </h3>
                    </div>
                    <form id="AddNewtodo" onSubmit={handleSubmitTodo} className="relative p-6 flex-auto">
                    <div className='bg-gray-800 rounded drop-shadow-lg'>
                        <input
                                className={`bg-gray-900/50 text-neutral-50 p-2 rounded border-solid border-2 focus:outline-none focus:border-neutral-50 focus:border-neutral-50 ${error? ("border-rose-500"): ("border-gray-900")}`}
                                type="text"
                                onChange={(e) => setTodoItemNames(e.target.value)}
                                placeholder="Type todo here..."
                            />
                    </div>
                    </form>
                    <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                        className="text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowAddNewTodo(false)}
                    >
                        Close
                    </button>
                    <button
                        className="text bg-emerald-500 text-neutral-50 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        form='AddNewtodo'
                    >
                        Add Todo
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>
        <DeleteTodoMenu/>
        <div className='drop-shadow-2xl mb-5 rounded flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <div className="flex w-full h-full flex-row justify-between p-3 items-center">
            <div className="flex flex-row items-center">
                <button className="text-neutral-50 hover:text-indigo-300" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" className='mx-2'/>
                </button>
                <h1 className="text-3xl font-bold font mx-2">{name}</h1>
            </div>
            {showDeleteTodo? (
            <button className="mx-1 text-neutral-50 hover:text-pink-300" onClick={() => setShowDeleteTodo(false)}> 
                <FontAwesomeIcon icon={faCircleXmark} size="2x" className='mx-2'/>
            </button>
                ):(
            <div className='flex flex-row'>
                <button className="mx-1 text-neutral-50 hover:text-pink-300" onClick={() => setShowAddNewTodo(true)}> 
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" className='mx-2'/>
                </button>
                <button className="mx-1 text-neutral-50 hover:text-pink-300" onClick={() => setShowDeleteTodo(true)}> 
                        <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2'/>
                </button>
            </div>
            )}
        </div>
        </div>
        <div>
        {todos.length === 0? (
        <div className="flex flex-col items-center">
            <img className="object-cover h-screen max-h-[70vh]" src={img_1} alt="img-1"/>
            <p className="text-xl text-center font">Start creating todos</p>
        </div>
        ):(
        <>
        <div className="flex flex-row justify-between items-center mb-5">
            <div className="flex flex-col items-start p-3">
                <h5 className='text-2xl font font-bold'>{todos.length < 10 ? `0${todos.length}` : todos.length}</h5>
                <p className='text-xl font font-bold'>Created todo</p>
            </div>
            <div className="flex flex-col items-end p-3">
                <h5 className='text-2xl font font-bold'>
                    {todoCompleted < 10 ? `0${todoCompleted}` : todoCompleted}
                </h5>
                <p className='text-xl font font-bold'>Completed todo</p>
            </div>
		</div>
        <div className="flex flex-col py-1">
        {todos.map((todoItems) => {
            const {id, name, complete} = todoItems;
            return (
                <div key={id} className={` drop-shadow-xl w-full p-1 my-1 rounded flex justify-center bg-gradient-to-r  ${complete? 'from-emerald-500 to-emerald-700':'from-rose-500 to-rose-800'} `}>
                <div className="w-full h-full rounded bg-gray-800">
                <div className="w-full h-full rounded  p-3 flex flex-row justify-between items-center bg-gray-900/50">
                    <p className={`'text-2xl font my-1 select-none ${complete ? 'line-through' : ""}`}>{name}</p>
                    {showDeleteTodo ? (
                    <button key={id} onClick={ () => {
                        setTodoItemNames(id);
                        setShowDeleteTodoMenu(true);    
                    }}>
                        <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2 text-rose-500' />
                    </button>                     
                    ) : (
                        <>
                        {complete ? (
                        <button onClick={() => toggleComplete(id)}>
                            <FontAwesomeIcon icon={faSquareCheck} size="2x" className='mx-2 text-neutral-50' />   
                        </button>
                        ) : (
                        <button onClick={() => toggleComplete(id)}>
                            <FontAwesomeIcon icon={faSquare} size="2x" className='mx-2 text-neutral-50' />
                        </button>
                        )}
                        </>
                    )}
                </div>
                </div>
                </div>        
            )
        }) 
        }
        </div>
        </>
        )}
        </div>
        </>
    )
}

export {TodoPage}