import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react'


@inject('rootStore') // 缓存rootStore,也就是在Root.js注入的
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class CitySelect extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.box} >
        <Text style={styles.cityname}>{this.props.rootStore.cityStore.cityName}</Text>
        <Icon name={'angle-down'} size={15} />
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
    paddingLeft: 13
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