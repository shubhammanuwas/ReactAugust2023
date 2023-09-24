// import React, { useContext, useEffect, useRef } from 'react'
// import noteContext from '../context/notes/noteContext';
// import NoteItem from './NoteItem';
// import AddNote from './AddNote';

// function Notes() {
//     // const context = useContext(noteContext);
//     // const [notes, setNotes] = context;
//     const { notes, getNotes } = useContext(noteContext);
//     useEffect(() => {
//         getNotes();
//     }, [])
//     const updateNote = (note) => {
//         ref.current.click();
//     }

//     const ref = useRef(null);
//     return (
//         <>
//             <AddNote />
//             <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button>

//             <div className="modal" tabIndex="-1" ref={ref}>
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Modal title</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <p>Do you want to edit the note?</p>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" className="btn btn-primary">Edit Note</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="row my-3">
//                 <h2>Your Notes</h2>
//                 {/* {notes.map((note) => {
//                 return <NoteItem key={note._id} note={note} />
//             })} */}
//                 {notes.map((note) => {
//                     return <NoteItem key={note._id} updateNote={updateNote} note={note} />
//                 })}
//             </div>
//         </>
//     )
// }

// export default Notes
import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes() {
    const { notes, getNotes } = useContext(noteContext);
    useEffect(() => {
        getNotes();
    }, []);

    const ref=useRef(null);
    const updateNote = (note) => {
        // Pass the note ID to your editNote function or component
        console.log("Editing note with ID:", note._id);
        ref.current.click();
    }

    const modalRef = useRef(null);
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value});
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" ref={modalRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal" tabIndex="-1" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" id="etitle" onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" onChange={onChange} name="edescription" id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" onChange={onChange} name="etag" id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
