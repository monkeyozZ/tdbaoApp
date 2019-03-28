import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { SpringScrollView } from "react-native-spring-scrollview";

export default class Customer extends Component {
  static navigationOptions = {
    title: "客户",
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
  constructor(props) {
    super(props)
  }
  _contentCount = 20;
  render() {
    const arr = [];
    for (let i = 0; i < this._contentCount; ++i) arr.push(i);
    return (
      <SpringScrollView>
        {arr.map((i, index) =>
          <Text key={index} style={styles.text}>
            Modify the '_contentCount','_bounces' and '_scrollEnabled' in
            BouncesExample.js to check if VerticalScrollView works well.
          </Text>
        )}
      </SpringScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    margin: 20
  }
})