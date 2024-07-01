import React, { useEffect } from 'react'
import { Text, View, Button, Alert} from 'react-native'
import { Slider } from 'react-native-range-slider-expo'
import { journalStyles, styles, buttonColor } from '../stylesheets'
import { con } from '../controller/Controller'
import AppLoading from 'expo-app-loading'
import { useIsFocused } from '@react-navigation/core'

export function TwoButtonAlert(name){
  Alert.alert(
    name,
    "Has been saved",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: true }
  );
}

export function Journal({ navigation }) {
  const isFocused = useIsFocused()
  var new_tracking = true
  var list = con.get_tracking()
  useEffect(() => {
    list = con.get_tracking()
  }, [isFocused])
  if (new_tracking){
    return (
      <View style={journalStyles.page}>
        {list.map(item => (
          <View style={{padding:1}}>
            <Button p color={buttonColor.color} title={item} onPress={() => navigation.navigate('Slider', {name: item, nav: navigation})} />
            </View>
        ))}
      </View>
    );
  }
  
}
export function SliderScreen({route}) {
  var params = route.params;
  var val = 0
  if (con.data[0]['name'] != params.name){
    con.loading=true
  }
  if (con.loading) {
    return (
      <AppLoading
        startAsync={() => con.update_tracking(params.name)}
        onFinish={() =>{
          con.loading=false
          params.nav.navigate('Slider', {name: params.name, nav: params.nav})
        } }
        onError={console.warn}
      />
    )}
  return (
    <View style={journalStyles.page}>
      <Text style={journalStyles.title}>{con.data[0]['name']}</Text>
      <Slider knobColor={buttonColor.color} styleSize={30} min={0} max={10} step={1}
        initialValue={0}
        valueOnChange={(value)=>{ val = value}}
      />
      <Text style={journalStyles.scale} >{con.data[0]['scale']}</Text>
      <Text style={journalStyles.description}>{con.data[0]['desc']}</Text>
      <Button color={buttonColor.color} title={"Save"} onPress={() => {
        con.save_graph_data({
            name: con.data[0]['name'], 
            value: val,
            time: 0
          }),
          TwoButtonAlert(con.data[0]['name']);
        }
        } />
    </View>
  );
}