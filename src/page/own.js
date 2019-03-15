import React, { Component } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Dimensions } from 'react-native'
import { px2dp } from '../utils/px2dp'
const { width, height } = Dimensions.get('window')

export default class Own extends Component {
  _sectionCount = 10;
  _rowCount = 10;
  constructor (props) {
    super(props)
    this.state = {}
  }
  static navigationOptions = {
    title: "我的",
    /* headerStyle: {
      borderBottomWidth: 0.5,
      borderBottomColor: "#CACACB",
      elevation: 0
    }, */
    headerTitleStyle: {
      flex: 1,
      fontSize: 15,
      fontWeight: "400",
      textAlign: "center"
    },
    headerTintColor: "#333333"
  }

  render() {
    return (
      <View>
        <Text>66</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBox: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  currentCity: {
    flexDirection: 'row',
    width: 97,
    height: 33,
    backgroundColor: '#EEEEEE',
    alignItems: "center",
    justifyContent: "center",
    color: '#333333',
    marginVertical: 8
  },
  iconBox: {
    flex: 0.6,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  icon: {
    width: px2dp(12),
    height: px2dp(16)
  },
  text: {
    flex: 1,
    alignItems: 'flex-start'
  },
  section: {
    flex: 1,
    backgroundColor: "#979797",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
    marginRight: 30
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEE"
  },
  letters: {
    position: 'absolute',
    height: '100%',
    top: 0,
    bottom: 0,
    right: 5,
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
  letterText: {
    textAlign: 'center',
    fontSize: height * 1.1 / 50,
    color: '#9B9B9B',
    fontSize: 12
  },
});
