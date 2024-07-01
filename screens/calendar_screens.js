import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../stylesheets'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export function customCalendar() {
  var current_date = new Date()
  const offset = current_date.getTimezoneOffset()
  current_date = new Date(current_date.getTime() - (offset*60*1000))
  current_date = current_date.toISOString().split('T')[0]
  return (
    <CalendarList
    theme={{
      backgroundColor: '#edf5f0',
      'stylesheet.calendar.header': {
        dayHeader: {
          fontWeight: '600',
          color: '#7DB797',
        }
      },
      'stylesheet.day.basic': {
        today: {
          borderColor: '#233253',
          borderWidth: 0.8
        },
        todayText: {
          color: '#233253',
          fontWeight: '800'
        }
      }
    }}

      current={current_date}
      pastScrollRange={12}
      futureScrollRange={1}
      renderHeader={date => {
        const header = date.toString('MMMM yyyy');
        const [month, year] = header.split(' ');
        const textStyle = {
          fontSize: 18,
          fontWeight: 'bold',
          paddingTop: 10,
          paddingBottom: 10,
          color: '#233253',
          paddingRight: 5
        }

        return (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Text style={{marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
            <Text style={{marginRight: 5, ...textStyle}}>{year}</Text>
          </View>
        );
      }}
    />
  );
}
  
export function datePage() {
  return (
    <View style={styles.basic}>
      <Text>Date Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}
