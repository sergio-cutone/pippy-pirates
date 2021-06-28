import React from "react"
import { HeartIcon } from "@heroicons/react/solid"

const HealthBar = React.memo(({ health, name, type }) => {
  let myArray = Array.apply(null, { length: health }).map(Number.call, Number)
  return (
    <div className="p-2 pt-3 bg-black rounded leading-3 w-56 my-2">
      <div className="mb-2">{name}</div>
      <div className="h-5">
        {myArray.map((e, i) => (
          <HeartIcon
            className="h-5 w-5 inline text-red-600"
            key={`heart-${i}`}
          />
        ))}
      </div>
    </div>
  )
})

export default HealthBar
