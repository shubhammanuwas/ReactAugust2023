import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';



const App=()=>{
 
  const [progress, setProgress] = useState(0);
  const apiKey=process.env.REACT_APP_NEWS_API;

  // setProgress = (progress)=>{
  //   setProgress(progress);
  //   }

    return (
      <>
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pagesize={10} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pagesize={6} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pagesize={6} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pagesize={6} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pagesize={6} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pagesize={6} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pagesize={6} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pagesize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
      </>
    )
  }
export default App;
