import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button style={{ margin: '8px' }} onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Statistics = ({ text, values }) => {
  const average = values[4] / values[3]
  const positive = values[5] / values[3] * 100
  return (
    <div>
      <Header text={text} />
      {values[3] === 0 ? <p>No feedback given</p> :
        <table>
          <StatisticLine text="good" value={values[0]} />
          <StatisticLine text="neutral" value={values[1]} />
          <StatisticLine text="bad" value={values[2]} />
          <StatisticLine text="all" value={values[3]} />
          <StatisticLine text="average" value={isNaN(average) ? 0 : average} />
          <StatisticLine text="positive" value={(isNaN(positive) ? 0 : positive) + ' %'} />
        </table>
      }
    </div>
  )
}


const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllClicks(allClicks + 1)
    setAverage(average + 1)
    setPositive(positive + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllClicks(allClicks + 1)
    setAverage(average + 0)
    setPositive(positive + 0)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAllClicks(allClicks + 1)
    setAverage(average - 1)
    setPositive(positive + 0)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics text="statistics" values={[good, neutral, bad, allClicks, average, positive]} />
    </div>
  )
}

export default App