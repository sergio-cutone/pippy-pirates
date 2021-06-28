import React, {
  useState,
  useRef,
  useReducer,
  useCallback,
  useEffect,
} from "react"
import enemies from "../Helpers/enemies"
import dicesides from "../Helpers/dicesides"
import Players from "./Players"
import Boost from "./Boost"
import GameOver from "./GameOver"
import Instructions from "./Instructions"
import Header from "./Header"
import Footer from "./Footer"
import Overlay from "./Overlay"
import SpendLoot from "./SpendLoot"
import Intro from "./Intro"
import HighScores from "./HighScores"
import RulesTips from "./Intro/RulesTips"

/* SOUNDS */
import useSound from "use-sound"
import rollSfx from "../sounds/roll.mp3"
import cannonSfx from "../sounds/cannon.mp3"
import boostSfx from "../sounds/boost.mp3"
import lossSfx from "../sounds/loss.mp3"
import winSfx from "../sounds/win.mp3"
import congratsSfx from "../sounds/congratulations.mp3"
import faceSfx from "../sounds/face.mp3"
import opencloseSfx from "../sounds/openclose.mp3"
import fireSfx from "../sounds/fire.mp3"
import restartSfx from "../sounds/restart.mp3"
import coinsSfx from "../sounds/coins.mp3"

const HEALTH_DECREASE = "HEALTH_DECREASE"
const LEVEL_UP = "LEVEL_UP"
const ROLL_DICE = "ROLL_DICE"
const BOOST_INCREASE = "BOOST_INCREASE"
const BOOST_RESET = "BOOST_RESET"
const BOOST_BONUS = "BOOST_BONUS"
const GAME_RESET = "GAME_RESET"
const SPEND_LOOT = "SPEND_LOOT"
const SINGLE_SHOT = "SINGLE_SHOT"

const reducer = (state, action) => {
  switch (action.type) {
    case LEVEL_UP:
      return action.payload
    case GAME_RESET:
      return action.payload
    case HEALTH_DECREASE:
      const modifier = 1
      return state.map(player => {
        if (
          player.type !== action.payload.playername.winner &&
          action.payload.playername.winner !== "tie"
        )
          return {
            ...player,
            health: player.health - modifier > 0 ? player.health - modifier : 0,
          }
        return player
      })
    case ROLL_DICE:
      return state.map((player, i) => {
        return {
          ...player,
          rollresult: action.payload.rolls[i][0],
          rolltoggle: !player.rolltoggle,
        }
      })
    case BOOST_INCREASE:
      return state.map(player => {
        if (player.type === "human") {
          if (player.boost > 0) {
            const modifier = player.faces
              .map((e, i) =>
                i === action.payload.id && e + 1 < dicesides.length + 1 ? 1 : 0
              )
              .reduce((p, c) => p + c)
            return {
              ...player,
              boostslots: player.boostslots.map((e, i) =>
                i === action.payload.id ? e + modifier : e
              ),
              boost: player.boost - modifier,
              faces: player.faces.map((e, i) =>
                i === action.payload.id ? e + modifier : e
              ),
            }
          }
        }
        return player
      })
    case BOOST_RESET:
      return state.map(player => {
        if (player.type === "human") {
          return {
            ...player,
            boost: player.boostslots.reduce((p, c) => p + c) + player.boost,
            faces: player.faces.map((e, i) => e - player.boostslots[i]),
            boostslots: [0, 0, 0, 0, 0, 0],
          }
        }
        return player
      })
    case BOOST_BONUS:
      return state.map(player => {
        if (player.type === "human") {
          return {
            ...player,
            boost: player.boost + 1,
          }
        }
        return player
      })
    case SPEND_LOOT:
      return state.map(player => {
        if (player.type === "human") {
          return {
            ...player,
            boost: player.boost + action.boost,
            shots: player.shots + action.shots,
          }
        }
        return player
      })
    case SINGLE_SHOT:
      return state.map(player => {
        if (player.type === "human") {
          return {
            ...player,
            shots: player.shots - 1,
          }
        }
        return player
      })
    default:
      return state
  }
}

