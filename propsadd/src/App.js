import './App.css';
// import df, { a, c } from './names.js';
import Navbar from './components/Navbar.js';
import TextForm from './components/TextForm';
import About from './components/About';
import { useState } from 'react';
import Alert from './components/Alert';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";


function App() {

  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  // const [btncolor, setbtncolor] = useState('black');

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enabled", "success");
      // setInterval(()=>{
      //   document.title='Dark Mode Enabled';

      // },2000);
      // setInterval(()=>{
      //   document.title='Dark Automtaic Enabled';
      // },1500)
    }
    else {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("Dark Mode Enabled", "warning");
    }
  }

  // const colorMode = () => {
  //   if(btncolor='')
  // }



  return (
    <>

      {/* <h1>{df}</h1>
      <p>{a}</p>
      <p>{c}</p> */}
      <Router>
        <Navbar heading="Title Change" link="click" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter Text" label="Description" mode={mode} /> }/>
          </Routes>

        </div>
      </Router>
    </>
  );
}

export default App;
