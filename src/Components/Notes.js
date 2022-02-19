import React from "react";

import noteImg from "../Img/noteImg.png";

export default function Notes(props) {
  const styles = {
    backgroundColor: props.viewNotes ? "rgb(48, 5, 112)" : "",
    boxShadow: props.darkMode
      ? " white 1px 1px 10px 3px"
      : "grey 1px 1px 20px -5px ",
  };

  const btnStyle={
    backgroundColor: props.viewNotes ? "rgb(48, 5, 112)" : "",
  }
  return (
    <>
      <div
        className="notesOutput"
        onClick={() => props.viewHandler(props.id)}
        style={styles}
      >
        <img src={noteImg} alt="" className="noteImg" />
        <div className="notesTitle">{props.noteTitle}</div>
        <div className="buttons">
          <button
          style={btnStyle}
            id="editBtn"
            className={props.darkMode ? "notesbtnDark" : "notesbtn"}
            onClick={() => props.editHandler(props.id)}
          >
            <i className="fa-solid fa-square-pen"></i>
          </button>
          <button
          style={btnStyle}
            id="deleteBtn"
            className={props.darkMode ? "notesbtnDark" : "notesbtn"}
            onClick={() => props.deleteHandler(props.id)}
          >
            <i className="fa-solid fa-folder-minus"></i>
          </button>
        </div>
      </div>
    </>
  );
}
