import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderRightRefresh extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Icon name={'vertical-align-top'} size={25}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15
  },
  cityname: {
    marginRight: 4,
    color: '#333333'
  },
  img: {
    width: 9,
    height: 6
  }
})