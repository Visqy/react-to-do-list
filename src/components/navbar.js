import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus, faCircleArrowLeft, faTrashCan, faSquarePlus} from "@fortawesome/free-solid-svg-icons"

const NavbarList = () => {
    return (
        <div className="flex flex-row justify-between border-b-2 py-3">
            <div className="flex flex-row">
                <h1 className="text-3xl font-bold font">TO DO | </h1>
                <h1 className="text-3xl font-bold font">YOUR LISTS</h1>
            </div>
            <button className="flex flex-row items-center"> 
                <FontAwesomeIcon icon={faCirclePlus} size="2x" className='mx-2'/>
                <p className="text-2xl font-bold font">Add New List</p>
            </button>
        </div>
    )
}

const NavbarTodo = () => {
    return (
        <div className="flex flex-row justify-between border-b-2 py-3">
            <div className="flex flex-row items-center">
                <FontAwesomeIcon icon={faCircleArrowLeft} size="3x" className='mx-3'/>
                <h1 className="text-3xl font-bold font">NEW LISTS</h1>
            </div>
            <div className='flex flex-row justify-between'>
                <div className="flex flex-row items-center"> 
                    <FontAwesomeIcon icon={faTrashCan} size="2x" className='mx-2'/>
                    <p className="text-2xl font-bold font">Delete List</p>
                </div>
                <div className="flex flex-row items-center"> 
                    <FontAwesomeIcon icon={faSquarePlus} size="2x" className='mx-2'/>
                    <p className="text-2xl font-bold font">Add to-do</p>
                </div>
            </div>
        </div>
    )
}

export {NavbarList, NavbarTodo};