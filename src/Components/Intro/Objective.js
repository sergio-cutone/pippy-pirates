import React, { useState } from "react"
import { CurrencyDollarIcon, FireIcon } from "@heroicons/react/solid"
import useSound from "use-sound"
import rollSfx from "../../sounds/roll.mp3"

const Objective = ({ name, onHandleFooter }) => {
  const [rollSound] = useSound(rollSfx)
  const [roll, rollState] = useState(false)
  const handleRoll = () => {
    rollSound()
    rollState(true)
    onHandleFooter("market")
  }
  return (
    <div className="text-center">
      {!roll && (
        <div>
          <p className="mb-3">
            Y'arrr... Welcome to the dicey seas
            <br /> CAPTAIN {name}!
          </p>
          <p className="text-yellow-300 mb-3">Your Objective</p>
          <p className="mb-3">
            Pippy Pirates is like the classic card game War, but with dice. Win,
            earn loot, then use that loot to upgrade your dice and make it more
            powerful!
          </p>
          <p className="text-center mb-3">
            Let's try it, tap the button to roll...
          </p>
          <button
            className="mainButton animate-pulse"
            onClick={() => handleRoll()}
          >
            Fire Away!
            <FireIcon className="w-20 mx-auto" />
          </button>
        </div>
      )}
      {roll && (
        <div>
          <p className="text-yellow-400 mb-3">Roll Example</p>
          <p>
            You earn{" "}
            <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
            {""}
            100 for each pip (dot on a dice) you win by and{" "}
            <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
            25 for every tie.
          </p>
          <div className="grid grid-cols-2 gap-1 my-5">
            <div>
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-yellow-800 mx-auto`}
              >
                <span className="dot dot-60 bg-white"></span>
                <span className="dot dot-61 bg-white"></span>
                <span className="dot dot-62 bg-white"></span>
                <span className="dot dot-63 bg-white"></span>
                <span className="dot dot-64 bg-white"></span>
                <span className="dot dot-65 bg-white"></span>
              </div>
              Your Roll
            </div>
            <div>
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 relative rounded-md border-2 border-black bg-green-800 mx-auto`}
              >
                <span className={`dot dot-10 bg-white`}></span>
              </div>
              Enemy Roll
            </div>
          </div>
          <p className="mb-3">
            You won this roll <span className="text-yellow-400">6</span> pips to{" "}
            <span className="text-yellow-400">1</span> pip, for a difference of{" "}
            <span className="text-yellow-400">5</span> pips which earned you a
            bounty of{" "}
            <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
            500, awesome!
          </p>
          <p className="text-center">
            Spend that loot by tapping the Loot icon below.
          </p>
        </div>
      )}
    </div>
  )
}

export default Objective
