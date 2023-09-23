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
    const [notes, setNotes] = useState(notesInitial);

    //Add Note
    const addNote = (title, description, tag) => {
        let note = {
            "_id": "650a60da842ea9c5f8b42139",
            "user": "6509311d4e0c25838429735c",
            "title": title,
            "description": description,
            "tag": tag,
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //Delete Note
    const deleteNote = (id) => {

    }

    //Edit a Note
    const editNote = () => {

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;