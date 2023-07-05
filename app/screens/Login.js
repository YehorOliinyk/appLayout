import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Keyboard, 
    TouchableWithoutFeedback,   
    Button
} from 'react-native';
// import CustomButton from '../../src/components/CutomButton/CustomButton';
// import PhoneAuthorization from './PhoneAuthorization';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

const Login = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [inputType, setIputType] = useState(true)
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const handleNumberChange = (text) => {
        setPhoneNumber(text)
    };

    const handleScreenPress = () => {
        Keyboard.dismiss();
    };

    const handleCodeChange = (text) => {
        setCode(text)
    }

    function onAuthStateChanged(user) {
        if (user) {
            setIputType(false)
        }
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
          await confirm.confirm(code);
        } catch (error) {
          console.log('Invalid code.');
        }
    }

    
  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
    


}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    entryDescription: {
      marginTop: 125,
      marginLeft: 20,
      marginBottom: 115,
      width: 270,
      gap: 10
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold'
    },
    subtitle: {
      fontSize: 14,
    },
    contact: {
      marginLeft: 80,
      flexDirection: 'row',
      gap: 12
    },
    number: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    input: {
      fontSize: 22,
      fontWeight: 'bold',
      width: 145,
      paddingBottom: 50
    },
    button: {
      backgroundColor: '#E5E5EA',
      borderRadius: 12,
      width: 343
    }
  });

      // return (
    //     <TouchableWithoutFeedback onPress={handleScreenPress}>
    //         <View style={styles.container}>
    //             <View style={styles.entryDescription}>
    //                 <Text style={styles.title}>Войдите</Text>
    //                 <Text style={styles.subtitle}>Войдите, чтобы пользоваться нашими акциями и наслаждаться свежим кофе</Text>
    //             </View>
    //             {
    //                 inputType ? (
    //                     <View style={styles.contact}>
    //                     <Text style={styles.number}>+380</Text>
    //                     <TextInput
    //                         style={styles.input}
    //                         keyboardType="numeric"
    //                         placeholder='00 00 00 000'
    //                         value={phoneNumber}
    //                         onChangeText={handleNumberChange}
    //                         maxLength={9}
    //                     />
    //                 </View>
    //                 ) : (
    //                     <TextInput
    //                         style={styles.input}
    //                         keyboardType="numeric"
    //                         placeholder='0 0 0 0 0 0'
    //                         value={code}
    //                         onChangeText={handleCodeChange}
    //                         maxLength={6}
    //                     />
    //                 )
    //             }
    //             <Button title='Войти'/>
    //             {/* <CustomButton phoneNumber={phoneNumber}/> */}
    //         </View>
    //     </TouchableWithoutFeedback>
    // )