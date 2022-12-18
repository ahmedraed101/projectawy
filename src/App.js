import { Provider } from 'react-redux'
import store from './redux/store'
import Routes from './Routes'
import './styles/App.css'

function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

export default App
