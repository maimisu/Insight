import React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; //Entypo pictograms by Daniel Bruce — www.entypo.com
import { createStackNavigator } from '@react-navigation/stack';

import { customCalendar, datePage } from './screens/calendar_screens';
import { Graph, GraphOptions } from './screens/graph_screens';
import { Journal, SliderScreen } from './screens/journal_screens';
import { Profile, Settings, JournalOptions, Disclaim } from './screens/profile_screens';

/*********************/
/* BottomTab         */
/*********************/
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator 
        //Tab Options
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? '#7DB797': '#233253';
            let iconName;
            if (route.name === 'Graph') {
              iconName = 'line-graph';
            }
            else if (route.name === 'Journal') {
              iconName = 'pencil';
            } 
            else if (route.name === 'Calendar') {
              iconName = 'calendar';
            } 
            else if (route.name === 'Profile') {
              iconName = 'user';
            }

            return <Entypo name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#7DB797',
          inactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen name="Graph" component={GraphStack} />
        <BottomTab.Screen name="Journal" component={JournalStack} />
        <BottomTab.Screen name="Calendar" component={CalendarStack} />
        <BottomTab.Screen name="Profile" component={ProfileStack} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

/*********************/
/* Stacks            */
/*********************/
const JournalNav = createStackNavigator();
const GraphNav = createStackNavigator();
const CalendarNav = createStackNavigator();
const ProfileNav = createStackNavigator();

export function GraphStack() {
  return (
    <GraphNav.Navigator>
      <GraphNav.Screen name="Options" component={GraphOptions}/>
      <GraphNav.Screen name="Graph" component={Graph}/>
    </GraphNav.Navigator>
  );
}
  
export function JournalStack() {
  return (
    <JournalNav.Navigator>
      <JournalNav.Screen name="Journal" component={Journal}/>
      <JournalNav.Screen name="Slider" component={SliderScreen}/>
    </JournalNav.Navigator>
  );
}
  
export function CalendarStack() {
  return (
    <CalendarNav.Navigator>
      <CalendarNav.Screen name="Calendar" component={customCalendar}/>
      <CalendarNav.Screen name="OnDate" component={datePage}/>
    </CalendarNav.Navigator>
  );
}
  
export function ProfileStack() {
  return (
    <ProfileNav.Navigator>
      <ProfileNav.Screen name="Profile" component={Profile}/>
      <ProfileNav.Screen name="Settings" component={Settings}/>
      <ProfileNav.Screen name="Edit Journal" component={JournalOptions}/>
      <ProfileNav.Screen name="Disclaimer" component={Disclaim}/>
    </ProfileNav.Navigator>
  );
}