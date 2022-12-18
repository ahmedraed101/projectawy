import { configureStore } from '@reduxjs/toolkit'
import ProjectsSlice from './reducers/ProjectReducer'

// export default configureStore({
//     reducer: {
//         projects: ProjectReducer,
//     },
// })

export default configureStore({
    reducer: {
        projects: ProjectsSlice.reducer,
    },
})
