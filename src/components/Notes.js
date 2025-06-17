import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  let navigate = useNavigate();

 useEffect(() => {
  if (localStorage.getItem('token')) {
    getAllNotes();
  } else {
    props.showAlert("Please login to view your notes", "warning");
    navigate("/login");
  }
}, [getAllNotes, navigate, props]);


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    ref.current.click(); // trigger modal open
  };


  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); // close modal
    props.showAlert("Note updated successfully", "success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showAlert={props.showAlert} />

      {/* Hidden Modal Trigger Button */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-1">
                <div className="form-group mb-3">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Enter title"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    placeholder="Enter description"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    placeholder="Enter tag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                disabled={note.etitle.length < 3 || note.edescription.length < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display.'}
        </div>
        {Array.isArray(notes) && notes.map((note) => (
          <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
