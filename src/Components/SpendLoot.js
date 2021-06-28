import React, { useState, useCallback, useReducer, useRef } from "react"
import {
  CubeIcon,
  CurrencyDollarIcon,
  CogIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid"
import useSound from "use-sound"
import opencloseSfx from "../sounds/openclose.mp3"

const Cart = ({ cart }) => {
  return (
    <div className="text-center">
      {cart.map((e, i) => (
        <div className="rounded border border-white p-2 my-3" key={`cart-${i}`}>
          <p>
            <ShoppingCartIcon className="text-yellow-400 inline w-5 -mt-1" />{" "}
            Cart
          </p>
          <p>
            <span className="text-yellow-400">{e.boost}</span> Boost{" "}
            <span className="ml-3 text-yellow-400">{e.shots}</span> Shot
          </p>
        </div>
      ))}
    </div>
  )
}

const BOOST = "BOOST"
const SHOT = "SHOT"
const CLEAR = "CLEAR"

const cartReducer = (state, action) => {
  switch (action.type) {
    case BOOST:
      return state.map(cart => {
        return {
          ...cart,
          boost: cart.boost + 1,
          score: action.score,
        }
      })
    case SHOT:
      return state.map(cart => {
        return {
          ...cart,
          shots: cart.shots + 1,
          score: action.score,
        }
      })
    case CLEAR:
      return state.map(cart => {
        return {
          boost: 0,
          shots: 0,
          score: action.score,
        }
      })
    default:
      break
  }
}

const SpendLoot = ({ loot, onHandleCart, volume }) => {
  const [openclose] = useSound(opencloseSfx, { volume: volume })
  const booty = useRef(loot)
  const [message, messageState] = useState()
  const [confirm, confirmState] = useState(false)
  const [cart, dispatch] = useReducer(cartReducer, [
    {
      boost: 0,
      shots: 0,
      score: loot,
    },
  ])
  const handleSpendLoot = useCallback(
    item => {
      openclose()
      const spend = item === BOOST ? 500 : 1000
      if (booty.current < spend) {
        messageState("Y'arr, insufficient booty!")
      } else {
        confirmState(true)
        messageState("Confirm or Cancel Purchase")
        booty.current = booty.current - spend
        dispatch({
          type: item,
          score: booty.current,
        })
      }
    },
    [openclose, booty]
  )
  const clearCart = useCallback(() => {
    messageState()
    openclose()
    confirmState(false)
    booty.current = loot
    dispatch({
      type: CLEAR,
      score: booty.current,
    })
  }, [openclose, loot, dispatch])
  return (
    <div className="text-center w-full">
      <p className="mb-5 text-2xl">
        Spend Yer Booty!{" "}
        <CurrencyDollarIcon className="text-yellow-400 inline w-5 -mt-1" />
        {booty.current}
      </p>
      <div className="grid grid-cols-2 gap-3 border-b border-gray-500 py-2 my-2">
        <div>
          <CubeIcon className="text-yellow-400 inline w-6" />
          <br />
          Extra Boost
        </div>
        <button
          className="mainButton"
          onClick={() => {
            handleSpendLoot(BOOST)
          }}
        >
          <CurrencyDollarIcon className="text-gray-800 inline w-5 -mt-1" />
          500
        </button>
        <div>
          <CogIcon className="text-yellow-400 inline w-6" />
          <br />
          Single Shot
        </div>
        <button
          className="mainButton"
          onClick={() => {
            handleSpendLoot(SHOT)
          }}
        >
          <CurrencyDollarIcon className="text-gray-800 inline w-5 -mt-1" />
          1000
        </button>
      </div>

      <div>
        <Cart cart={cart} />
      </div>
      <div>
        <div className="h-20">
          <div className="mb-1">{message}</div>
          {!confirm || (
            <div>
              <button
                className={"saveButton shadow-xl mr-1 inline "}
                onClick={() => {
                  onHandleCart(Object.assign({}, ...cart))
                }}
              >
                <CheckCircleIcon className="inline h-8" />
              </button>
              <button
                className={"resetButton shadow-xl ml-1 inline "}
                onClick={() => {
                  clearCart()
                }}
              >
                <XCircleIcon className="inline w-8" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpendLoot
