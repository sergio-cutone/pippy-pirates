import React, { useEffect } from "react"
import ship from ".././img/ship.png"
import shipBroken from ".././img/ship-broken.png"
import firestore from "../services/firestore"

const UserScore = ({ score, username }) => {
  return (
    <div className="font-bold bg-gray-800 bg-opacity-80 p-2 rounded text-white my-3 text-xl">
      <div className="text-yellow-400">Your Score</div>
      <div>{username}</div>
      <div>{score}</div>
    </div>
  )
}

const GameOver = ({
  onLevelUp,
  onGameReset,
  getGameEnd,
  level,
  maxlevel,
  score,
  username,
  db,
  onScoresState,
}) => {
  useEffect(() => {
    if (getGameEnd === "human" || level === maxlevel) {
      db.collection("matches")
        .add({
          level: level,
          score: score,
          username: username,
          timestamp: firestore.firestore.FieldValue.serverTimestamp(),
        })
        .then(docRef => {
          console.log("High score successful.")
        })
        .catch(function (error) {
          console.error("Error adding document: ", error)
        })
    }
  }, [])

  return (
    <div className="text-center pt-10">
      {getGameEnd === "human" ? (
        <div>
          <img
            src={shipBroken}
            alt="ship"
            width="260px"
            className="mb-3 mx-auto"
          />
          <div className="text-2xl mb-3 shadow-2xl">Y'arrr yah lost matey!</div>
          <UserScore score={score} username={username} />
          <button
            onClick={() => {
              onGameReset()
            }}
            className="mainButton w-40 inline"
          >
            Play Again!
          </button>{" "}
          <button
            className="mainButton mx-auto mt-3 w-40 inline"
            onClick={() => onScoresState(true)}
          >
            High Scores
          </button>
        </div>
      ) : level === maxlevel ? (
        <div>
          <img
            src={ship}
            alt="ship"
            width="200px"
            className="animate-bounce mb-3 mx-auto"
          />
          <div className="text-2xl font-bold mb-3">
            <div className="text-yellow-300">CONGRATULATIONS</div>
            Y'arr beat them all!!
          </div>
          <UserScore score={score} username={username} />
          <button
            onClick={() => {
              onGameReset()
            }}
            className="mainButton w-40 inline"
          >
            Play Again!
          </button>
          <button
            className="mainButton mx-auto mt-3 w-40 inline"
            onClick={() => onScoresState(true)}
          >
            High Scores
          </button>
        </div>
      ) : (
        <div>
          <img
            src={ship}
            alt="ship"
            width="220px"
            className="animate-bounce mb-3 mx-auto"
          />
          <div className="text-2xl mb-3 shadow-2xl">You won Captain!</div>
          <div>
            <button
              onClick={() => {
                onLevelUp()
              }}
              className="w-40 mainButton"
            >
              Level Up!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default GameOver
