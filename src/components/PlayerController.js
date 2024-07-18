import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  INCREMENT_X,
  DECREMENT_X,
  INCREMENT_Y,
  DECREMENT_Y,
} from "../actions/actionTypes";
import "./PlayerController.css";

const PlayerController = ({
  incrementX,
  decrementX,
  incrementY,
  decrementY,
  isUp,
  setIsUp,
  isDown,
  setIsDown,
  isLeft,
  setIsLeft,
  isRight,
  setIsRight,
  isModalOpen,
}) => {
  const handleMovement = (direction) => {
    switch (direction) {
      case "ArrowUp":
        decrementY();
        setIsDown(true);
        setIsUp(false);
        setIsLeft(false);
        setIsRight(false);
        break;
      case "ArrowDown":
        incrementY();
        setIsUp(true);
        setIsDown(false);
        setIsLeft(false);
        setIsRight(false);
        break;
      case "ArrowLeft":
        decrementX();
        setIsLeft(true);
        setIsRight(false);
        setIsDown(false);
        setIsUp(false);
        break;
      case "ArrowRight":
        incrementX();
        setIsRight(true);
        setIsLeft(false);
        setIsDown(false);
        setIsUp(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      if (!isModalOpen) {
        handleMovement(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen]);

  return (
    <div className="controller">
      <p className="sub-header">...OR YOU CAN USE THESE ARROW KEYS❤️‍🔥</p>
      <div className="button-group">
        <div className="vertical-buttons">
          <button
            className="button up"
            onClick={() => {
              handleMovement("ArrowUp");
              setIsDown(true);
              setIsUp(false);
              setIsLeft(false);
              setIsRight(false);
            }}
          >
            <img
              src="up arrow.png"
              alt="Arrow Up"
              className="arrow-icon small"
            />
          </button>
        </div>
        <div className="horizontal-buttons">
          <button
            className="button down"
            onClick={() => {
              handleMovement("ArrowDown");
              setIsUp(true);
              setIsDown(false);
              setIsLeft(false);
              setIsRight(false);
            }}
          >
            <img
              src="down arrow.png"
              alt="Arrow Down"
              className="arrow-icon small"
            />
          </button>
          <button
            className="button right"
            onClick={() => {
              handleMovement("ArrowRight");
              setIsRight(true);
              setIsLeft(false);
              setIsDown(false);
              setIsUp(false);
            }}
          >
            <img
              src="right arrow.png"
              alt="Arrow Right"
              className="arrow-icon small"
            />
          </button>
          <button
            className="button left"
            onClick={() => {
              handleMovement("ArrowLeft");
              setIsLeft(true);
              setIsRight(false);
              setIsDown(false);
              setIsUp(false);
            }}
          >
            <img
              src="left arrow.png"
              alt="Arrow Left"
              className="arrow-icon small"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  incrementX: () => dispatch({ type: INCREMENT_X }),
  decrementX: () => dispatch({ type: DECREMENT_X }),
  incrementY: () => dispatch({ type: INCREMENT_Y }),
  decrementY: () => dispatch({ type: DECREMENT_Y }),
});

export default connect(null, mapDispatchToProps)(PlayerController);
