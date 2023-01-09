import img_1 from "../assets/image/empty.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faSquareCheck, faSquare} from "@fortawesome/free-solid-svg-icons"


const IntroPage = () => {
    return (
        <div className="h-5/6 flex flex-col justify-center items-center">
            <div className="border-double border-8 px-24 py-12">
                <h1 className="text-8xl font-bold text-center font">TO-DO LIST</h1>
                <p className="text-xl text-center font">developed by visqydev</p>
            </div>
        </div>
    )
}

const ListPage = () => {
    return (
        <div className="flex flex-col py-1">
            <div className="w-full border-2 border-l-8 border-solid p-3 my-1 flex flex-row justify-between">
                <p className="text-xl font">Start creating lists</p>
                <FontAwesomeIcon icon={faChevronRight} size="2x" className='mx-2'/>
            </div>
            <div className="w-full border-2 border-l-8 border-solid p-3 my-1 flex flex-row justify-between">
                <p className="text-xl font">Start creating lists</p>
                <FontAwesomeIcon icon={faChevronRight} size="2x" className='mx-2'/>
            </div>
        </div>
    )
}

const TodoPage = () => {
    return (
        <div className="flex flex-col py-1">
            <div className="w-full border-2 border-solid p-3 my-1 flex flex-row items-center">
                <FontAwesomeIcon icon={faSquare} size="2x" className='mx-2'/>
                <p className="text-xl font mx-2">Start creating lists</p>
            </div>
            <div className="w-full border-2 border-solid p-3 my-1 flex flex-row items-center">
                <FontAwesomeIcon icon={faSquare} size="2x" className='mx-2'/>
                <p className="text-xl font mx-2">Start creating lists</p>
            </div>
        </div>
    )
}

const EmptyPage = () => {
    return (
        <div className="h-5/6">
            <img className="object-cover w-full" src={img_1} alt="img-1"/>
            <p className="text-xl text-center font">Start creating lists</p>
        </div>
    )
}

export {IntroPage, ListPage, TodoPage, EmptyPage}