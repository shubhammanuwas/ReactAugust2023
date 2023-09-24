import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:4000"; // Corrected typo in "localhost"

    // Initial notes data
    const notesInitial = [
        // {
        //     "_id": "65093e60e3690675f2acb567",
        //     "user": "6509311d4e0c25838429735c",
        //     "title": "shubham note",
        //     "description": "Hi, I am writing my first note",
        //     "tag": "personal",
        //     "__v": 0
        // },
        // {
        //     "_id": "650fc41fa736841e17964b50",
        //     "user": "6509311d4e0c25838429735c",
        //     "title": "delete ntoe",
        //     "description": "This note will be deleted",
        //     "tag": "personal",
        //     "__v": 0
        //   }
    ];

    // State to hold notes
    const [notes, setNotes] = useState(notesInitial);

    // Get All Notes
    const getNotes = async () => {
        try {
            // API call to fetch notes
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwOTMxMWQ0ZTBjMjU4Mzg0Mjk3MzVjIn0sImlhdCI6MTY5NTEwMTMxOH0.l4yrOjL1az80nJvqU_5lvmpr0pUIv6QykpyKhi1XSf8', // Replace with your auth token
                },
            });
            const json = await response.json();
            console.log(json);
            setNotes(json);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        try {
            // API call to add a note
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwOTMxMWQ0ZTBjMjU4Mzg0Mjk3MzVjIn0sImlhdCI6MTY5NTEwMTMxOH0.l4yrOjL1az80nJvqU_5lvmpr0pUIv6QykpyKhi1XSf8', // Replace with your auth token
                },
                body: JSON.stringify({ title, description, tag }),
            });

            // Handle response from the server
            if (response.ok) {
                // Client-side logic to add the note
                const newNote = await response.json();
                setNotes([...notes, newNote]);
            } else {
                console.error('Error adding note:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    // Delete Note
    const deleteNote = async (id) => {
        try {
            // API call to delete a note
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwOTMxMWQ0ZTBjMjU4Mzg0Mjk3MzVjIn0sImlhdCI6MTY5NTEwMTMxOH0.l4yrOjL1az80nJvqU_5lvmpr0pUIv6QykpyKhi1XSf8', // Replace with your auth token
                },
            });

            // Handle response from the server
            if (response.ok) {
                // Client-side logic to delete a note
                const newNotes = notes.filter((note) => note._id !== id);
                setNotes(newNotes);
            } else {
                console.error('Error deleting note:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        try {
            // API call to edit a note
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT', // Use PUT method for updating
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwOTMxMWQ0ZTBjMjU4Mzg0Mjk3MzVjIn0sImlhdCI6MTY5NTEwMTMxOH0.l4yrOjL1az80nJvqU_5lvmpr0pUIv6QykpyKhi1XSf8', // Replace with your auth token
                },
                body: JSON.stringify({ title, description, tag }),
            });

            // Handle response from the server
            if (response.ok) {
                // Client-side logic to edit the note
                const updatedNote = await response.json();
                setNotes((prevNotes) => {
                    return prevNotes.map((note) => {
                        if (note._id === id) {
                            return updatedNote;
                        }
                        return note;
                    });
                });
            } else {
                console.error('Error editing note:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
