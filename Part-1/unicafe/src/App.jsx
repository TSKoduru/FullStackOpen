import { useState } from 'react'

const Header = ({name}) => <h1>{name}</h1>
const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>
const StatisticsLine = ({name, value}) => <tr><td>{name} is {value}</td></tr>
const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if(total != 0){
    return (
      <table>
        <tbody>
          <StatisticsLine name = "Good" value = {good}/>
          <StatisticsLine name = "Neutral" value = {neutral}/>
          <StatisticsLine name = "Bad" value = {bad}/>

          <StatisticsLine name = "Total" value = {total}/>
          <StatisticsLine name = "Average" value = {(good - bad)/(total)}/>
          <StatisticsLine name = "Percent Positive" value = {good/total}/> 
        </tbody>
      </table>
    ) 
  }

  return (<p>No feedback given.</p>)
}
const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header name = "Give Us Feedback!"/>
      <Button name = "Good :)" handleClick={() => setGood(good + 1)}/>
      <Button name = "Neural :|" handleClick={() => setNeutral(neutral + 1)}/>
      <Button name = "Bad :(" handleClick={() => setBad(bad + 1)}/>
      <Header name = "Some Statistics:"/>
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </>
  )
}

export default App