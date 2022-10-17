import { StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/AppStack/HomeScreen";
import WelcomeScreen from './src/screens/AuthStack/WelcomeScreen'
import LoginScreen from './src/screens/AuthStack/LoginScreen'
import SignupScreenPhone from './src/screens/AuthStack/SignupScreenPhone'
import SignupScreenEmail from "./src/screens/AuthStack/SignupScreenEmail";
import EmailConfirmationScreen from "./src/screens/AuthStack/EmailConfirmationScreen";

import TestScreen from "./src/screens/AuthStack/TestScreen";

const Stack = createNativeStackNavigator()

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="Test" component={TestScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="SignupPhone" component={SignupScreenPhone} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="SignupEmail" component={SignupScreenEmail} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="EmailConfirmation" component={EmailConfirmationScreen} options={{headerShown: false, animation: 'none'}} />
        </Stack.Navigator>
    )
}
