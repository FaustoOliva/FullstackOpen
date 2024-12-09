import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    return (
      <>
        <h2> {course.name} </h2>
        <Content parts={course.parts}/>
      </>
    )
  }

export default Course