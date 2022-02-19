import React, { useEffect, useState } from "react";
import "./styles.css";

import { v4 as uuidv4 } from "uuid";

import NotesInput from "./Components/NotesInput";
import Notes from "./Components/Notes";
import DarkMode from "./Components/DarkMode";

export default function App() {
  const [dark, setDark] = useState(false);
  const [saveNoteData, setSaveNoteData] = useState(
    JSON.parse(localStorage.getItem("notesList"))
  );
  const [notes, setNotes] = useState(saveNoteData || []);
  const [viewNotesPage, setViewNotesPage] = useState(false);
  const [notesData, setNotesData] = useState({
    noteTitle: "",
    noteText: "",
    id: "",
    viewNotes: false,
  });

  useEffect(() => {
    localStorage.setItem("notesList", JSON.stringify(notes));
    setSaveNoteData(JSON.parse(localStorage.getItem("notesList")));
  }, [notes]);

  const ChangeHandler = (event) => {
    const { name, value } = event.target;
    setNotesData((prevNotesINput) => {
      return {
        ...prevNotesINput,
        [name]: value,
      };
    });
  };

  const createNote = () => {
    const note = { ...notesData, id: uuidv4() };
    setNotes((prevNotes) => [...prevNotes, note]);

    setNotesData((prevData) => ({ ...prevData, noteTitle: "", noteText: "" }));

    setViewNotesPage((prevState) => !prevState);
  };

  const inputNotesPage = () => {
    setViewNotesPage((prevState) => !prevState);
  };

  const previewNotes = (id) => {
    setNotes((prevNotes) => {
      const newNotes = [];
      for (let i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id === id) {
          newNotes.push({
            ...prevNotes[i],
            viewNotes: !prevNotes[i].viewNotes,
          });
        } else {
          newNotes.push({ ...prevNotes[i], viewNotes: false });
        }
      }
      return newNotes;
    });
  };

  const deleteNotes = (id) => {
    setNotes((prevNotes) => {
      const newNotes = [];
      for (let i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id !== id) {
          newNotes.push(prevNotes[i]);
        }
      }
      return newNotes;
    });
  };

  const editNotes = (id) => {
    let title = "";
    let text = "";
    setNotes((prevNotes) => {
      const newNotes = [];
      for (let i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id !== id) {
          newNotes.push(prevNotes[i]);
        } else {
          title = prevNotes[i].noteTitle;
          text = prevNotes[i].noteText;
        }
      }
      return newNotes;
    });
    setNotesData((prevData) => ({
      ...prevData,
      noteTitle: title,
      noteText: text,
    }));

    setViewNotesPage((prevState) => !prevState);
  };

  const darkMode = () => {
    setDark((prevDark) => !prevDark);
  };

  const notesElement = notes.map((note) => (
    <Notes
      key={note.id}
      {...note}
      viewHandler={previewNotes}
      editHandler={editNotes}
      deleteHandler={deleteNotes}
      darkMode={dark}
    />
  ));

  const containerStyle = {
    backgroundColor: dark ? "black" : " white",
  };

  const previewNotesStyle = {
    color: dark ? "white" : "black",
    boxShadow: dark ? "white 1px 1px 10px 1px" : "black 1px 1px 10px 1px",
  };

  return (
    <>
      <div className="container" style={containerStyle}>
        <DarkMode darkMode={darkMode} dark={dark} />

        {notes.length === 0 ? (
          <div className="noNotes">
            {!viewNotesPage && (
              <div className="noNotesPage">
                <h1 style={{ color: dark ? "white" : "black" }}>
                  There is no notes
                </h1>
                <button className="noNotesBtn" onClick={inputNotesPage}>
                  Create new notes
                </button>
              </div>
            )}

            <div className="notesInputContainer">
              {viewNotesPage && (
                <NotesInput
                  HandleChange={ChangeHandler}
                  {...notesData}
                  createNotesHandler={createNote}
                  dark={dark}
                />
              )}
            </div>
          </div>
        ) : (
          <div>
            <DarkMode darkMode={darkMode} dark={dark} />

            {viewNotesPage ? (
              <div className="notesInputContainer">
                <NotesInput
                  HandleChange={ChangeHandler}
                  {...notesData}
                  createNotesHandler={createNote}
                  dark={dark}
                />
              </div>
            ) : (
              <div className="notesOutputContainer">
                <div className="previewNotes" style={previewNotesStyle}>
                  {notes.map(
                    (note) =>
                      note.viewNotes && <div key={note.id}>{note.noteText}</div>
                  )}

                  <button
                    className={dark ? "inputBtnDark" : "inputBtn"}
                    onClick={inputNotesPage}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
                <div className="notexBox">{notesElement}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
