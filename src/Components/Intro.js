import React, { useState } from "react"
import {
  QuestionMarkCircleIcon,
  ChevronDoubleUpIcon,
  CurrencyDollarIcon,
  ArrowDownIcon,
  CubeIcon,
  LightningBoltIcon,
  CogIcon,
  XCircleIcon,
} from "@heroicons/react/solid"
import useSound from "use-sound"
import opencloseSfx from "../sounds/openclose.mp3"
import cannonSfx from "../sounds/cannon.mp3"
import Objective from "./Intro/Objective"
import Market from "./Intro/Market"
import Boosts from "./Intro/Boosts"
import Shots from "./Intro/Shots"
import RulesTips from "./Intro/RulesTips"

const Intro = ({ name, onIntroScreen }) => {
  const [click] = useSound(opencloseSfx)
  const [cannon] = useSound(cannonSfx)
  const [introDice, introDiceState] = useState(1)
  const [tutPg, tutPgState] = useState(1)
  const [hightlightArea, highlightAreaState] = useState()
  const [loot, lootState] = useState(500)
  const [shot, shotState] = useState(false)
  const introRoll = () => {
    introDiceState(introDice + 1 === 7 ? 1 : introDice + 1)
  }
  const handlePages = pg => {
    click()
    tutPgState(pg)
    highlightAreaState()
  }
  const handleFooter = hightlightArea => {
    highlightAreaState(hightlightArea)
  }

  const handleLoot = () => {
    lootState(0)
  }

  const handleShot = () => {
    cannon()
    shotState(true)
    highlightAreaState()
  }

  return (
    <div>
      {tutPg > 1 && (
        <XCircleIcon
          className="text-green-400 h-9 fixed right-2 top-1"
          onClick={() => onIntroScreen()}
        />
      )}
      {tutPg === 1 && (
        <Objective
          name={name}
          onHandlePages={handlePages}
          onHandleFooter={handleFooter}
        />
      )}
      {tutPg === 2 && (
        <Market
          onHandleFooter={handleFooter}
          hightlightArea={hightlightArea}
          onHandleLoot={handleLoot}
        />
      )}
      {tutPg === 3 && (
        <Boosts
          onHandlePages={handlePages}
          onHandleFooter={handleFooter}
          hightlightArea={hightlightArea}
          name={name}
        />
      )}
      {tutPg === 4 && (
        <Shots
          onHandlePages={handlePages}
          onHandleFooter={handleFooter}
          shot={shot}
          onIntroScreen={onIntroScreen}
        />
      )}
      {tutPg === 5 && <RulesTips onIntroScreen={onIntroScreen} />}

      <div className="grid grid-cols-2 content-center my-3 flex items-center hidden">
        <div className="text-center">
          <p>Side {introDice}</p>
          <div
            data-side={introDice}
            className="playerdice w-20 h-20"
            onClick={() => {
              introRoll()
            }}
          >
            <div className="sides side-0 bg-yellow-800">
              <span className="dot dot-10 bg-white"></span>
            </div>
            <div className="sides side-1 bg-yellow-800">
              <span className="dot dot-10 bg-white"></span>
            </div>
            <div className="sides side-2 bg-yellow-800">
              <span className="dot dot-10 bg-white"></span>
            </div>
            <div className="sides side-3 bg-yellow-800">
              <span className="dot dot-10 bg-white"></span>
            </div>
            <div className="sides side-4 bg-yellow-800">
              <span className="dot dot-20 bg-white"></span>
              <span className="dot dot-21 bg-white"></span>
            </div>
            <div className="sides side-5 bg-yellow-800">
              <span className="dot dot-10 bg-white"></span>
            </div>
          </div>
          <ChevronDoubleUpIcon className="h-8 animate-bounce mx-auto" />
        </div>
        <p>
          Tap the dice to view its faces... it may look a bit weak, but if
          you're lucky you'll have plenty of opportunity to upgrade it.
        </p>
      </div>
      <p className="hidden">
        Within the game, click on the{" "}
        <QuestionMarkCircleIcon className="w-5 h-5 -mt-1 text-green-400 cursor-pointer inline" />{" "}
        Question Mark to learn more about the icons and how they can help you
        boost your dice. Good Luck!
      </p>
      <p className="text-center mt-3 hidden">
        <button
          className="mainButton"
          onClick={() => {
            onIntroScreen()
          }}
        >
          Fire in the Hole!
        </button>
      </p>
      <div className="fixed bottom-0 left-0 w-full bg-black h-12 bg-opacity-20">
        <div className="absolute bottom-2 left-3 text-2xl font-bold">
          <span
            className={`relative mr-5 cursor-pointer hover:opacity-50 cursor-pointer ${
              hightlightArea === "boost" ? "visible" : "invisible"
            }`}
            onClick={() => handlePages(3)}
          >
            <ArrowDownIcon className="absolute bottom-8 left-3 text-2xl font-bold w-14 animate-bounce" />
            <CubeIcon className="w-8 h-8 inline text-yellow-400" />1
          </span>
          <span
            className={`relative mr-5 cursor-pointer hover:opacity-50 cursor-pointer ${
              hightlightArea === "shot" ? "visible" : "invisible"
            }`}
            onClick={() => handleShot()}
          >
            <ArrowDownIcon className="absolute bottom-8 left-3 text-2xl font-bold w-14 animate-bounce" />
            <CogIcon className="w-8 h-8 inline text-yellow-400" />1{" "}
          </span>
          <span
            className={`relative ${
              hightlightArea === "streak" ? "visible" : "invisible"
            }`}
          >
            <ArrowDownIcon className="absolute bottom-8 left-3 text-2xl font-bold w-14 animate-bounce" />
            <LightningBoltIcon className="w-8 h-8 inline text-yellow-400" />1{" "}
          </span>
        </div>
        {(hightlightArea === "market" || hightlightArea === "market-open") && (
          <div
            className="cursor-pointer hover:opacity-50"
            onClick={() => handlePages(2)}
          >
            {hightlightArea === "market" && (
              <div className="absolute bottom-10 right-3 text-2xl font-bold">
                <ArrowDownIcon className="w-14 animate-bounce" />
              </div>
            )}
            <div className="absolute bottom-2 right-3 text-2xl font-bold">
              <CurrencyDollarIcon className="w-8 h-8 text-yellow-300 inline -mt-1" />
              {loot}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Intro
