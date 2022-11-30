import React, { Component } from "react";
import Header from "./Header";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    // create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    // add the new note to the existing notes array
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onType = (editedId, updatedField, updatedValue) => {
    // copy the array of notes currently in state
    // keep all note objects the same except for the object matching the id of the note that the user typed in
    // editedId == id of the note that is edited
    // updatedField == edited field (title or description)
    // updatedValue == value entered in the title or description field
    const updatedNotes = this.state.notes.map((note) => {
      // check to see if a note is not a match for the id
      if (note.id !== editedId) {
        // if not a match, return the note as is
        return note;
      } else {
        if (updatedField === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });

    this.setState({ note: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();

    // map over the notes array and see if the search text matches a note
    const updatedNotes = this.state.notes.map((note) => {
      // if there's nothing in the search input, show all the notes
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.title.toLowerCase();
        // if the title matches the search text, this will evaluate to true
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        // returns a boolean
        const hasMatch = titleMatch || descriptionMatch;
        // sets doesMatchSearch to either true or false
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });

    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  removeNote = (id) => {
    // filter the notes array and only return the notes that don't match the id of the note we want to delete
    const updatedNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes: updatedNotes });
  };

  // fires any time state changes
  // capture the state of our notes and save them in local storage
  componentDidUpdate() {
    // in order to save something to local storage it needs to be a string
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  // checks to see if there is anything saved in the local storage savedNotes property
  // if there is, load it. if there isn't, don't do anything
  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      // parse it back to an object so it can be given to the state
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
