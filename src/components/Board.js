import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Element from "./Element";
import { nanoid } from "nanoid";

const Board = () => {
  const [elementsOnBoard, setElementsOnBoard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("elementsOnBoard")
    );
    if (localStorageData) {
      setElementsOnBoard(localStorageData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("elementsOnBoard", JSON.stringify(elementsOnBoard));
  }, [elementsOnBoard]);

  const openModal = (modalProps) => {
    setIsModalOpen(true);
    setModalProps(modalProps);
  };

  const closeModal = (elementToAdd) => {
    if (elementToAdd.id) {
      const updatedElements = elementsOnBoard.map((ele) =>
        ele.id === elementToAdd.id ? { ...elementToAdd } : ele
      );
      setElementsOnBoard(updatedElements);
    } else {
      setElementsOnBoard([
        ...elementsOnBoard,
        { ...elementToAdd, id: nanoid() },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const eleType = e.dataTransfer.getData("text/plain").toLowerCase();
    const x = e.clientX;
    const y = e.clientY;
    if (eleType) {
      openModal({ eleType, x, y, text: eleType, fontSize: "", fontWeight: "" });
    }
  };

  const editComponent = (component) => {
    openModal(component);
  };

  const deleteComponent = (id) => {
    const filteredElements = elementsOnBoard.filter((ele) => ele.id !== id);
    setElementsOnBoard(filteredElements);
  };

  const updateCoordinates = (id, x, y) => {
    const updatedElements = elementsOnBoard.map((ele) =>
      ele.id === id ? { ...ele, x, y } : ele
    );
    setElementsOnBoard(updatedElements);
  };

  const onSelectedElement = (key) => {
    setSelectedElement(key);
  };

  return (
    <>
      <div
        className="board"
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        {elementsOnBoard.map((elProps) => (
          <Element
            updateCoordinates={updateCoordinates}
            editComponent={editComponent}
            deleteComponent={deleteComponent}
            key={elProps.id}
            {...elProps}
            setSelectedElement={onSelectedElement}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal
          {...modalProps}
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Board;
