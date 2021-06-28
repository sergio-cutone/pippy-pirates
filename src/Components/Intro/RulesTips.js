import React from "react"
import { CurrencyDollarIcon, LightningBoltIcon } from "@heroicons/react/solid"

const RulesTips = ({ onIntroScreen }) => {
  return (
    <div className="leading-4-5 sm:leading-7">
      <p className="text-yellow-400 mb-3 text-center">Rules & Tips</p>
      <p className="mb-3">
        <span className="text-yellow-400">1.</span> Earn a FREE Boost and{" "}
        <CurrencyDollarIcon className="w-4 h-4 text-yellow-300 inline -mt-1" />
        250 for 3 straight dice rolls that you win. Check the Streak icon{" "}
        <LightningBoltIcon className="text-yellow-400 inline w-4 -mt-1" /> below
        to keep track.
      </p>
      <p className="mb-3">
        <span className="text-yellow-400">2.</span> Receive{" "}
        <CurrencyDollarIcon className="w-4 h-4 text-yellow-300 inline -mt-1" />
        150 in interest for every{" "}
        <CurrencyDollarIcon className="w-4 h-4 text-yellow-300 inline -mt-1" />
        1000 you have at the beginning of a level.
      </p>
      <p className="mb-3">
        <span className="text-yellow-400">3.</span> You can reset the Boost that
        you used within each level to reconfigure your dice faces. Pips are
        locked in their position at the start of a new level.
      </p>
      <p className="mb-3">
        <span className="text-yellow-400">Tip:</span> Use up your Boost when it
        is available. The best defence is a good offence!
      </p>
      <p className="mb-3">
        <span className="text-yellow-400">Tip:</span> Press Your Luck... Load a
        single dice face with Boosts for a chance to win big. A win of 4 to 1
        will earn you{" "}
        <CurrencyDollarIcon className="w-4 h-4 text-yellow-300 inline -mt-1" />
        300, leaving you only{" "}
        <CurrencyDollarIcon className="w-4 h-4 text-yellow-300 inline -mt-1" />
        200 away from purchasing another Boost!
      </p>
      {onIntroScreen && (
        <p className="text-center">
          <button
            className="mainButton w-44 h-18"
            onClick={() => onIntroScreen()}
          >
            Hit The
            <br />
            Dicey Seas!
          </button>
        </p>
      )}
    </div>
  )
}

export default RulesTips
