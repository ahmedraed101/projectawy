import { NavLink } from 'react-router-dom'
import './styles.css'

const NavBar = () => {
    return (
        <div>
            <div className='title'>
                <h1>Project Ninja</h1>
            </div>
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? 'selected' : undefined
                }
            >
                Home
            </NavLink>
            <NavLink
                to='create'
                className={({ isActive }) =>
                    isActive ? 'selected create' : 'create'
                }
            >
                +
            </NavLink>
        </div>
    )
}
export default NavBar
