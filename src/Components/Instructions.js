import React from "react"
import {
  CubeIcon,
  LightningBoltIcon,
  CurrencyDollarIcon,
  CogIcon,
} from "@heroicons/react/solid"

const Instructions = ({
  onScoresState,
  onRulesTips,
  onBoostScreen,
  onSpendLootScreen,
  onOverlay,
}) => {
  const handleBootscreen = () => {
    onOverlay()
    onBoostScreen()
  }
  const handleSpendLootScreen = () => {
    onOverlay()
    onSpendLootScreen()
  }
  return (
    <div className="leading-4-5 sm:leading-7">
      <div className="mb-3">
        For each roll, earn{" "}
        <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
        {""}
        100 for each pip you win by and{" "}
        <CurrencyDollarIcon className="text-yellow-300 inline -mt-1 w-5 h-5" />
        {""}
        25 for every tie.
      </div>
      <div className="grid grid-rows lg:grid-cols-2 gap-3">
        <div
          className="p-1 md:p-2 border border-white rounded text-left cursor-pointer"
          onClick={() => handleBootscreen()}
        >
          <p>
            <CubeIcon className="w-4 md:w-8 inline text-yellow-400 -mt-1 mr-2" />
            <span className="font-bold text-yellow-400">Boost</span>
          </p>
          Use this to increase the amount of pips on your dice faces.
        </div>
        <div className="p-1 md:p-2 border border-white rounded text-left">
          <p>
            <CogIcon className="w-4 md:w-8 inline text-yellow-400 -mt-1 mr-2" />
            <span className="font-bold text-yellow-400">Shot</span>
          </p>
          Use this to send an instant shot at your enemy.
        </div>
        <div className="p-1 md:p-2 border border-white rounded text-left">
          <p>
            <LightningBoltIcon className="w-4 md:w-8 inline text-yellow-400 -mt-1 mr-2" />
            <span className="font-bold text-yellow-400">Streak</span>
          </p>
          Get a Boost for every 3 dice wins in a row. Resets after a loss.
        </div>
        <div
          className="p-1 md:p-2 border border-white rounded text-left cursor-pointer"
          onClick={() => handleSpendLootScreen()}
        >
          <p>
            <CurrencyDollarIcon className="w-4 md:w-8 inline text-yellow-400 -mt-1 mr-2" />
            <span className="font-bold text-yellow-400">Market</span>
          </p>
          Use your booty to purchase more Boosts and Shots.
        </div>
      </div>
      <div className="text-center">
        <p>
          <button
            className="mainButton my-3 w-52 h-11 leading-5"
            onClick={() => onRulesTips(true)}
          >
            More Rules & Tips
          </button>
        </p>
        <p>
          <button
            className="mainButton mx-auto w-52 h-11 leading-5"
            onClick={() => onScoresState(true)}
          >
            High Scores
          </button>
        </p>
      </div>
    </div>
  )
}

export default Instructions
