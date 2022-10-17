import { configureStore } from "@reduxjs/toolkit";
import firebaseReducer from '../redux/features/firebase/firebaseSlice'
import loadingReducer from '../redux/features/loadingSlice'

export default configureStore({
    reducer: {
        firebaseStore: firebaseReducer,
        loading: loadingReducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }))
})