import React from "react";
import { FaGripVertical } from "react-icons/fa";
function Sidebar() {
  const myArr = ["Label", "Input", "Button"];

  const handleOnDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.lastChild.innerText);
  };

  return (
    <div className="sidebar">
      <h1>Blocks</h1>
      <div className="list">
        {myArr.map((item) => (
          <div
            draggable
            onDragStart={handleOnDragStart}
            key={item}
            className="list-item"
          >
            <FaGripVertical style={{ color: "#D5D5D5", fontSize: "18px" }} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
