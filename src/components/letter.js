import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Letter extends React.Component{
  constructor (props) {
    super(props)
  }

  render() {
    if (this.props.showLetterItem) {
      return (<View style={styles.letterItem}><Text style={styles.letterItemText}>{this.props.letterItem}</Text></View>)
    } else {
      return null
    }
    
  }
}

const styles = StyleSheet.create({
  letterItem: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: '40%',
    left: '50%',
    transform: [{ translateX: -15 }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 2,
  },
  letterItemText: {
    color: '#ffffff',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
})