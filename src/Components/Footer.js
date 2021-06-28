import React from "react"
import {
  CurrencyDollarIcon,
  CubeIcon,
  LightningBoltIcon,
  CogIcon,
  ArrowDownIcon,
} from "@heroicons/react/solid"

const numberOfBoosts = data => {
  const getHuman = data.filter(e => e.type === "human")
  return getHuman[0].boost
}

const NumberOfShots = ({ data }) => {
  const getHuman = data.filter(e => e.type === "human")
  return getHuman[0].shots
}

const Footer = ({
  data,
  score,
  streak,
  onBoostScreen,
  onSpendLootScreen,
  onSingleShot,
  roll,
  boostTip,
}) => {
  return (
    <div
      id="footer"
      className="absolute bottom-0 left-0 w-full bg-black h-12 bg-opacity-20"
    >
      <div
        className={`flex justify-center content-center ${roll && "opacity-50"}`}
      >
        <div className="absolute bottom-2 left-3 text-2xl font-bold">
          {boostTip && (
            <ArrowDownIcon className="absolute left-3 bottom-8 animate-bounce h-10" />
          )}
          <span
            onClick={() => {
              !roll && onBoostScreen()
            }}
            className="mr-5 cursor-pointer hover:opacity-50"
          >
            <CubeIcon
              className={`w-8 h-8 inline text-yellow-400 ${
                numberOfBoosts(data) > 0 && "animate-pulse"
              }`}
            />
            {numberOfBoosts(data)}
          </span>
          <span
            className="mr-5 cursor-pointer hover:opacity-50"
            onClick={() => {
              !roll && onSingleShot()
            }}
          >
            <CogIcon className="w-8 h-8 inline text-yellow-400" />
            <NumberOfShots data={data} />
          </span>
          <span>
            <LightningBoltIcon className="w-8 h-8 inline text-yellow-400" />
            {streak}
          </span>
        </div>
        <div className="absolute bottom-2 right-3 text-2xl font-bold">
          <span
            className="font-bold leading-10 cursor-pointer hover:opacity-50"
            onClick={() => {
              !roll && onSpendLootScreen()
            }}
          >
            <CurrencyDollarIcon className="w-8 h-8 text-yellow-300 inline -mt-1" />
            {score}
          </span>
        </div>
      </div>
    </div>
  )
}
export default Footer
