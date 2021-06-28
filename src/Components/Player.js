import React from "react"
import Dice from "./Dice"
import { HeartIcon, CloudIcon, CogIcon, FireIcon } from "@heroicons/react/solid"
import waves from "../img/waves.png"

const Hits = ({ health }) => {
  const holesArray = Array.apply(null, { length: 5 - health }).map(
    Number.call,
    Number
  )
  const positions = [
    "left-7 bottom-7 sm:left-8",
    "right-5 bottom-9 sm:bottom-10",
    "left-16 bottom-4 sm:left-18 sm:bottom-6",
    "right-14 bottom-4 sm:right-16 sm:bottom-5",
    "right-24 bottom-4 sm:left-28 sm:bottom-5",
  ]

  return (
    <div>
      {holesArray.map((e, i) => (
        <div key={`holes-${i}`}>
          <FireIcon
            className={`absolute z-50 h-5 text-yellow-500 puff-out-bottom transform ${positions[i]}`}
          />
          <CogIcon
            className={`absolute z-50 h-5 text-gray-500 ${positions[i]}`}
          />
        </div>
      ))}
    </div>
  )
}

const Shots = ({ puff }) => {
  const positions = [
    "bottom-5 left-9 sm:left-11 sm:bottom-5",
    "bottom-4 right-9",
    "bottom-2 left-18 sm:left-20 sm:bottom:3",
    "bottom-2 right-18 sm:right-20 sm:bottom-3",
  ]
  return (
    <div>
      {positions.map((e, i) => (
        <CloudIcon
          className={`h-10 w-10 text-white absolute z-50 transform block ${e} ${puff}`}
          key={`shot-${i}`}
        />
      ))}
    </div>
  )
}

const Player = ({
  name,
  health,
  faces,
  rollresult,
  rolltoggle,
  throwtoggle,
  faceColour,
  pipColour,
  type,
  winner,
  ship,
  level,
}) => {
  return (
    <div>
      <Dice
        faces={faces}
        rollresult={rollresult}
        rolltoggle={rolltoggle}
        throwtoggle={throwtoggle}
        faceColour={faceColour}
        pipColour={pipColour}
        type={type}
      />
      {type === "cpu" ? (
        <div>
          <div className="ship relative">
            {winner === "cpu" && <Shots puff={"puff-out-top"} />}
            <Hits health={health} />
            <img
              src={require("../img/" + ship).default}
              alt="ship"
              width="220px"
              className="mx-auto sm:w-60"
            />
          </div>
          <div
            className={`rounded h-6 w-6 absolute -bottom-7 left-1 z-50 bg-white text-gray-500 font-bold`}
          >
            {level}
          </div>
        </div>
      ) : (
        ""
      )}
      {type === "human" ? (
        <div className="ship relative">
          {winner === "human" && <Shots puff={"puff-out-bottom"} />}
          <Hits health={health} />
          <img
            src={require("../img/" + ship).default}
            alt="ship"
            width="220px"
            className="mx-auto sm:w-60"
          />
        </div>
      ) : (
        ""
      )}
      <div className="absolute -bottom-8 z-40">
        <div className="absolute bottom-1.5 mx-auto inset-x-0 z-40 font-bold">
          {name}
        </div>
        <div className="absolute bottom-4 -right-2 z-50">
          <HeartIcon className="h-16 w-16 inline text-red-700" />
          <div className="absolute right-0 top-4 text-xl font-bold mx-auto inset-x-0 leading-8">
            {health}
          </div>
        </div>
        <img src={waves} alt="waves" width="220px" className="sm:w-60" />
      </div>
    </div>
  )
}

export default Player
