import React from "react"
import PlayerContext from "../Components/PlayerContext"
import Game from "../Components/Game"

const Main = ({ db }) => {
  return (
    <PlayerContext.Consumer>
      {value => (
        <Game
          humanname={value.playerName}
          volume={value.volume}
          volumeState={value.volumeState}
          db={db}
        />
      )}
    </PlayerContext.Consumer>
  )
}

export default Main
