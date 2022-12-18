import { Link } from 'react-router-dom'
import './styles.css'

const ProjectDiv = ({ project }) => {
    const { id, title, description, createdAt, lastEdit, status } = project
    return (
        <Link to={`project/${id}`} className='Link'>
            <div className={`project ${status}`} id='project'>
                <div className={`title ${status}`}>{title}</div>
                <div className='description'>
                    {description.slice(0, 80) + '...'}
                </div>
                <div className='date'>
                    <div className='createdAt'>
                        created at :{' '}
                        <span>{new Date(createdAt).toDateString()}</span>
                    </div>
                    {'-'}
                    <div className='lastEdit'>
                        last edit:{' '}
                        <span>{new Date(lastEdit).toDateString()}</span>
                    </div>
                </div>
                <div className={`status ${status}`}>{status}</div>
            </div>
        </Link>
    )
}
export default ProjectDiv
