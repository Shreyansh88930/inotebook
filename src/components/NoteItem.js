import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3 d-flex align-items-stretch">
      <div className="card my-3 shadow-sm border-0 note-card">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title fw-semibold text-primary">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash text-danger mx-2 hover-icon"
                role="button"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note deleted successfully!", "success");
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square text-success mx-2 hover-icon"
                role="button"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text mt-2">{note.description}</p>
          <span className="badge bg-secondary mt-auto align-self-start">{note.tag || "General"}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
