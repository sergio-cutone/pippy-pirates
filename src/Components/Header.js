import React from "react"
import {
  QuestionMarkCircleIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid"

const Header = ({
  onInstructionScreen,
  roll,
  volume,
  onVolumeToggle,
  points,
}) => {
  return (
    <div
      id="header"
      className="h-11 absolute top-0 left-0 bg-black bg-opacity-60 w-full py-2"
    >
      {volume === 1 ? (
        <VolumeUpIcon
          className="w-9 absolute top-1 left-2 cursor-pointer text-gray-200 hover:opacity-50"
          onClick={() => onVolumeToggle(0)}
        />
      ) : (
        <VolumeOffIcon
          className="w-9 absolute top-1 left-2 cursor-pointer text-gray-400"
          onClick={() => onVolumeToggle(1)}
        />
      )}
      <div className="mx-auto rounded bg-gradient-to-b from-yellow-600 to-yellow-800 w-28 leading-2 font-bold text-xl">
        {points}
      </div>
      <QuestionMarkCircleIcon
        className="w-9 h-9 text-green-400 absolute top-1 right-2 cursor-pointer hover:opacity-50"
        onClick={() => !roll && onInstructionScreen()}
      />
    </div>
  )
}
export default Header
