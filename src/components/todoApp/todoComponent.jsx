import { useEffect, useState } from "react";
import { checkItem } from "../birthdayApp/birthdayComponent";

// Input component has input text and Add/Edit button
// which depends on action
function InputComponent(props) {
  return (
    <div className="input-container">
      <input
        type="text"
        onChange={(e) => {
          props.onChangeInput(e);
        }}
        value={props.inputValue}
      />
      <button
        type="button"
        onClick={() => {
          props.onClickAdd();
        }}
      >
        {props.btnName === "Edit" ? "Edit" : "Add"}
      </button>
    </div>
  );
}

// Note component has its text and btns for deleting ad editing
function Note(props) {
  return (
    <div className="note-container">
      <p className="note-txt">{props.note.val}</p>
      <div className="btn-container">
        <button
          id="edit-btn"
          type="button"
          onClick={() => {
            props.onClickEdit(props.note.id);
          }}
        >
          Edit
        </button>
        <button
          id="delete-btn"
          type="button"
          onClick={() => {
            props.onClickDelete(props.note.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// handles todo application
function ToDoComponent() {
  const [inputValue, setInputValue] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [btnTxt, setBtnTxt] = useState("Add");
  const [editing, setEditing] = useState(false);

  // When component is mounted if there is no todoData in LS
  // it will create one
  useEffect(() => {
    let todoArr;
    if (checkItem("todoData")) {
      todoArr = [];
      window.localStorage.setItem("todoData", JSON.stringify(todoArr));
      console.log("it is creating");
    } else {
      todoArr = JSON.parse(window.localStorage.getItem("todoData"));
      setTodoData(todoArr);
    }
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // Handles adding and editing notes
  const handleAdd = () => {
    let todoData = JSON.parse(window.localStorage.getItem("todoData"));

    if (inputValue && !editing) {
      let note = {
        val: inputValue,
        id: new Date().getTime(),
      };
      todoData.push(note);
      window.localStorage.setItem("todoData", JSON.stringify(todoData));
      setTodoData(todoData);
      setInputValue("");
    } else if (inputValue && editing) {
      let note = todoData.find((note) => {
        // find note you want to edit
        return note.id === editing;
      });
      setEditing(false); // turn off editing
      note.val = inputValue; // it will update specific note in todoData
      window.localStorage.setItem("todoData", JSON.stringify(todoData)); // update in LS
      setTodoData(todoData);
      setInputValue("");
      setBtnTxt("Add");
    }
  };

  // Handles edit of specific note in a way of
  // puting its data back on input component
  const handleEdit = (id) => {
    const note = todoData.find((note) => {
      return note.id === id;
    });
    setInputValue(note.val);
    setBtnTxt("Edit");
    setEditing(note.id);
  };

  // finds note with specific id and deletes it from both:
  // todoData and local storage
  const handleDelete = (id) => {
    const newArr = todoData.filter((note) => {
      return note.id !== id;
    });
    setTodoData(newArr);
    window.localStorage.setItem("todoData", JSON.stringify(newArr));
  };

  return (
    <div className="todo-container">
      <InputComponent
        onChangeInput={handleInput}
        inputValue={inputValue}
        onClickAdd={handleAdd}
        btnName={btnTxt}
      />
      {todoData.length > 0 &&
        todoData.map((note) => {
          return (
            <Note
              note={note}
              onClickEdit={handleEdit}
              onClickDelete={handleDelete}
              key={note.id}
            />
          );
        })}
    </div>
  );
}

export default ToDoComponent;
