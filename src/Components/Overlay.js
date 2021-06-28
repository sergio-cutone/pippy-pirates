import React from "react"
import { XCircleIcon } from "@heroicons/react/solid"

const Overlay = ({ io, onOverlay, children }) => {
  return (
    <div
      className={
        "bg-gray-800 bg-opacity-95 w-screen h-screen fixed top-0 left-0 z-50 items-center flex-col flex overflow-y-auto"
      }
    >
      {!io || (
        <XCircleIcon
          className="text-green-400 h-9 fixed right-2 mobi:right-5 top-1 cursor-pointer"
          onClick={() => {
            onOverlay()
          }}
        />
      )}
      <div
        id="inner"
        className="max-w-screen-md font-bold py-10 px-6 text-sm mobi:text-md sm:text-2xl leading-5 mobi:leading-8 text-left"
      >
        {children}
      </div>
    </div>
  )
}

export default Overlay
