import React from "react";

const Note = (props) => {
  const updateTitle = (event) => {
    const updatedValue = event.target.value;
    const editedId = props.note.id;
    props.onType(editedId, "title", updatedValue);
  };

  const updateDescription = (event) => {
    const updatedValue = event.target.value;
    const editedId = props.note.id;
    props.onType(editedId, "description", updatedValue);
  };

  const clickDelete = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        placeholder="Description..."
        className="note__description"
        value={props.note.description}
        onChange={updateDescription}
      />
      <span onClick={clickDelete} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
