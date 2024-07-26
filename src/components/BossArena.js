import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./MapBase.css";
import Modal from "./Modal";

const BossArena = ({
  player,
  npc,
  solidBlocks,
  isUp,
  isDown,
  isLeft,
  isRight,
  isModalOpen,
  setIsModalOpen,
  playerHealth,
  setPlayerHealth,
  enemyHealth,
  setEnemyHealth,
  playerStrength,
  setPlayerStrength,
  enemyStrength,
  setEnemyStrength,
  bossHealth,
  setBossHealth,
  bossStrength,
  isBoss,
}) => {
  const size = 10;
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const createMapMatrix = () => {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      // First and last column
      matrix[i][0] = 1;
      matrix[i][size - 1] = 1;
    }
    for (let j = 0; j < size; j++) {
      // First and last row
      matrix[0][j] = 1;
      matrix[size - 1][j] = 1;
    }
    // define coordinates for the door
    matrix[7][5] = 8;
    // Add solid blocks to the matrix
    solidBlocks.forEach((block) => {
      matrix[block.y][block.x] = 4;
    });

    matrix[player.y][player.x] = 2;
    matrix[npc.y][npc.x] = 3;

    return matrix;
  };

  const matrix = createMapMatrix();

  const renderTable = (matrix) => {
    return matrix.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => {
          let className = "";

          if (cell === 1) {
            className = "boss-arena-wall";
          } else if (cell === 2) {
            className = `${
              (isUp ? "player-up" : "") ||
              (isDown ? "player-down" : "") ||
              (isLeft ? "player-left" : "") ||
              (isRight ? "player-right" : "") ||
              "player"
            }`;
          } else if (cell === 3) {
            className = bossHealth === 0 ? "boss-arena-wall" : "boss";
          } else if (cell === 4) {
            className = "solid-block";
          } else if (cell === 8) {
            className = isDoorOpen ? "tp-open-mud" : "tp-closed-mud";
          }
          return (
            <div key={colIndex} className={`cell boss-tile ${className}`}></div>
          );
        })}
      </div>
    ));
  };
  useEffect(() => {
    if (bossHealth === 0) {
      setIsDoorOpen(true);
    }
  }, [player, setIsDoorOpen]);
  useEffect(() => {
    if (player.x === npc.x && player.y === npc.y) {
      setIsModalOpen(true);
    }
  }, [player, npc, setIsModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    const randomX = Math.floor(Math.random() * (size - 2)) + 1;
    const randomY = Math.floor(Math.random() * (size - 2)) + 1;
    npc.x = randomX;
    npc.y = randomY;
  };
  const defeteatBoss = () => {
    if (bossHealth === 0) {
      setIsModalOpen(false);
      // remove npc from the map
      npc.x = 0;
      npc.y = 0;
      alert("🎊You defeated the boss!");
    }
  };
  return (
    <div className="map-base-container">
      <div className="map-base-table">{renderTable(matrix)}</div>
      {isModalOpen && (
        <Modal
          playerHealth={playerHealth}
          setPlayerHealth={setPlayerHealth}
          enemyHealth={bossHealth}
          setEnemyHealth={setBossHealth}
          playerStrength={playerStrength}
          enemyStrength={bossStrength}
          closeModal={closeModal}
          setPlayerStrength={setPlayerStrength}
          isBoss={true} // Pass the isBoss prop
          respawnEnemy={defeteatBoss}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.player.player,
  npc: state.player.npc,
  solidBlocks: state.player.solidBlocks,
});

export default connect(mapStateToProps)(BossArena);
