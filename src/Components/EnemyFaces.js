import React, { useEffect, useState } from "react"
import dicesides from "../Helpers/dicesides"
import { XCircleIcon } from "@heroicons/react/solid"

const EnemyFaces = ({ data, onEnemyFacesScreen, colour }) => {
  const getCpu = data.filter(e => e.type === "cpu")
  const getFaces = getCpu.map(e => e.faces)
  const [screenScale, screenScaleState] = useState(1)

  useEffect(() => {
    if (document.getElementById("enemyfaces")) {
      function handleResize() {
        const win_w = window.innerWidth
        const win_h = window.innerHeight
        const screenH = document.getElementById("enemyfaces").offsetHeight
        const screenW = document.getElementById("enemyfaces").offsetWidth
        const win_scale = Math.min(win_w / screenW, win_h / screenH)
        screenScaleState(win_scale)
      }

      window.addEventListener("resize", handleResize)
      handleResize()
      return _ => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])
  const scaleY = {
    transform: `scale(${screenScale})`,
  }
  return (
    <div className="bg-gray-800 bg-opacity-90 w-screen h-screen absolute top-0 left-0 z-50 justify-center items-center flex-col p-3 flex">
      <XCircleIcon
        className="w-9 h-9 text-red-500 absolute top-1 right-2 fill-current"
        onClick={() => onEnemyFacesScreen()}
      />
      <div id="enemyfaces" style={scaleY} className="p-10 md-p-20">
        <div className="text-2xl font-bold">Enemy Dice Faces</div>
        <div id="dice-sides" className="grid grid-cols-3 gap-3 my-3">
          {getFaces[0].map((e, i) => (
            <div className={`${colour} sides side-${i}`}>
              {dicesides[e - 1].pips.map(e => (
                <span className={`dot ${e}`}></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EnemyFaces
