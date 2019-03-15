import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class HeaderRight extends Component {
  render() {
    return (
      <View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 14,
    color: "#333333",
    paddingRight: 13
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