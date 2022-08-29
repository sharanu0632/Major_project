import React, { useState } from 'react';
import { SafeAreaView,View,StyleSheet,Button, TextInput,TouchableOpacity,Text,StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
import EditProfileScreen1 from './screens/edit-profile-screen'
import ProfileScreen from './screens/profile'
import Quiz from './screens/quiz';
import Home from './screens/home';
import 'react-native-gesture-handler'
import MyStack from './static';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//***********************Phone sign in********************

// function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);
//   const [auth1, setauth1] = useState(false);
//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//       console.log("success");
//       setauth1(true)
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }
//   async function getImage(){
//     try {
//       const res = await ImageCropPicker.openPicker({
//         mediaType: 'photo',
//         cropping: true,
//         freeStyleCropEnabled: true,
//         cropperCircleOverlay: true,
//         hideBottomControls: true
//       })

//       setProfilePic( {
//         name: "profile_pic", 
//         type: res.mime,        
//         uri: Platform.OS === 'ios' ? res.path.replace('file://', '') : res.path
//       })
//     }catch(err){
//         console.log('Image picker error: ', err)
//     }
//   }
//   if(!auth1)
//   {
//     if (!confirm ) {
//       return (
//         <>
//         <Button
//           title="Phone Number Sign In"
//           onPress={() => signInWithPhoneNumber('+91 9380716423')}
//         />
//             {/* <TouchableOpacity style={{paddingVertical:16, paddingHorizontal:16}}
//               onPress={getImage}
//             >
//               <Text style={{textAlign:'center', color:'black'}}>{ 'Change Image'}</Text>
//             </TouchableOpacity> */}
//         </>
        
//       );
//     }
    
//     return (
//       <>
//         <TextInput value={code} onChangeText={text => setCode(text)} />
//         <Button title="Confirm Code" onPress={() => confirmCode()} />
//       </>
//     );
//   }
//   return (
//     <EditProfileScreen/>
//   );
// }

//***********************Phone sign in********************



export default function SignupScreen() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [auth1, setauth1] = useState(false);
const [profileCreated, setprofileCreated] = useState(false);
async function signInWithEmail() {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log('User account created & signed in!',auth().currentUser.uid);
      setauth1(true)
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
  
    }
    
    
function FormButton({ buttonTitle, ...rest }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

if(!auth1)
{
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor='#000'
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            keyboardType="default"
            placeholderTextColor='#000'
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
          {/* <TextInput
            style={[styles.textInput]}
            placeholder=""
            secureTextEntry={true}
            selectionColor={'#000'}
            editable={true}
            returnKeyType={'next'}
            keyboardType="default"
            autoFocus={false}
            autoCapitalize={'characters'}
            placeholderText='Password'
            onChangeText={(text) => this.setPassword(text)}
          ></TextInput> */}
          <FormButton buttonTitle='Signup' onPress={() => signInWithEmail()} />
        </View>
      );
  }
  else if(auth && !profileCreated)
  {
    return(<EditProfileScreen1 onClick={() => setprofileCreated(true)} />)
    
  }
  return (
        <MyStack/>
      );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonContainer: {
    marginTop: 10,
    width: windowWidth / 2,
    height: windowHeight / 15,
    backgroundColor: '#6646ee',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff'
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    color:'black',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  submitButton: {
    borderRadius:16,
    marginHorizontal:16,
    marginVertical: 0,
  },
  submitButtonText: {
    color: 'black',
    fontSize:16,
    fontWeight:'bold',
    paddingHorizontal:16,
    paddingVertical:16,
    textAlign: 'center',
    minHeight:50,
    minWidth:60,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
});
// export default PhoneSignIn;

