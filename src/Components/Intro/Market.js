import React, { useState, useEffect } from "react"
import useSound from "use-sound"
import { CurrencyDollarIcon, CubeIcon } from "@heroicons/react/solid"
import coinsSfx from "../../sounds/coins.mp3"

const Market = ({ onHandleFooter, hightlightArea, onHandleLoot }) => {
  const [boost, boostState] = useState(0)
  const handleLoot = () => {
    coin()
    boostState(1)
    onHandleLoot()
    onHandleFooter("boost")
  }
  const [coin] = useSound(coinsSfx)

  useEffect(() => {
    onHandleFooter()
  }, [])
  return (
    <>
      <p className="text-yellow-400 mb-3 text-center">The Market</p>
      {boost === 0 && (
        <>
          <p className="mb-3">
            The market allows you to purchase Boosts for{" "}
            <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
            500 and Single Shots for{" "}
            <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
            1000. Purchase a Boost by tapping the bouncing button.
          </p>
          {boost === 0 && (
            <div className="grid grid-cols-2 mt-4 mb-3">
              <div className="text-center">
                <CubeIcon className="text-yellow-400 inline w-6" />
                <br />
                Extra Boost
              </div>
              <div className="text-center">
                <button
                  className="mainButton mb-1 animate-bounce"
                  onClick={() => handleLoot()}
                >
                  <CurrencyDollarIcon className="text-gray-800 inline w-5 -mt-1" />
                  500
                </button>
                <p>Tap to buy</p>
              </div>
            </div>
          )}
          <p className="text-center text-yellow-400 mb-2">Boosts: {boost}</p>
        </>
      )}
      {hightlightArea === "boost" && (
        <>
          <p className="mb-3">
            Great, you just bought your first Boost, lets add it to a dice face.
            Tap the Boost icon below.
          </p>
          <p className="text-center text-yellow-400 mb-2">Boosts: {boost}</p>
        </>
      )}
    </>
  )
}

export default Market
