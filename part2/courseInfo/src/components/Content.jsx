const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )
            }
            <Total parts={parts} />
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Total = ({parts}) => {
    return (
      <p>Number of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    )
  }

export default Content