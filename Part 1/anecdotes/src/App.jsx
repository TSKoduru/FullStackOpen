import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const randomInt = (maxLimit) => Math.floor(Math.random() * maxLimit)
const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const onVote = () =>{
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const MostPopularAnecdote = () => {
    let max = 0
    let maxInd = 0

    votes.forEach(function (value, i) {
      if(value > max){
        max = value
        maxInd = i
      }
  })

    return anecdotes[maxInd]
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <Header text = "Anecdote of the day: "/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p>
      <Button text = "Vote for this anecdote!" handleClick={() => onVote()}/>
      <Button text = "Next anecdote" handleClick={() => setSelected(() => randomInt(anecdotes.length))}/>

      <Header text = "Anecdote with most votes: "/>
      <MostPopularAnecdote/>
    </div>
  )
}

export default App