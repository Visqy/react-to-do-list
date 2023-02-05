import { ListPage } from './components/list';
import { TodoPage } from './components/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style/index.css';

function App() {
  return (
    <div className="h-screen bg-img transition-all">
        <div className='p-10 h-screen backdrop-blur-md'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage/>}/>
          <Route path="todo" element={<TodoPage/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
