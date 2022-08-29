import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImagePickerIOS,Button
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



const EditProfileScreen1 = ({onClick}) => {
  console.log('EditProfileScreen: Start');

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [profilePic, setProfilePic] =  useState();

  const [date_of_birth, set_date_of_birth] = useState(new Date());

  const [value, setValue] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [dob1, setdob1] = useState(false);
  const [gender1, setgender1] = useState(false);
  console.log('updateInProgress: ', updateInProgress);
  // let currentProfilePicUrl = LilSession.userProfile().profile_pic_url;

  let obj1=null;
  let obj2=null;
  
      
      //******************nAMES DECLARED*********************** */
      
    
      async function  updateNames(){
        console.log('updateProfile Called');
        console.log('firstName = ', firstName);
        if (!firstName || (firstName.trim() == "")){
          setErrorMessage('Provide your first name');
          setShowErrorMessage(true);
          return
        }
        console.log('save button called',auth().currentUser.uid);
        setdob1(true)
      }
      //******************nAMES DECLARED*********************** */



      //******************IMAGE SELECTION*********************** */
    
      async function getImage(){
        try {
          const res = await ImageCropPicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            freeStyleCropEnabled: true,
            cropperCircleOverlay: true,
            hideBottomControls: true
          })
    
          setProfilePic( {
            name: "profile_pic", 
            type: res.mime,        
            uri: Platform.OS === 'ios' ? res.path.replace('file://', '') : res.path
          })
        }catch(err){
            console.log('Image picker error: ', err)
        }
      }
      //******************IMAGE SELECTION*************************/



  const printRadioButton = (value, text) => {
    return(
        <View style={styles.row} >
            <RadioButton value={value} onPress={() => setValue(value)} />
            <Text style={styles.submitButtonText}> {text} </Text>
        </View>
    );
  }
  function submitDateOfBirth()
  {
    const parsed_date = date_of_birth.toISOString().substring(0, 10);
    console.log(parsed_date);
    setgender1(true)
    
  }
  obj1 = {
    username : auth().currentUser.uid,
  };
  obj2 = {
      name : firstName+" "+lastName,
      email : auth().currentUser.email,
      dob : date_of_birth,
      gender : value,
  };
  async function submitGender()
  {
    console.log("Jhello")
    
    console.log(obj2);
    create()
    onClick()
  }


  function create(){
    database()
    .ref("users" + `/${auth().currentUser.uid}`)
    .set({
      name: `${firstName+" "+lastName}`,
      email: `${auth().currentUser.email}`,
      dob: `${date_of_birth.toISOString().substring(0, 10)}`,
      gender: `${value}`, 
    })
    .then(data => {console.log('Data set.',data)});
  }

  if(!dob1 && !gender1)
  {
    return (
      <SafeAreaView style={styles.container1}>
        <StatusBar 
          />
          <View style={{
            width:'100%',
            maxWidth:600
          }}>
          {(profilePic ) && <View  style={{alignItems: 'center'}}>
            <Image style={{width:80, height:80, borderRadius:80}}
              source={{uri: (profilePic.uri )}}
            />
          </View>}
  
          
          <View  style={{width:'100%', paddingHorizontal:16, marginBottom:32, marginTop:8}}>
            <TouchableOpacity style={{paddingVertical:16, paddingHorizontal:16}}
              onPress={getImage}
            >
              <Text style={{textAlign:'center', color:'black'}}>{ 'Change Image'}</Text>
            </TouchableOpacity>
          </View>
          {/* first name text box */}
          <View style={{width:'100%', paddingHorizontal:16, alignItems: 'center'}}>
          <TextInput style={{...{width:'100%'}, color:'black'}} placeholder={"First name"}
            placeholderTextColor='grey'
            defaultValue={firstName}
            onChangeText={text => setfirstName(text)}
          />
          </View>
  
          {/* last name check box */}
          <View style={{width:'100%', paddingHorizontal:16, marginTop:16, alignItems: 'center'}}>
          <TextInput style={{...{width:'100%'}, color:'black'}} placeholder={"Last name"}
            placeholderTextColor='grey'
            defaultValue={lastName}
            onChangeText={text => setlastName(text)}
            autoCapitalize='words'
          />
          </View>
          
          {/* error message */}
          <Text style={{...{marginTop:16} }}> { showErrorMessage ?  errorMessage : '' }</Text>
          
          <View style={{width:'100%', paddingHorizontal:16, marginTop:16, alignItems:'center'}}>
            {/* if update in progress, show text */}
            {updateInProgress && <View>
                {/* activity indicator is a loader */}
                <ActivityIndicator />
                <Text>Saving...</Text> 
              </View>
            }
            {/* if update not in progress -- show save button */}
            {!updateInProgress &&
              <Button title="Save" onPress={() => updateNames()} />
            }
          </View>
        </View>
    
    </SafeAreaView>
    )

  }
  
  else if(dob1 && !gender1)
  {
    return (
      <SafeAreaView style={styles.container}>
          
            {/* **********************dob********************************* */}
            <Text style={styles.text}>Date of Birth</Text>
            <DatePicker 
                date={date_of_birth}
                onDateChange={set_date_of_birth}
                mode="date"
                androidVariant="nativeAndroid"
                minimumDate={new Date("1900-01-01")}
                maximumDate={new Date()}
            />
            {/* **********************dob********************************* */}
  
            
  
            {/* <TouchableOpacity style={styles.submitButton} onPress={submitDateOfBirth()} >
                <Text style={styles.submitButtonText}> Submit</Text>
            </TouchableOpacity> */}
            <Button style={styles.submitButton} onPress={()=>submitDateOfBirth()} title="Submit"></Button>
  
        </SafeAreaView>
    )
  }
  
  else
  {
    return(
      <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Gender</Text>
        <RadioButton.Group onvalueChange={newvalue => setValue(newvalue)} value={value}>
          {printRadioButton("male", "Male")}
          {printRadioButton("female", "Female")}
          {printRadioButton("transgender", "Transgender")}
          {printRadioButton("prefer_not_to_say", "PreferNotToSay")}
        
        </RadioButton.Group>
        <Button style={styles.submitButton} onPress={()=>submitGender()} title="Submit"></Button>
      </SafeAreaView>
    )

  }
	

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
    marginBottom: 10,
    color:'#000'
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff'
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


export default EditProfileScreen1;