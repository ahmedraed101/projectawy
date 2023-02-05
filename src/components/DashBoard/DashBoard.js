import { useSelector } from 'react-redux'
import ProjectDiv from './../ProjectDiv/ProjectDiv'
import './styles.css'

const DashBoard = () => {
    const projects = useSelector((state) => state.projects)
    return (
        <>
            <h1>Dashboard</h1>
            <div className='message'>🐱‍👤 Peace, Let's do some work.</div>
            <div className='container'>
                {projects.map((project) => (
                    <ProjectDiv project={project} key={project.id} />
                ))}
            </div>
        </>
    )
}

export default DashBoard

// the data i Need here is just the title, description, createdAt and lastEdit, notes.length, problems.length.
