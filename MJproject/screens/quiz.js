import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

// import { useEffect } from 'react/cjs/react.production.min'
const questions = ["Feeling nervous, anxious, or on edge","Having trouble relaxing?","Becoming easily annoyed or irritable","Over the last two weeks have you had trouble falling asleep, stay","feeling tired or having little energy","Not being able to stop or control being worried","Feeling bad about yourself - or that you are a failure or have let yourself","Thoughts that you would be better off dead, or of hurting yourself","don't feel like meeting friends or going out with them","Over the last two weeks have you had little interest or pleasure in"];
const answers = [];
const Quiz = ({navigation}) => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.question}>Q. {questions[count]}</Text>
      </View>
      <View style={styles.option}>
        <TouchableOpacity style={styles.optionButton} onPress={()=>answers.push("nearly every day")}>
            <Text style={styles.option}>nearly every day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={()=>answers.push("not at all")}>
            <Text style={styles.option}>not at all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={()=>answers.push("almost half the days")}>
            <Text style={styles.option}>almost half the days</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={()=>answers.push("several days")}>
            <Text style={styles.option}>some days</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        
        <TouchableOpacity style={styles.button} onPress={stcnt}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>navigation.navigate("Result")}>END</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
  function stcnt()
  {
    if(count==9)
    {
    //    navigation.navigate("Result");
    alert("will see later")
    }
    else
    setCount(count+1);
  }

}

export default Quiz

const styles = StyleSheet.create({
  container:{
        paddingTop:40,
        paddingHorizontal:20,
        container:'100%'
  },
  top:{
    marginVertical:16,
  },
  options:{
    marginVertical:16,
    flex:1,
  },
  bottom:{
    marginBottom:5,
    paddingBottom:5,
    paddingVertical:16,
    marginVertical:16,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  button:{
    backgroundColor:'#1A759F',
    padding:12,
    paddingHorizontal:16,
    borderRadius:16,
    alignItems:'center',
    marginBottom:30,
},
buttonText:{
    fontSize:16,
    fontWeight:'600',
    color:'white',
},
question:{
  fontSize:28,
  color:'black',
},
option:{
  fontSize:18,
  fontWeight:'500',
  color:'white'
},
optionButton:{
   paddingVertical:12,
   marginVertical:6,
   backgroundColor:'#34A0A4',
   paddingHorizontal:12,
   borderRadius:12
},
})