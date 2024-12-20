
import './App.css';
import ChooseFile from './pages/chooseFile';
import EditFile from './pages/editFile';
import LoginForm from './pages/login';
import GetQuote from './pages/getQuote';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path='/choose' element = {<ChooseFile/>} />
          <Route path='/edit' element = {<EditFile/>} />
          <Route path='/getquote' element = {<GetQuote/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
