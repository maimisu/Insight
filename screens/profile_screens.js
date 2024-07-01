import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { SafeAreaView, Text, View, Button, FlatList, CheckBox, Alert } from 'react-native';
/* import { infoBoxWrapper,styles, userInfo, row, title, caption, optionChoice, optionList, optionChoiceText } from '../stylesheets' */
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {infoBoxWrapper,styles, userInfo, row, title, caption, optionChoice, optionList, optionChoiceText, graph } from '../profile_stylesheet'
import { con } from '../controller/Controller';
import { Checkbox } from 'react-native-paper';
import { buttonColor} from '../stylesheets';

export function Profile({ navigation }) {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfo}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={{
        uri: 'https://commons.wikimedia.org/wiki/File:User_icon_BLACK-01.png',
      }}
      size={80}
    />
    <View style={{marginLeft: 20}}>
      <Title style={[styles.title, {
        marginTop:15,
        marginBottom: 5,
      }]}>John Smith</Title>
      {/* <Caption style={styles.caption}>johnsmith@email.edu</Caption> */}
    </View>
  </View>
</View>

{/* <View style={styles.userInfo}>
  <View style={styles.row}>
    <Icon name="map-marker-radius" color="#777777" size={20}/>
    <Text style={{color:"#777777", marginLeft: 20}}>Fairbanks, Alaska</Text>
  </View>
  <View style={styles.row}>
    <Icon name="phone" color="#777777" size={20}/>
    <Text style={{color:"#777777", marginLeft: 20}}>+1-888-888-8888</Text>
  </View> */}
  
{/* </View> */}
      {/* <StatusBar style="auto" />

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
          }]}>
            <Caption>You have journaled for </Caption>
            <Title>39 days</Title>
          </View>
      </View> */}
      
      {/* <View style={styles.optionList}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.optionChoice}>
            <Icon name= "account-edit" color = "#233253" size={25}/>
            <Text style= {styles.optionChoiceText}> Edit your profile </Text>
          </View>
        </TouchableRipple>
      </View> */}

      <View style={styles.optionList}>
        <TouchableRipple onPress={() => {navigation.navigate('Edit Journal')}}>
          <View style={styles.optionChoice}>
            <Icon1 name= "journal" color = "#233253" size={25}/>
            <Text style= {styles.optionChoiceText}> Customize your journal </Text>
          </View>
        </TouchableRipple>
      </View>


      <View style={styles.optionList}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.optionChoice}>
            <Icon name= "export" color = "#233253" size={25}/>
            <Text style= {styles.optionChoiceText}> Export to PDF </Text>
          </View>
        </TouchableRipple>
      </View>

      <View style={styles.optionList}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.optionChoice}>
            <Icon name= "star-box-multiple" color = "#233253" size={25}/>
            <Text style= {styles.optionChoiceText}> User feedback </Text>
          </View>
        </TouchableRipple>
      </View>

      <View style={styles.optionList}>
        <TouchableRipple onPress={() => {navigation.navigate('Disclaimer')}}>
          <View style={styles.optionChoice}>
            <Icon2 name= "file-contract" color = "#233253" size={25}/>
            <Text style= {styles.optionChoiceText}> Disclaimer and Privacy </Text>
          </View>
        </TouchableRipple>
      </View>

    </SafeAreaView>
  );
}

export function Settings() {
  return (
    <View style={styles.container}>
      <Text>Graph Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function addBool(name){
  var data = {}
  data.name=name
  data.bool=false
  return data
}

function getList(item){
  return item.name
}

export function JournalOptions({ navigation }) {
  var list = con.get_all_module()
  var newList = list.map(addBool)
  const [selectedVal, setSelectedVal] = useState();
  const [checked, setChecked] = useState(newList);
  const handleChange = (id) => {
    let temp = checked.map((check) => {
      if (id == check.name){
        return { ...check, bool: !check.bool}
      }
    return check
    });
    setChecked(temp);
  }
  return (
    <View style={graph.options}>
      <Text style={{fontSize:20, color:'#233253'}}>Select your symptoms/indicators </Text>
      <FlatList
        data={checked}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <CheckBox
              value={item.bool}
              onChange={() => {
                handleChange(item.name)
              }}
            />
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Button  color={buttonColor.color} style={{alignItems: 'right'}} title={"Save"} onPress={() => {
        var data = checked.filter(item => item.bool == true);
        data = data.map(getList);
        con.set_tracking_list(data);
        navigation.navigate('Journal', {data:data});
        }}></Button>
    </View>
  );
}
export function Disclaim({ navigation }){
  return (
    <View style={graph.options}>
      <Text style={{fontSize:16, color:'#233253'}}>DISCLAIMER:
This app and its content is for informational purposes only and is not intended to be a substitute for professional medical advice or medications. If you need medical or psychiatric attention, please call a qualified health provider. If you are experiencing suicidal thoughts, please call the National Suicide Prevention Lifeline at 1-800-273-8255. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room.  </Text>
      <Text></Text>
      <Text style={{fontSize:16, color:'#233253'}}>PRIVACY NOTICE:
The information you enter into the InSight app is stored locally on this device and is not distributed or shared elsewhere. You are responsible for protecting the privacy of the contents on your phone or device.</Text>
      </View>
  )
}