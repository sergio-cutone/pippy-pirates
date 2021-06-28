import React from "react"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"

const Boost = ({
  data,
  setBoost,
  resetBoost,
  boostScreenState,
  boostIncreaseToggle,
  dicesides,
}) => {
  return (
    <div className="text-center">
      {data.map((e, i) => (
        <div className="pb-2 border-b border-gray-500" key={`player-${e.type}`}>
          <p className="my-1">{e.name}</p>
          <div className="grid grid-cols-3 gap-2 my-2">
            {e.faces.map((f, i) => (
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black ${e.faceColour} mx-auto`}
                onClick={() => {
                  e.type === "human" && setBoost(i)
                }}
                key={`faces-${i}`}
              >
                {dicesides[f - 1].pips.map((g, i) => (
                  <span
                    className={`dot ${g} ${e.pipColour}`}
                    key={`cpu-dot-${i}`}
                  ></span>
                ))}
              </div>
            ))}
          </div>
          <span className="text-yellow-400">
            {e.type === "human" && `Boosts: ${e.boost}`}
          </span>
        </div>
      ))}
      <div>
        <p className="mb-2">
          Click on a Dice Face to increase <br />
          its pip value (max 9 pips)
        </p>
        <button
          className={
            "saveButton shadow-xl mr-1 inline " +
            (!boostIncreaseToggle.current ? "invisible" : "")
          }
          onClick={() => {
            boostScreenState()
          }}
        >
          <CheckCircleIcon className="inline h-8" />
        </button>
        <button
          className={
            "resetButton shadow-xl ml-1 inline " +
            (!boostIncreaseToggle.current ? "invisible" : "")
          }
          onClick={() => {
            resetBoost()
          }}
        >
          <XCircleIcon className="inline w-8" />
        </button>
      </div>
    </div>
  )
}

export default Boost
