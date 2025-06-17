import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3 d-flex align-items-stretch">
            <div className="card my-3 w-100">
                <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title mb-0">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully!", "success"); }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note); props.showAlert("Note updated successfully", "success"); }}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
