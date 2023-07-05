import React, { useState, useEffect } from 'react'
import { 
    View,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    Alert
} from 'react-native';
// import '../../../Firebase/firebase'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import auth from '@react-native-firebase/auth'


const CustomButton = ({phoneNumber, navigation}) => {
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    


    // const sentOtp = async() => {
    //     try {
    //         const mobile = '+380' + phoneNumber
    //         const response = await auth().
    //         setConfirm(response)
    //         console.log(response)
    //         alert("Otp is sent")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const state = phoneNumber.length !== 9 // полностью ли введен номер 


    return (
        <View style={styles.container}>
            <TouchableOpacity style={state ? styles.button : styles.buttonActive} disabled={state}>
                <Text style={state ? styles.buttonText : styles.buttonTextActive}>Войти</Text>
            </TouchableOpacity>
        </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 45,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#E5E5EA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: 343,
        height: 45
    },
    buttonActive: {
        alignItems: 'center',
        backgroundColor: '#1B1B1B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: 343,
        height: 45
    },
    buttonText: {
        color: '#848484',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonTextActive: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default CustomButton
