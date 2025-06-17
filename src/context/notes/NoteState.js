import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // ✅ Get all Notes
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Invalid notes format received:", json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ✅ Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // ✅ Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      console.log("Delete response:", json);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✅ Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const updatedNote = await response.json();

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);

      return updatedNote;
    } catch (error) {
      console.error("Error updating note:", error);
    }

    let newNotes= JSON.parse(JSON.stringify(notes));
    //Logic to update note in client-side
    for(let index=0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes([...newNotes]);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
