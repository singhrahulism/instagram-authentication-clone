import { initializeApp } from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native';
import firebaseConfig from './firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';


const app = initializeApp(firebaseConfig)
const auth = firebaseAuth.initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export default firebaseAuth