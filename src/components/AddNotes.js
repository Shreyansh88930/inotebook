import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useContext, useState } from 'react';

const AddNotes = (props) => {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag:"default"});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note added successfully!", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add A Note</h2>

            <form className="my-1">
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        onChange={onChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        onChange={onChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        placeholder="Enter tag"
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add Note
                </button>
            </form>
            <div />
        </div>
    )
}

export default AddNotes
