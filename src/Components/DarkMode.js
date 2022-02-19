import React from "react";

export default function DarkMode(props) {
  return (
    <>
      <div className="toggle" onClick={props.darkMode}>
        <div className={props.dark ? "togglerDark" : "toggler"}>
          <div className={props.dark ? "togglerCircleDark" : "togglerCircle"}></div>
        </div>
      </div>
    </>
  );
}
