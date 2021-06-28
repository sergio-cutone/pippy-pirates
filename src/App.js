import React, { useState, useRef } from "react"
import "./App.scss"
import PlayerContext from "./Components/PlayerContext"
import Main from "./Components/Main"
import Start from "./Components/Start"
import Orientation from "./Components/Orientation"
import firestore from "./services/firestore"

function App() {
  const [playerName, setPlayerName] = useState(false)
  const [volume, volumeState] = useState(1)
  const db = useRef(firestore.firestore())

  return (
    <div className="App select-none">
      <div className="App-container">
        <PlayerContext.Provider
          value={{ playerName, setPlayerName, volume, volumeState }}
        >
          <>
            {!playerName ? <Start db={db.current} /> : <Main db={db.current} />}
          </>
        </PlayerContext.Provider>
      </div>
      <Orientation />
    </div>
  )
}

export default App
