
import React, { useState, useEffect, useRef } from "react";

const Element = ({
  id,
  eleType,
  text,
  x,
  y,
  fontSize = 16,
  fontWeight = 400,
  setSelectedElement,
  editComponent,
  deleteComponent,
  updateCoordinates,
}) => {
  const [active, setActive] = useState(false);
  const [initialX, setInitialX] = useState();
  const [initialY, setInitialY] = useState();
  const [currentX, setCurrentX] = useState(x);
  const [currentY, setCurrentY] = useState(y);
  const [offsetX, setOffsetX] = useState(x);
  const [offsetY, setOffsetY] = useState(y);
  const [isFocused, setIsFocused] = useState(false);
  const elRef = useRef();

  useEffect(() => {
    setCurrentX(x);
    setCurrentY(y);
    setOffsetX(x);
    setOffsetY(y);
  }, [x, y]);

  const handleMouseDown = (e) => {
    setInitialX(e.clientX - offsetX);
    setInitialY(e.clientY - offsetY);

    if (e.target === elRef.current) {
      setActive(true);
    }
  };

  const handleMouseMove = (e) => {
    if (active) {
      e.preventDefault();

      if (currentX < 0) {
        setCurrentX(0);
      } else if (
        e.target.clientWidth + currentX <=
        e.target.offsetParent.clientWidth
      )
        setCurrentX(e.clientX - initialX);
      else setCurrentX(currentX - 1);

      if (currentY < 0) {
        setCurrentY(0);
      } else if (
        e.target.clientHeight + currentY <=
        e.target.offsetParent.clientHeight
      ) {
        setCurrentY(e.clientY - initialY);
      } else {
        setCurrentY(currentY - 1);
      }
      setOffsetX(currentX);
      setOffsetY(currentY);
    }
  };

  const handleMouseUp = (e) => {
    setInitialX(currentX);
    setInitialY(currentY);
    setActive(false);
    updateCoordinates(id, currentX, currentY);
  };

  const handleKeyDown = (e) => {
    if (e.code.toLowerCase() === "delete") {
      deleteComponent(id);
    } else if (e.code.toLowerCase() === "enter") {
      editComponent({
        id,
        eleType,
        text,
        fontSize,
        fontWeight,
        x: currentX,
        y: currentY,
      });
    }
  };

  return React.createElement(
    eleType === "label" ? "button" : eleType,
    {
      ref: elRef,
      placeholder: eleType === "input" ? text : undefined,
      className: `comp comp__${eleType}`,
      style: {
        fontSize: `${fontSize}px`,
        fontWeight,
        transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
        border: isFocused ? "2px solid #D95409" : "none",
      },
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
      onKeyDown: handleKeyDown,
      onFocus: () => {
        setIsFocused(true);
        setSelectedElement(id);
      },
      onBlur: () => {
        setIsFocused(false);
        setSelectedElement(null);
      },
    },
    eleType !== "input" ? text : undefined
  );
};

export default Element;

