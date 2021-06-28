import React, { useEffect } from "react"
import { CloudIcon } from "@heroicons/react/solid"
import Ship from "../../img/ship.png"

const Shots = ({ onHandlePages, onHandleFooter, shot, onIntroScreen }) => {
  useEffect(() => {
    onHandleFooter("shot")
  }, [])
  return (
    <div className="text-center">
      <p className="text-yellow-400 mb-3">Single Shots</p>
      {!shot && (
        <p className="mb-5">
          With a Single Shot, you instantly deal 1 damage to your opponent. Try
          it now by clicking the Single Shot icon below.
        </p>
      )}
      {shot && (
        <p className="mb-5">
          Y'arr, you're all set to hit the Dicey seas! So batten down the
          hatches and get out there, or read the Extra Rules and Tips
          (recommended).
        </p>
      )}
      <div className="relative">
        <div className="mx-auto w-56 relative">
          {shot && (
            <div>
              <CloudIcon
                className={`absolute z-50 h-10 text-white left-9 bottom-5 transform puff-out-bottom`}
              />
              <CloudIcon
                className={`absolute z-50 h-10 text-white left-18 bottom-3 transform puff-out-bottom`}
              />
              <CloudIcon
                className={`absolute z-50 h-10 text-white right-18 bottom-3 transform puff-out-bottom`}
              />
              <CloudIcon
                className={`absolute z-50 h-10 text-white right-8 bottom-5 transform puff-out-bottom`}
              />
            </div>
          )}
          <img src={Ship} alt="ship" className="w-full mx-auto mb-5" />
        </div>
      </div>
      {shot && (
        <div className="text-center">
          <p>
            <button
              className="mainButton w-44 h-18 mb-3"
              onClick={() => onHandlePages(5)}
            >
              Extra Rules
              <br />& Tips
            </button>
          </p>
          <p>
            <button
              className="mainButton w-44 h-18"
              onClick={() => onIntroScreen()}
            >
              Hit The
              <br />
              Dicey Seas!
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
export default Shots
