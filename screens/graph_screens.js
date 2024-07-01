import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, Alert, Button, FlatList, CheckBox } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { con } from '../controller/Controller';
import { styles, graph, buttonColor } from '../stylesheets'
import AppLoading from 'expo-app-loading'
import {Picker} from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/core'

export function createTwoButtonAlert(value, name){
  Alert.alert(
    name,
    "Has value:" + value,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: true }
  );
}

export function Graph({navigation, route}) {
  var data = []
  var params  = route.params;
  if (params.data == null){
    con.loading = true
  }
  if (con.loading) {
    return (
      <AppLoading
        startAsync={() => data = con.get_graph_by_range_name(params.days, params.tracking)}
        onFinish={() =>{
          con.loading=false
          navigation.navigate('Graph', {data: data._W})
        } }
        onError={console.warn}
      />
    )}
  return (
    
    <View style={graph.options}>
  <Button color = {buttonColor.color} style={{alignItems: 'right'}} title={"Options"} onPress={() => {navigation.navigate('Options', {data: data._W})}} />

      <Text
  style={{
  textAlign: 'center',
  fontStyle:'normal',
  fontSize: 24,
  padding: 0,
  marginTop: 15,
  }}>
  Graph Data
  </Text>
  <LineChart data={{
  labels: con.get_date_label(params.days),
  // datasets: [{data: [1,2,3,4,5,6]}]
  datasets: params.data,
  legend: params.tracking,
  }}
  width={Dimensions.get('window').width - 50}
  height={Dimensions.get('window').height - 300}
  yAxisSuffix={''} 
  xAxisLabel={''}
  yAxisLabel={''}
  withShadow={false}
  withInnerLines={true}
  withOuterLines={true}
  onDataPointClick={(value) => {console.log("this is", value.dataset.name, value.value), createTwoButtonAlert(value.value, value.dataset.name)}}
  withHorizontalLabels={true} 
  horizontalLabelRotation={0}
  verticalLabelRotation={75}
  segments={5}
  fromZero={true}
  chartConfig={{
  backgroundColor: '#c1e0dc',
  backgroundGradientFrom: '#9fbfbd',
  backgroundGradientTo: '#c3e8e6',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //Text color
  style: {

  },
  }}
  style={{ marginVertical: 5,
  borderRadius: 5,
  }}
  />
  </View>
  
    );
  }


function getList(item){
  return item.name
}

export function GraphOptions({ navigation }) {
  const isFocused = useIsFocused()
  var list = con.get_tracking_bool()
  var new_tracking = true
  const [selectedVal=0, setSelectedVal] = useState();
  var [checked, setChecked] = useState(list);
 
  useEffect(() => {
    new_tracking = true
    list = con.get_tracking_bool()
    setChecked(list)
  }, [isFocused])
  
  return (
    <View style={graph.options}>
      <Text style={{fontSize:20, color:'#233253'}}> Select your symptoms/indicators </Text>
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
                con.handleChange(item.name)
                setChecked(con.tracking_list_bool)
              }}
            />
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <View>
        <Text style={{fontSize:20, color:'#233253'}}>Pick your date range</Text>
      <Picker
      style={{width: 200, height: 50}}
        selectedValue={selectedVal}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedVal(itemValue)
        }>
        <Picker.Item label="Today" value={0} /> 
        <Picker.Item label="1 Day" value={1} />
        <Picker.Item label="7 Day" value={6} />
        <Picker.Item label="14 Day" value={13} />
        <Picker.Item label="1 Month" value={29} />
      </Picker>
      </View>
      <Button color={buttonColor.color} style={{alignItems: 'right'}} title={"Graph"} onPress={() => {
        var data = checked.filter(item => item.bool == true)
        data = data.map(getList)
        navigation.navigate('Graph', {tracking: data, days: selectedVal})}}></Button>
    </View>
  );
}