const setPlayers = (
  { humanname },
  level,
  faces = [1, 1, 1, 1, 2, 1],
  rollresult = 3,
  rolltoggle = true,
  boost = 0,
  shots = 0
) => {
  const players = []
  function playerObj(
    name,
    faces,
    type,
    faceColour,
    pipColour,
    boost,
    ship,
    level,
    shots
  ) {
    this.name = name
    this.health = 5
    this.faces = faces
    this.boostslots = [0, 0, 0, 0, 0, 0]
    this.boost = (level % 2) + 1 + boost
    this.type = type
    this.rollresult = rollresult
    this.rolltoggle = rolltoggle
    this.faceColour = faceColour
    this.pipColour = pipColour
    this.ship = ship
    this.shots = level === 1 ? 1 : shots
  }
  players.push(
    new playerObj(
      enemies[level - 1].name,
      enemies[level - 1].sides,
      "cpu",
      enemies[level - 1].mainbg,
      enemies[level - 1].pipbg,
      0,
      enemies[level - 1].ship,
      level,
      0
    ),
    new playerObj(
      humanname,
      faces,
      "human",
      "bg-yellow-800",
      "bg-white",
      boost,
      "ship.png",
      level,
      shots
    )
  )
  return players
}

const Game = ({ humanname, volume, volumeState, db }) => {
  const setLevel = useRef(1)
  const [data, dispatch] = useReducer(
    reducer,
    setPlayers({ humanname }, setLevel.current)
  )
  const [playButton, playButtonState] = useState(false)
  const [boostScreen, boostScreenState] = useState(false)
  const [spendLoot, spendLootState] = useState(false)
  const [instructions, instructionsState] = useState(false)
  const [intro, introState] = useState(true)
  const [highScores, highScoresState] = useState(false)
  const [rulesTips, rulesTipsState] = useState(false)
  const [boostTip, boostTipState] = useState(false)
  const throwFromLeftToggle = useRef(false)
  const boostIncreaseToggle = useRef(false)
  const isRoll = useRef(false)
  const streak = useRef(0)
  const setCannon = useRef(false)
  const score = useRef(0)
  const points = useRef(0)
  const [play] = useSound(rollSfx, { volume: volume })
  const [playCannon] = useSound(cannonSfx, { volume: volume })
  const [playBoost] = useSound(boostSfx, { volume: volume })
  const [win] = useSound(winSfx, { volume: volume })
  const [loss] = useSound(lossSfx, { volume: volume })
  const [openclose] = useSound(opencloseSfx, { volume: volume })
  const [face] = useSound(faceSfx, { volume: volume })
  const [congrats] = useSound(congratsSfx, { volume: volume })
  const [fire] = useSound(fireSfx, { volume: volume })
  const [restart] = useSound(restartSfx, { volume: volume })
  const [coins] = useSound(coinsSfx, { volume: volume })
  const gameOver = useRef(false)

  const matchLoser = useCallback(() => {
    const getMatchWinner = data.filter(e => e.health === 0)
    if (getMatchWinner[0]) {
      return getMatchWinner[0].type === "human" ? "human" : "cpu"
    }
    return false
  }, [data])

  useEffect(() => {
    setTimeout(() => {
      if (matchLoser()) {
        matchLoser() === "human"
          ? loss()
          : matchLoser() === "cpu" && setLevel.current === enemies.length
          ? congrats()
          : win()
        instructionsState(false)
        introState(false)
        boostScreenState(false)
        gameOver.current = true
      }
    }, 1000)
  }, [volumeState, volume, congrats, matchLoser, loss, win, data])

  const handleInstructionScreen = () => {
    openclose()
    instructionsState(!instructions)
  }

  const handleSpendLoot = () => {
    openclose()
    spendLootState(!spendLoot)
  }

  const handleBoostScreen = () => {
    openclose()
    boostScreenState(!boostScreen)
  }

  const handleIntroScreen = () => {
    setTimeout(() => {
      playButtonState(true)
      boostTipState(false)
    }, 2000)
    boostTipState(true)
    openclose()
    restart()
    introState(false)
  }

  const handleVolumeToggle = v => {
    volumeState(v)
  }

  const handleHighScores = () => {
    openclose()
    highScoresState(!highScores)
  }

  const handleRulesTips = () => {
    openclose()
    rulesTipsState(!rulesTips)
  }

  const handleBoostTip = () => {
    openclose()
    boostTipState(false)
  }

  const handleLevelUp = useCallback(() => {
    restart()
    setLevel.current = setLevel.current + 1
    score.current = score.current + Math.floor(score.current / 1000) * 150
    points.current = points.current + setLevel.current * 1000
    gameOver.current = false
    setTimeout(() => {
      playButtonState(true)
    }, 1500)
    dispatch({
      type: LEVEL_UP,
      payload: setPlayers(
        { humanname },
        setLevel.current,
        data[1].faces,
        data[1].rollresult,
        data[1].rolltoggle,
        data[1].boost,
        data[1].shots
      ),
    })
  }, [restart, data, humanname, dispatch])

  const handleGameReset = useCallback(() => {
    restart()
    boostIncreaseToggle.current = false
    setLevel.current = 1
    gameOver.current = false
    setTimeout(() => {
      playButtonState(true)
    }, 1500)
    score.current = points.current = streak.current = 0
    dispatch({
      type: GAME_RESET,
      payload: setPlayers({ humanname }, setLevel.current),
    })
  }, [restart, humanname, dispatch])

  const handleCart = useCallback(
    cart => {
      coins({ volume: volume })
      spendLootState(!spendLoot)
      score.current = cart.score
      dispatch({
        type: SPEND_LOOT,
        boost: cart.boost,
        shots: cart.shots,
      })
    },
    [volume, coins, spendLoot, dispatch]
  )

  const setBoost = useCallback(
    id => {
      boostIncreaseToggle.current = true
      face({ volume: volume })
      dispatch({
        type: BOOST_INCREASE,
        payload: { id },
      })
    },
    [volume, face, dispatch]
  )

  const resetBoost = useCallback(() => {
    boostIncreaseToggle.current = false
    dispatch({
      type: BOOST_RESET,
    })
  }, [dispatch])

  const bonusBoost = useCallback(() => {
    dispatch({
      type: BOOST_BONUS,
    })
  }, [dispatch])

  const setHealth = useCallback(
    playername => {
      dispatch({
        type: HEALTH_DECREASE,
        payload: { playername },
      })
    },
    [dispatch]
  )

  const rollDice = useCallback(
    getWinner => {
      setCannon.current = getWinner.winner

      if (getWinner.winner !== "tie") {
        if (getWinner.winner === "human") {
          coins({ volume: volume })
          score.current = parseInt(
            score.current + getWinner.pipDifference * 100
          )
          points.current = parseInt(
            points.current + getWinner.pipDifference * 1000
          )
          streak.current += 1
          if (streak.current === 3) {
            score.current = parseInt(score.current + 250)
            points.current = parseInt(points.current + 1255)
            playBoost()
            streak.current = 0
            bonusBoost()
          }
        } else if (getWinner.winner === "cpu") {
          streak.current = 0
        }
        playCannon({ volume: volume })
        setHealth(getWinner)

        setTimeout(() => {
          setCannon.current = false
          throwFromLeftToggle.current = false
          playButtonState(!gameOver.current ? true : false)
          isRoll.current = false
        }, 2000)
      } else {
        coins()
        score.current = parseInt(score.current + 25)
        points.current = parseInt(points.current + 251)
        throwFromLeftToggle.current = false
        setHealth(getWinner)
        isRoll.current = false
        playButtonState(true)
      }
    },
    [volume, bonusBoost, coins, playBoost, playCannon, setHealth]
  )

  const handleSingleShot = useCallback(() => {
    const human = data.filter(e => e.type === "human")
    // TODO: ADD LOOT AND SCORE INCREASE
    if (human[0].shots > 0) {
      playButtonState(false)
      rollDice({
        rolls: 0,
        pipDifference: 2,
        winner: "human",
      })
      dispatch({
        type: SINGLE_SHOT,
      })
    }
  }, [data, dispatch, rollDice])

  const handleRollDice = useCallback(() => {
    isRoll.current = true
    fire()
    setTimeout(() => {
      play({ forceSoundEnabled: false })
    }, 500)

    const setRolls = rolls => {
      return data.map((e, i) => [rolls[i], e.faces[rolls[i]]])
    }
    const setWinner = () => {
      const getRolls = setRolls(data.map(e => Math.floor(Math.random() * 6)))
      const pipDifference = Math.abs(getRolls[0][1] - getRolls[1][1])
      return {
        rolls: getRolls,
        pipDifference: pipDifference,
        winner:
          getRolls[0][1] > getRolls[1][1]
            ? "cpu"
            : getRolls[1][1] > getRolls[0][1]
            ? "human"
            : "tie",
      }
    }
    const getWinner = setWinner()
    throwFromLeftToggle.current = true
    playButtonState(false)
    dispatch({
      type: ROLL_DICE,
      payload: getWinner,
    })

    setTimeout(() => {
      rollDice(getWinner)
    }, 1500)
  }, [data, fire, play, rollDice, dispatch])

  return (
    <div className="select-none">
      <Header
        setLevel={setLevel}
        onInstructionScreen={handleInstructionScreen}
        roll={isRoll.current}
        volume={volume}
        onVolumeToggle={handleVolumeToggle}
        points={points.current}
      />
      <Players
        data={data}
        onRollDice={handleRollDice}
        playButton={playButton}
        throwFromLeftToggle={throwFromLeftToggle.current}
        winner={setCannon.current}
        level={setLevel.current}
      />
      {!intro || (
        <Overlay scale={false}>
          <Intro name={humanname} onIntroScreen={handleIntroScreen} />
        </Overlay>
      )}
      {!boostScreen || (
        <Overlay io={true} onOverlay={handleBoostScreen}>
          <Boost
            data={data}
            setBoost={setBoost}
            resetBoost={resetBoost}
            boostScreenState={handleBoostScreen}
            boostIncreaseToggle={boostIncreaseToggle}
            dicesides={dicesides}
            colour={enemies[setLevel.current - 1].mainbg}
            enemy={enemies[setLevel.current - 1].name}
          />
        </Overlay>
      )}
      {!gameOver.current || (
        <Overlay io={false}>
          <GameOver
            onGameReset={handleGameReset}
            onLevelUp={handleLevelUp}
            getGameEnd={matchLoser()}
            level={setLevel.current}
            congrats={congrats}
            maxlevel={enemies.length}
            score={points.current}
            username={humanname}
            db={db}
            onScoresState={highScoresState}
          />
        </Overlay>
      )}
      {!instructions || (
        <Overlay io={true} onOverlay={handleInstructionScreen} scale={false}>
          <Instructions
            onScoresState={highScoresState}
            onRulesTips={handleRulesTips}
            onBoostScreen={handleBoostScreen}
            onSpendLootScreen={handleSpendLoot}
            onOverlay={handleInstructionScreen}
          />
        </Overlay>
      )}
      {!spendLoot || (
        <Overlay io={true} onOverlay={handleSpendLoot}>
          <SpendLoot
            loot={score.current}
            onHandleCart={handleCart}
            volume={volume}
          />
        </Overlay>
      )}
      {!highScores || (
        <Overlay io={true} onOverlay={handleHighScores}>
          <HighScores db={db} />
        </Overlay>
      )}
      {!rulesTips || (
        <Overlay io={true} onOverlay={handleRulesTips}>
          <RulesTips />
        </Overlay>
      )}
      <Footer
        data={data}
        score={score.current}
        streak={streak.current}
        onBoostScreen={handleBoostScreen}
        onSpendLootScreen={handleSpendLoot}
        onSingleShot={handleSingleShot}
        boostTip={boostTip}
        onBoostTip={handleBoostTip}
        roll={isRoll.current}
      />
    </div>
  )
}
export default Game
