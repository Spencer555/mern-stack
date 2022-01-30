import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import {Quote} from './pages/Quote'


function App() {
  

  return (
    <div >
       <Router>
         <Routes>
         <Route path="/register" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/quote" element={<Quote/>}/>
         </Routes>
         </Router>    
    </div>
  );
}

export default App;
