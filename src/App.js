import { ListPage } from './components/list';
import { TodoPage } from './components/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style/index.css';

function App() {
  return (
    <div className='p-10 h-screen bg-neutral-100'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage/>}/>
          <Route path="todo" element={<TodoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
