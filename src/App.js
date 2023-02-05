import { Provider } from 'react-redux'
import store from './redux/store'
import Routes from './Routes'
import './styles/App.css'

store.subscribe(() => {
    localStorage.setItem('projectawy', JSON.stringify(store.getState()))
})

function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

export default App
