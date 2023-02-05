import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faChevronRight, faTrashCan, faCircleXmark} from "@fortawesome/free-solid-svg-icons"
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
                <div className="justify-center backdrop-blur-lg items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className=" w-full p-1 rounded-lg flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                    <div className="border-0 rounded-lg shadow-lg relative w-full bg-gray-800 outline-none focus:outline-none">
                    <div className="border-0 rounded-lg relative flex flex-col w-full bg-gray-900/50 outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 rounded-t">
                        <h3 className="text-3xl font-semibold font">
                            Delete List 
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
                            onClick={() => setShowDeleteListMenu(false)}
                        >
                            Close
                        </button>
                        <button
                            className="text bg-emerald-500 text-neutral-50 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
		} else {
            setLists([]);
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
                    <>
            {showAddNewList ? (
                <>
                <div className="justify-center backdrop-blur-lg items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className=" w-full p-1 rounded-lg flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                    <div className="border-0 rounded-lg shadow-lg relative w-full bg-gray-800 outline-none focus:outline-none">
                    <div className="border-0 rounded-lg relative flex flex-col w-full bg-gray-900/50 outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 rounded-t">
                        <h3 className="text-3xl font-semibold font">
                            Add New List 
                        </h3>
                        </div>
                        <form id="AddNewList" onSubmit={handleSubmitList} className="relative p-6 flex-auto">
                            <div className='bg-gray-800 rounded drop-shadow-lg'>
                            <input
                                    className={`bg-gray-900/50 text-neutral-50 p-2 rounded border-solid border-2 focus:outline-none focus:border-neutral-50 focus:border-neutral-50 ${error? ("border-rose-500"): ("border-gray-900")}`}
                                    type="text"
                                    onChange={(e) => setListItemNames(e.target.value)}
                                    placeholder="Type List here..."
                                />
                            </div>
                        </form>
                        <div className="flex items-center justify-end p-6 rounded-b">
                        <button
                            className="text text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowAddNewList(false)}
                        >
                            Close
                        </button>
                        <button
                            className="text bg-emerald-500 text-neutral-50 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            form='AddNewList'
                        >
                            Add List
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
            <DeleteListMenu/>
        <div className='drop-shadow-2xl mb-10 rounded flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <div className="flex w-full h-full flex-row justify-between p-3 items-center">
            <div className="flex flex-row mx-2">
                <h1 className="text-3xl font-bold font">TO DO | </h1>
                <h1 className="text-3xl font-bold font px-2">YOUR LISTS</h1>
            </div>
            {showDeleteList? (
            <button className="mx-1 text-neutral-50 hover:text-pink-300" onClick={() => setShowDeleteList(false)}> 
                <FontAwesomeIcon icon={faCircleXmark} size="2x" className='mx-2'/>
            </button>
                ):(
            <div className='flex flex-row mx-1'>
                <button className="mx-1 text-neutral-50 hover:text-pink-300" onClick={() => setShowAddNewList(true)}> 
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" className='mx-2'/>
                </button>
                <button className="mx-1 text-neutral-50 hover:text-pink-300" onClick={() => setShowDeleteList(true)}> 
                        <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2'/>
                </button>
            </div>
            )}
        </div>
        </div>
        <div className="flex flex-col py-1">
        {lists.length === 0? (
            
            <div className="h-screen max-h-[80vh] flex flex-col justify-center items-center">
                <div className='p-1 drop-shadow-2xl rounded flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                <div className="w-full h-full rounded bg-gray-800">
                <div className=" px-24 py-12 bg-gray-900/50">
                    <h1 className="text-8xl font-bold text-center font ">TO-DO LIST</h1>
                    <p className="text-xl text-center font">developed by visqydev</p>
                </div>
                </div>
                </div>
            </div>
        ):(
        <>
        {lists.map((listItems) => {
            const {id, name} = listItems;
            return (
                <div key={id} className="drop-shadow-xl w-full p-1 my-1 rounded flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                <div className="w-full h-full rounded bg-gray-800">
                <div className="w-full h-full rounded  p-3 flex flex-row justify-between items-center bg-gray-900/50">
                    <p className="text-2xl font my-1 select-none">{name}</p>
                    {showDeleteList ? (
                    <button key={id} onClick={ () => {
                        setListItemNames(id);
                        setShowDeleteListMenu(true);    
                    }}>
                        <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2 text-rose-500' />
                    </button>                     
                    ) : (
                    <button key={id} onClick={() => {
                        navigate('/todo', {state:{id:id, name:name}})
                        }}>
                        <FontAwesomeIcon icon={faChevronRight} size="2x" className='mx-2 text-neutral-50'/> 
                    </button>
                    )}
                </div>
                </div>
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