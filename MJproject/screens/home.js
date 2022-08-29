import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Quiz from './quiz'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Avatar, Title} from 'react-native-paper';


const Home = ({navigation}) => {
    const [nm,setNm] = useState("");
    database()
   .ref('users/'+`${auth().currentUser.uid}`)
  .once('value')
  .then(snapshot => {
    setNm(snapshot.val().name);
  });
  return (
    <View style={styles.container}>
       <View style={styles.userInfoSection}>
          <TouchableOpacity style={{flexDirection: 'row', marginTop: 35}} onPress={()=>navigation.navigate("ProfileScreen")}>
            <Avatar.Image 
              source={{
                uri: "https://www.ranacanada.ca/wp-content/uploads/2021/05/user.png",
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {marginTop:25}]}>{nm}</Title>
            </View>
          </TouchableOpacity>
        </View>
     <View style={styles.bannerContainer}>
         <Image 
           source =
           {{
               uri: 'https://tse3.mm.bing.net/th?id=OIP.EEgYG2FkdDR2y2STQBi5zgHaFG&pid=Api&P=0&w=233&h=160'
           }}
           style={styles.banner}
           resizeMode="contain"/>
     </View>
     <TouchableOpacity onPress={()=>navigation.navigate("Quiz")} style={styles.button}>
         <Text style={styles.buttonText}>START</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Home;
const styles = StyleSheet.create({
    banner:{
        height:300,
        width:300,
        marginTop:300
    },
    bannerContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    container:{
        paddingTop:40,
        paddingHorizontal:20,
        container:'100%'
    },
    button:{
        width:'100%',
        backgroundColor:'#1A759F',
        padding:16,
        borderRadius:16,
        alignItems:'center',
        marginBottom:10,
        marginTop:400
    },
    buttonText:{
        fontSize:24,
        fontWeight:'600',
        color:'white',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
      },
})