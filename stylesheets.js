import { StyleSheet } from 'react-native';

const IS_blue = '#233253'
const IS_green = '#7DB797'
const IS_lightgreen = '#edf5f0'
const IS_yellow = '#FBEE51'

export const buttonColor = {
  color: IS_green
}


export const styles = StyleSheet.create({
  basic: {
    flex: 1,
    backgroundColor: IS_lightgreen,
    color: IS_blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
})

export const graph = StyleSheet.create({
  options: {
    flex: 1,
    backgroundColor: IS_lightgreen,
    color: IS_blue,
    paddingLeft: 25,
    paddingRight: 25,
  }
})
  
export const journalStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: IS_lightgreen,
    padding: 20
  },
  buttons: {
    paddingTop: 85,
    flex: 1,
    backgroundColor: IS_lightgreen
  },
  slider: {
    padding: '20%'
  },
  title: {
    textAlign: 'center',
    paddingTop: '30%',
    color: IS_blue,
    fontSize: 25
  },
  description: {
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
    padding:'5%',
    color: IS_blue,
    fontSize: 17,
  },
  scale: {
    textAlign: 'center',
    color: IS_blue,
    fontSize: 16,
  }
})
