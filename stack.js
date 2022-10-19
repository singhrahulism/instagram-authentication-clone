import { StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/AppStack/HomeScreen";
import WelcomeScreen from './src/screens/AuthStack/WelcomeScreen'
import LoginEmailScreen from "./src/screens/AuthStack/LoginEmailScreen";
import LoginPhoneScreen from "./src/screens/AuthStack/LoginPhoneScreen";
import SignupScreenPhone from './src/screens/AuthStack/SignupScreenPhone'
import SignupScreenEmail from "./src/screens/AuthStack/SignupScreenEmail";
import EmailConfirmationScreen from "./src/screens/AuthStack/EmailConfirmationScreen";
import OTPVerificationScreen from "./src/screens/AuthStack/OTPVerificationScreen";

const Stack = createNativeStackNavigator()

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, animation: 'none'}} />
        </Stack.Navigator>
    )
}

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="LoginEmail" component={LoginEmailScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="LoginPhone" component={LoginPhoneScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="SignupPhone" component={SignupScreenPhone} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="SignupEmail" component={SignupScreenEmail} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="EmailConfirmation" component={EmailConfirmationScreen} options={{headerShown: false, animation: 'none'}} />
        </Stack.Navigator>
    )
}
