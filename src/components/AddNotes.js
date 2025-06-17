import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNotes = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully!", "success");
    setNote({ title: "", description: "", tag: "default" }); // Clear input fields after adding
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 add-note-container p-4 rounded shadow-sm">
      <h3 className="mb-4 text-primary">📝 Add a New Note</h3>

      <form className="my-1">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            value={note.title}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            rows="3"
            value={note.description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="tag" className="form-label fw-semibold">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-success px-4" onClick={handleClick}>
          ➕ Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
