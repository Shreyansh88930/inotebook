import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();

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
    ref.current.click();
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showAlert={props.showAlert} />

      {/* Hidden Modal Trigger */}
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-sm rounded-4">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title fw-bold" id="exampleModalLabel">✏️ Edit Note</h5>
              <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="etitle" className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Enter title"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="edescription" className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    rows="3"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="etag" className="form-label fw-semibold">Tag</label>
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
                className="btn btn-success px-4"
                onClick={handleClick}
                disabled={note.etitle.length < 3 || note.edescription.length < 5}
              >
                ✅ Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="notes-container my-4 px-2 px-md-4">
        <h2 className="mb-4 text-primary fw-bold">📚 Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && (
            <div className="alert alert-info">No notes to display. Start by adding one!</div>
          )}
        </div>
        <div className="row">
          {Array.isArray(notes) &&
            notes.map((note) => (
              <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
