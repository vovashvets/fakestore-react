import {Routes, Route, Link} from 'react-router-dom';
import {NotFound} from './pages/404'
import {About} from './pages/About'
import {Home} from './pages/Home'
import {Products} from './pages/Products'
import './App.css';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/about' element={<About />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default App;
