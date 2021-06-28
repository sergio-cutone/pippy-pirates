import React, { useEffect, useState } from "react"

const firebaseDoc = require("../services/fb-collection")

const HighScores = ({ db }) => {
  const [highScores, highScoresState] = useState([])
  useEffect(() => {
    const highScoresArray = []
    db.collection(firebaseDoc)
      .limit(100)
      .orderBy("score", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          highScoresArray.push({
            name: doc.data().username,
            score: doc.data().score,
            level: doc.data().level,
          })
        })
        highScoresArray.sort((a, b) => b.score - a.score || a.level - b.level)
        highScoresState(highScoresArray)
      })
  }, [db])
  return (
    <div>
      <p className="text-2xl text-center">Top 100 Scallywags</p>
      <div className="table w-full">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell"></div>
            <div className="table-cell"></div>
            <div className="table-cell p-2 text-right">Lvl</div>
          </div>
          {highScores.map((e, i) => (
            <div
              className="table-row border-b border-gray-500"
              key={`highscore-${i}`}
            >
              <div
                className={`table-cell p-1 text-left ${
                  i === 0 &&
                  " bg-gradient-to-b from-yellow-300 to-yellow-500 text-black "
                }${
                  i === 1 &&
                  " bg-gradient-to-b from-gray-300 to-gray-400 text-black "
                }${
                  i === 2 && " bg-gradient-to-b from-yellow-600 to-yellow-800 "
                }`}
              >
                {i + 1}. {e.name}
              </div>
              <div className="table-cell p-1 text-right">{e.score}</div>
              <div className="table-cell p-1 text-right text-yellow-400">
                {e.level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HighScores
