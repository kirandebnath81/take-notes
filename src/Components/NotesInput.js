import React from "react";

export default function NotesInput(props) {
  const textStyle = {
    boxShadow: props.dark
      ? " white 2px 1px 14px 1px"
      : " black 2px 1px 15px 1px",
    backgroundColor: props.dark ? "black" : "white",
    color:props.dark?"white":"black"
  };

  const titleStyle = {
    boxShadow: props.dark
      ? " white 2px 1px 9px 1px"
      : " black 2px 1px 10px 1px",
  };
  return (
    <>
      <div className="inputText">
        <button
          className={props.dark ? "addBtnDark" : "addBtn"}
          onClick={props.createNotesHandler}
        >
          <i className="fa-solid fa-folder-plus"></i>
        </button>

        <input
          type="text"
          name="noteTitle"
          value={props.noteTitle}
          className="titleInput"
          onChange={props.HandleChange}
          style={titleStyle}
        />
        <textarea
          style={textStyle}
          name="noteText"
          value={props.noteText}
          className="textInput"
          onChange={props.HandleChange}
        />
      </div>
    </>
  );
}
