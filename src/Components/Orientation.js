import React, { useState, useEffect } from "react"
import Ship from "../img/ship-broken.png"

const Orientation = () => {
  const [mobileLandscape, mobileLandscapeState] = useState(false)
  useEffect(() => {
    const check = () => {
      const width = document.body.clientWidth
      const height = document.body.clientHeight
      const ratio = width > height && width / height
      if (ratio > 1.77) {
        mobileLandscapeState(true)
      } else {
        mobileLandscapeState(false)
      }
    }
    window.addEventListener("resize", check)
    check()
  }, [])
  return (
    <div
      className={
        "bg-gray-900 w-screen h-screen absolute top-0 left-0 z-50 justify-center items-center flex-col flex font-bold text-white " +
        (mobileLandscape ? "visible" : "invisible")
      }
    >
      <img src={Ship} className="h-24 mb-3" alt="broken ship" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 animate-bounce inline"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      Y'arr Please Rotate Your Screen!
    </div>
  )
}
export default Orientation
