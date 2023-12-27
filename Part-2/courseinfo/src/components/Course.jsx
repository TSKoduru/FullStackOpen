const Header = ({text}) => <h1>{text}</h1>
const Part = ({parts}) => <p>{parts.name} {parts.exercises}</p>
const Content = ({parts}) => <div>{parts.map(part => { return <Part key={part.id} parts={part}/>})}</div>
const Total = ({parts}) => {
    const exercises = parts.map(part => {return part.exercises})
    return <p>Total is: {exercises.reduce((count, ind) => count + ind)}</p>
}

const Course = ({course}) => {
    return (
        <div>
            <Header text = {course.name}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>
        </div>
    )
}

export default Course