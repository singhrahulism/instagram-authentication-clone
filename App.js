import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"

import { AppStack, AuthStack } from "./stack"
import { Provider } from "react-redux"
import store from "./src/redux/store"

const isSignedIn = false

const App = () => {

  const isSignedIn = useSelector(state => state.firebaseStore.user.uid)

  return (
  <NavigationContainer>
    { isSignedIn ? <AppStack /> : <AuthStack /> }
  </NavigationContainer>
  )
}

export default () => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}