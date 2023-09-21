import {React, useState} from "react";
import NoteContext from "./notes/noteContext";



const NoteState=(props)=>{
    const s1={
        "name":"shubham",
        "class":"12a"
    }
    const [state, setstate] = useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setstate({
                "name":"Sam",
                "class":"10b"
            })
        },1000);
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;