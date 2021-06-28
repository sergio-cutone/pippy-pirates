import React from "react"
import dicesides from "../Helpers/dicesides"

const Dice = React.memo(
  ({ faces, rollresult, rolltoggle, throwtoggle, faceColour, pipColour }) => {
    return (
      <div
        className={
          "absolute top-2 left-3 my-2 z-50 " +
          (throwtoggle ? "roll-in-left" : "")
        }
      >
        <div
          data-side={rollresult}
          className={"playerdice w-20 h-20 " + (rolltoggle ? "reRoll" : "")}
        >
          {faces.map((e, i) => (
            <div className={`sides side-${i} ${faceColour}`} key={`faces-${i}`}>
              {dicesides[e - 1].pips.map((e, i) => (
                <span
                  className={`dot ${e} ${pipColour}`}
                  key={`pip-${i}`}
                ></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

export default Dice
