import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus, faChevronRight, faTrashCan, faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ListPage = () => {
    const [lists, setLists] = useState([]);
    const [listLoaded, setListLoaded] = useState(false);
    const [listItemNames, setListItemNames] = useState('');
    const [error, setError] = useState(false);
    const [showAddNewList, setShowAddNewList] = useState(false);
    const [showDeleteList, setShowDeleteList] = useState(false);
    const [showDeleteListMenu, setShowDeleteListMenu] = useState(false);
    const navigate = useNavigate()

    const handleSubmitList = (e) => {
        e.preventDefault();
        if (listItemNames) {
            setError(false);
            let newId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newListItem = {
                id: newId,
                name: listItemNames,
                todos: []
            }
            setLists([newListItem, ...lists])
            setListItemNames('');
            setShowAddNewList(false);   
        } else {
            setError(true);
            setListItemNames('');
            setShowAddNewList(false);
        }
        
    }

    const deleteList = (id) => {
		let newLists = lists.filter((e) => e.id !== id);
		setLists([...newLists]);
        setListItemNames('');
        setShowDeleteListMenu(false);
        setShowDeleteList(false);
	};

    const DeleteListMenu = () => {
        if (showDeleteListMenu) {
            let deleteId = listItemNames;
            return(
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text text-3xl font-semibold">
                            Delete List 
                        </h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed text">
                                Are you sure to delete this item?
                            </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowDeleteListMenu(false)}
                        >
                            Close
                        </button>
                        <button
                            className="text bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => 
                                deleteList(deleteId)  
                            }
                        >
                            Delete List
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )
        }      
    }

    useEffect(() => {
		const lists = JSON.parse(localStorage.getItem('lists'));
		if (lists) {
			setLists(lists);
            setListLoaded(true);
		}
	}, []);

	useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);

	useEffect(() => {
        if(listLoaded){ 
		    localStorage.setItem('lists', JSON.stringify(lists));
        }
	}, [lists, listLoaded]);

    return (
        <>
        <div className="flex flex-row justify-between border-b-2 py-3 items-center">
            <div className="flex flex-row">
                <h1 className="text-3xl font-bold font">TO DO | </h1>
                <h1 className="text-3xl font-bold font px-2">YOUR LISTS</h1>
            </div>
            {showDeleteList? (
            <button className="flex flex-row items-center mx-2 " onClick={() => setShowDeleteList(false)}> 
                <FontAwesomeIcon icon={faCircleXmark} size="2x" className='mx-2'/>
                <p className="text-2xl font-bold font ">Cancel</p>
            </button>
                ):(
            <div className='flex flex-row'>
                <button className="flex flex-row items-center mx-2 " onClick={() => setShowAddNewList(true)}> 
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" className='mx-2'/>
                    <p className="text-2xl font-bold font">Add New List</p>
                </button>
                <button className="flex flex-row items-center mx-2 " onClick={() => setShowDeleteList(true)}> 
                        <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2'/>
                        <p className="text-2xl font-bold font">Delete List</p>
                </button>
            </div>
            )}
            <>
            {showAddNewList ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text text-3xl font-semibold">
                            Add New List 
                        </h3>
                        </div>
                        <form id="AddNewList" onSubmit={handleSubmitList} className="relative p-6 flex-auto">
                            <input
                                    type="text"
                                    onChange={(e) => setListItemNames(e.target.value)}
                                    placeholder="Type List here..."
                                />
                        </form>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowAddNewList(false)}
                        >
                            Close
                        </button>
                        <button
                            className="text bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            form='AddNewList'
                        >
                            Add List
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            </>
            <DeleteListMenu/>
        </div>
        <div className="flex flex-col py-1">
        {lists.length === 0 && listLoaded? (
            <div className="h-screen max-h-[80vh] flex flex-col justify-center items-center">
                <div className="border-double border-8 px-24 py-12">
                    <h1 className="text-8xl font-bold text-center font">TO-DO LIST</h1>
                    <p className="text-xl text-center font">developed by visqydev</p>
                </div>
            </div>
        ):(
        <>
        {lists.map((listItems) => {
            const {id, name} = listItems;
            return (
                <div key={id} className="w-full border-2 border-solid border-l-8 p-3 my-1 flex flex-row justify-between items-center">
                    <p className="text-2xl font my-1 ">{name}</p>
                    {showDeleteList ? (
                    <button key={id} onClick={ () => {
                        setListItemNames(id);
                        setShowDeleteListMenu(true);    
                    }}>
                        <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2 text-red-500' />
                    </button>                     
                    ) : (
                    <button key={id} onClick={() => {
                        navigate('/todo', {state:{id:id, name:name}})
                        }}>
                        <FontAwesomeIcon icon={faChevronRight} size="2x" className='mx-2 '/> 
                    </button>
                    )}
                </div>        
            )
        }) 
        }
        </>
        )}
        </div>
        </>
    )
}


export {ListPage}