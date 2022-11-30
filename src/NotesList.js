import React from "react";
import Note from "./Note";

const NotesList = (props) => {
  const searchMatches = props.notes.filter(
    (note) => note.doesMatchSearch === true
  );

  const noteElements = searchMatches.map((note) => (
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  ));

  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
