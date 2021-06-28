import React from "react"
import Player from "./Player"
import { FireIcon } from "@heroicons/react/solid"

const Players = ({
  data,
  onRollDice,
  playButton,
  throwFromLeftToggle,
  winner,
  level,
}) => {
  return (
    <div id="players" className={`relative mt-14`}>
      <div>
        {data.map((e, i) => (
          <div className={`relative mb-11 max-w-xs h-auto`} key={e.type}>
            <Player
              name={e.name}
              health={e.health}
              faces={e.faces}
              rollresult={e.rollresult}
              rolltoggle={e.rolltoggle}
              throwtoggle={throwFromLeftToggle}
              faceColour={e.faceColour}
              pipColour={e.pipColour}
              type={e.type}
              winner={winner}
              ship={e.ship}
              level={level}
            />
          </div>
        ))}
      </div>
      <button
        className={
          "absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-36 h-32 shadow-2xl mainButton text-center " +
          (!playButton ? "invisible" : "")
        }
        onClick={() => onRollDice()}
      >
        Fire Away!
        <FireIcon className="w-20 mx-auto" />
      </button>
    </div>
  )
}
export default Players
