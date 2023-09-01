import React, { useState } from 'react';


function TextForm(props) {

    const [text, setText] = useState('');

    const handleUpClick = () => {
        // console.log("button clicked");
        // console.log("new value : "+text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("converted to Uppercase","success");
        // setText("button changed value");
    }
    const handleLoClick=()=>{
        let newText=text.toLowerCase();
        setText(newText);
        props.showAlert("converted to Lowercase","success" );
    }

    const handleChange = (event) => {
        // console.log("changed");
        setText(event.target.value);
        // console.log(setText)
    }

    const handleClear=()=>{
        let newText="";
        setText(newText);
    }

    return(
        <>
            <div style={{color:props.mode==='light'?'black':'white'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="myForm" className="form-label">{props.label}</label>
                    <textarea className="form-control" value={text} onChange={handleChange} style={{backgroundColor:props.mode==='dark'?'grey':'white',color:props.mode==='light'?'black':'white'}} id="myForm" rows="5"></textarea>
                </div>
                <button className='btn btn-primary mx-3 my-2' onClick={handleUpClick}>Convert to uppercase</button>
                <button className='btn btn-primary mx-3 my-2' onClick={handleLoClick}>Convert to lowercase</button>
                <button className='btn btn-primary mx-3 my-2' onClick={handleClear}>Clear</button>

            </div>
            <div className="container" style={{color:props.mode==='light'?'black':'white'}}>
                <div className='pt-3'>
                    <h2>Your Text Summary</h2>
                    <p>{text.split(/\s+/).filter((element)=>{return element.length!==0;}).length} words and {text.length} characters</p>
                    <p>{0.008* text.split(" ").length} minutes read.</p>
                </div>
                <div className="pt-3">
                    <h2>Preview</h2>
                    <p>{text.length>0?text:'enter some text to preview'}</p>
                </div>
            </div>
        </>
    )
}

export default TextForm