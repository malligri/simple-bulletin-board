import React, { useState, useEffect } from 'react';
import './App.scss';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
var randomcolor = require('randomcolor');

const App = () => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const keyPress = e => {
    let code = e.which || e.keyCode;
    if(code === 13) {
      newItem();
    }
  }

  const newItem = () => {
    if (!(!item || 0 === item.length)) {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomcolor({luminosity: 'light'}),
        defaultPos: { x: 100, y: 0}
      };
      setItems(items => [...items, newItem]);
      setItem('');
    } else {
      alert('Enter an item');
      setItem('');
    }
  }

  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  }

  const deleteNote = id => {
    setItems(items.filter(i => i.id !== id));
  }

  const renderDraggable = () => {
    console.log(JSON.parse(localStorage.getItem("items")));

    return items.map((i, index) =>
      <Draggable
        key={i.id}
        defaultPosition={i.defaultPos}
        onStop={(e, data) => updatePos(data, index)}
      >
        <div style={{ backgroundColor: i.color }} className="card">
          <header className="card-header">
            <button id="delete" onClick={e => deleteNote(i.id)}>X</button>
          </header>
          <div className="card-content">
            <span>{i.item}</span>
          </div>
        </div>
      </Draggable>
    );
  }

  return (
    <div className="appWrapper">
      <div className="inputWrapper">
        <input 
          className="input" 
          value={item}
          type="text"
          onChange={e => setItem(e.target.value)}
          placeholder="Enter something..."
          onKeyPress={e => keyPress(e)}
        />
        <button className="button is-dark" onClick={newItem}>Add</button>
      </div>
      {renderDraggable()}
    </div>
  );
}
 
export default App;