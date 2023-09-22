import { React, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "65093e60e3690675f2acb567",
            "user": "6509311d4e0c25838429735c",
            "title": "shubham note",
            "description": "Hi i am writing my first note",
            "tag": "personal",
            "__v": 0
        },
        {
            "_id": "650a60da842ea9c5f8b42136",
            "user": "6509311d4e0c25838429735c",
            "title": "youtube content updated",
            "description": "it wastes our time updated",
            "tag": "personal",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;