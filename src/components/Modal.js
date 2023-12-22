import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ closeModal, setIsModalOpen, ...eleProps }) {
  const [text, setText] = useState(eleProps.text);
  const [x, setX] = useState(eleProps.x);
  const [y, setY] = useState(eleProps.y);
  const [fontSize, setFontSize] = useState(eleProps.fontSize);
  const [fontWeight, setFontWeight] = useState(eleProps.fontWeight);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const eleAttr = {
      id: eleProps.id | '',
      text,
      x: parseInt(x),
      y: parseInt(y),
      fontWeight: parseInt(fontWeight),
      fontSize: parseInt(fontSize),
      eleType: eleProps.eleType,
    };
    closeModal(eleAttr);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="heading" style={{ textTransform: "capitalize" }}>Edit {eleProps.eleType}</h2>
          <span
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="close-btn"
          >
            <FaTimes style={{ color: "rgba(0,0,0,0.2)", fontSize: "21px" }} />
          </span>
        </div>
        <div className="modal-content">
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                name="text"
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="x">X</label>
              <input
                value={x}
                onChange={(e) => {
                  setX(e.target.value);
                }}
                name="x"
                type="number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="y">Y</label>
              <input
                value={y}
                onChange={(e) => {
                  setY(e.target.value);
                }}
                name="y"
                type="number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fontSize">Font Size</label>
              <input
                value={fontSize}
                min={1}
                onChange={(e) => {
                  setFontSize(e.target.value);
                }}
                name="fontSize"
                type="number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fontWeight">Font Weight</label>
              <input
                value={fontWeight}
                onChange={(e) => {
                  setFontWeight(e.target.value);
                }}
                name="fontWeight"
                type="number"
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
