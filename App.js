import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import firebase from 'firebase';

const Stack = createNativeStackNavigator();



export default function App() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                {/* <Stack.Screen name='StartShop' component={StartShop} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name='StartShop' component={Cities} options={{headerShown: false}}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});