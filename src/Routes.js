import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import DashBoard from './components/DashBoard/DashBoard'
import CreateProject from './components/CreateProject/CreateProject'
import ProjectPage from './components/ProjectPage/ProjectPage'

const routes = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<DashBoard />}></Route>
                <Route path='create' element={<CreateProject />}></Route>
                <Route path='/project/:id' element={<ProjectPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default routes
