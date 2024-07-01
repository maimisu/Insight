import { StyleSheet } from 'react-native';

const IS_blue = '#233253'
const IS_green = '#7DB797'
const IS_lightgreen = '#edf5f0'
const IS_yellow = '#FBEE51'

  export const buttonStyles = StyleSheet.create({
    container: {
      flex: 10,
      backgroundColor: '#edf5f0',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  })
  
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#edf5f0',
    },
    userInfo: {
      paddingHorizontal: 30,
      marginBottom: 25,
      color: '#233253',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#233253',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
      color: '#233253',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  optionList: {
    marginTop: 10,
  },
  optionChoice: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
optionChoiceText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

export const graph = StyleSheet.create({
  options: {
    flex: 1,
    backgroundColor: IS_lightgreen,
    color: IS_blue,
    paddingLeft: 25,
    paddingRight: 25,
  }
})