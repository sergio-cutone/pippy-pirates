import React, { useState, useEffect } from "react"
import PlayerContext from "./PlayerContext"
import Logo from "../img/logo.png"
import useSound from "use-sound"
import mateySfx from "../sounds/matey.mp3"

const firebaseDoc = require("../services/fb-collection")

const Start = ({ db }) => {
  const [matey] = useSound(mateySfx)
  const [highScore, highScoreState] = useState([{ name: "", score: "" }])
  const [getPlayerName, setPlayerName] = useState(
    localStorage.getItem("ppPlayerName")
  )
  const checkPlayerName = () => {
    return getPlayerName && getPlayerName.length > 2 ? true : false
  }
  const handlePlayerName = e => {
    localStorage.setItem(
      "ppPlayerName",
      e.target.value.replace(/[^a-zA-Z ]+/g, "").toUpperCase()
    )
    setPlayerName(e.target.value.replace(/[^a-zA-Z ]+/g, "").toUpperCase())
  }

  useEffect(() => {
    db.collection(firebaseDoc)
      .orderBy("score", "desc")
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          highScoreState([
            { name: doc.data().username, score: doc.data().score },
          ])
        })
      })
  }, [db])

  return (
    <PlayerContext.Consumer>
      {value => (
        <div className="p-3">
          <div>
            <img
              src={Logo}
              alt="Pippy Pirates logo"
              width="220px"
              className="mx-auto mb-4"
            />
            <div className="font-bold leading-7 mb-3 text-2xl">
              {checkPlayerName() ? (
                <div className="text-black">
                  Welcome aboard <br />
                  Captain {getPlayerName}!
                </div>
              ) : (
                ""
              )}
            </div>
            <input
              type="text"
              onChange={handlePlayerName}
              className="w-72 p-3 text-black text-center rounded mb-3 border-2 border-black"
              maxLength="12"
              value={getPlayerName}
              placeholder="Player Name"
            />
          </div>
          <button
            onClick={() => {
              matey()
              value.setPlayerName(getPlayerName)
            }}
            className={
              "w-72 mainButton " +
              (checkPlayerName() ? "bg-green-600" : "bg-red-300")
            }
            disabled={checkPlayerName() ? false : true}
          >
            {checkPlayerName() ? "Start Game" : "Enter Player Name"}
          </button>
          <div className="font-bold bg-gray-800 bg-opacity-80 p-2 rounded text-white mt-3 text-xl">
            <div className="text-yellow-400">High Score</div>
            <div>{highScore[0].name}</div>
            <div>{highScore[0].score}</div>
          </div>
          <div className="fixed bottom-2 right-2">v 2.0.3</div>
        </div>
      )}
    </PlayerContext.Consumer>
  )
}

export default Start
