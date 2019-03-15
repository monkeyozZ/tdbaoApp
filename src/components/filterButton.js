import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')

export default class filterButton extends Component {
  render() {
    return (
      <View style={styles.box} >
        <Text style={styles.cityname}>筛选</Text>
        <Icon name={'angle-down'} size={15} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    width: width/4,
    height: 44,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  cityname: {
    marginRight: 4,
    fontSize: 15,
    color: '#333333'
  },
  img: {
    width: 9,
    height: 6
  }
})