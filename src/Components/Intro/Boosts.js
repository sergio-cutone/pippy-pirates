import React, { useState, useEffect } from "react"
import useSound from "use-sound"
import opencloseSfx from "../../sounds/openclose.mp3"
import boostSfx from "../../sounds/boost.mp3"

const Boosts = ({ onHandlePages, onHandleFooter, name }) => {
  const [boost, boostState] = useState(1)
  const [click] = useSound(opencloseSfx)
  const [boostBonus] = useSound(boostSfx)

  useEffect(() => {
    onHandleFooter()
  }, [])

  const handleBoost = () => {
    click()
    boostBonus()
    boostState(0)
  }
  return (
    <div>
      <p className="text-yellow-400 mb-3 text-center">Boosts</p>
      {boost === 1 && (
        <p className="mb-3">
          Boosts allow you to upgrade the faces on your dice. Try it now by
          clicking the bouncing dice face.
        </p>
      )}
      {boost === 0 && (
        <div>
          <p className="mb-3 text-center">
            Great, you made your dice more powerful!
            <br />
            Always keep your dice fully upgraded.
          </p>
        </div>
      )}
      <p className="text-center">{name}</p>
      <p className="text-center text-yellow-400 mb-3">Boosts: {boost}</p>
      <div className="grid grid-cols-3 gap-1 mb-3">
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>{" "}
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto cursor-pointer ${
            boost === 1 && "animate-bounce"
          }`}
          onClick={() => handleBoost()}
        >
          {boost === 1 && <span className={`dot dot-10 bg-white`}></span>}
          {boost === 0 && (
            <span>
              <span className="dot dot-20 bg-white"></span>
              <span className="dot dot-21 bg-white"></span>
            </span>
          )}
        </div>
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
      </div>
      <p className="text-center mb-3">Enemy Pirate</p>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-1">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto`}
        >
          <span className="dot dot-20 bg-white"></span>
          <span className="dot dot-21 bg-white"></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>{" "}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto cursor-pointer`}
        >
          <span className="dot dot-20 bg-white"></span>
          <span className="dot dot-21 bg-white"></span>
        </div>
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto`}
        >
          <span className={`dot dot-10 bg-white`}></span>
        </div>
      </div>
      {boost === 0 && (
        <p className="text-center animate-bounce mt-3">
          <button className="mainButton mt-3" onClick={() => onHandlePages(4)}>
            Next: Single Shots
          </button>
        </p>
      )}
    </div>
  )
}

export default Boosts
