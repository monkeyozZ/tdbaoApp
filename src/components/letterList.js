import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, UIManager, findNodeHandle } from 'react-native'
import PropTypes from 'prop-types';
const buildLetterarr = () => {
  let arr = []
  for (let i = 65; i <= 90; i++) {
    if (i !== 73 && i !== 79 && i !== 85 && i !== 86) {
      arr.push(String.fromCharCode(i))
    }
  }
  return arr
}
const letters = buildLetterarr()
const { width, height } = Dimensions.get('window')
export default class LetterList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'transparent',
      textColor: '#9B9B9B',
      index: null,
      timer: null
    }
  }
  static propTypes = {
    hideLetterView: PropTypes.func.isRequired,
  }
  detectAndScrollToSection = (e) => {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    var ev = e.nativeEvent.touches[0];
    // 手指按下的时候需要修改颜色
    this.setState({ backgroundColor: 'rgba(0,0,0,0.3)', textColor: '#fff'})
    UIManager.measure(findNodeHandle(this.view), (x, y, width, height, pageX, pageY) => {
      //todo
      let targetY = ev.pageY;
      if (targetY - pageY < 0) {
        return;
      }
      let index = Math.ceil((targetY - pageY) / (Dimensions.get('window').height * 3.3 / 100));
      console.log(this.props)
      this.props.showletterItem(letters[index - 1], index - 1)
    })
  }
  detectAndScrollToSectionMove = (e) => {
    if (this.state.timer){
      clearTimeout(this.state.timer)
    }
    var ev = e.nativeEvent.touches[0];
    // 手指按下的时候需要修改颜色
    this.setState({ backgroundColor: 'rgba(0,0,0,0.3)', textColor: '#fff'})
    UIManager.measure(findNodeHandle(this.view), (x, y, width, height, pageX, pageY) => {
      //todo
      let targetY = ev.pageY;
      if (targetY - pageY < 0) {
        return;
      }
      let index = Math.ceil((targetY - pageY) / (Dimensions.get('window').height * 3.3 / 100));
      console.log(targetY, pageY, height)
      if (index !== this.state.index) {
        this.props.showletterItem(letters[index - 1], index - 1)
        this.setState({ index: index})
      }
    })
  }
  resetSection = () => {
    // 手指抬起来的时候需要变回去
    this.setState({ backgroundColor: 'transparent', textColor: '#9B9B9B' })
    // 隐藏 letter
    let time = setTimeout(() => {
      this.props.hideLetterView()
    }, 1500);
    this.setState({ timer: time})
  }
  
  componentWillUnmount() {
    clearTimeout(this.state.timer)
  }

  render() {
    return (
      <View
        style={[styles.letters, { backgroundColor: this.state.backgroundColor}]}
        ref={ref => (this.view = ref)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={this.detectAndScrollToSection}
        onResponderMove={this.detectAndScrollToSectionMove}
        onResponderRelease={this.resetSection}
      >
        {letters.map((letter, index) => this._renderLetters(letter, index))}
      </View>
    )
  }
  _renderLetters(letter, index) {
    return (
      <View style={styles.letter} key={index}>
        <Text style={[styles.letterText, {color: this.state.textColor}]}>{letter}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  letters: {
    position: 'absolute',
    /* height: '100%', */
    /* top: 0, */
    bottom: height * 3.3 / 100,
    right: 2,
    borderRadius: 3,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  letter: {
    height: height * 3.3 / 100,
    width: width * 3 / 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    textAlign: 'center',
    color: '#9B9B9B',
    fontSize: 14
  },
})