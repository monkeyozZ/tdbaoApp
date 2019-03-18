import React, { Component } from 'react'
import { View, Text,Image,Dimensions, StyleSheet, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import icons from '../icon'
import { px2dp } from '../utils/px2dp'
const { width, height } = Dimensions.get('window')

export default class OrderListItem extends React.Component{
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.row} >
        <View style={styles.itemHeadr}>
          <Text style={styles.name}>张先生</Text>
          <Text style={styles.money}>8<Text style={styles.dw}>万元</Text></Text>
          <LinearGradient 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}}
          colors={['#FACE5A', '#F87F29']} 
          style={styles.category}>
            <Text style={styles.categoryText}>优选</Text>
          </LinearGradient>
          <Text style={styles.time}> 13分钟前</Text>
        </View>
        <View style={styles.itemBody}>
          <View style={styles.city}>
            <View style={styles.cityBox}>
              <Icon name={'map-marker-outline'} size={18} style={styles.cityIcon}/>
              <Text style={styles.cityText}>上海</Text>
            </View>
          </View>
          <View style={styles.order}>
            <Button
                title="立即抢购"
                buttonStyle={styles.orderBtn}
                onPress={() => {}}
              />
          </View>
        </View>
        <View style={styles.itemFooter}>
          <View style={styles.footerItem}>
            <View style={styles.iconBox}>
              <Image source={icons.house} style={{ width: px2dp(20), height: px2dp(18)}} />
            </View>
            <Text style={styles.itemFooterText}>有房产</Text>
          </View>
          <View style={styles.footerItem}>
            <View style={styles.iconBox}>
              <Image source={icons.car} style={{ width: px2dp(21), height: px2dp(17) }} />
            </View>
            <Text style={styles.itemFooterText}>有车产</Text>
          </View>
          <View style={styles.footerItem}>
            <View style={styles.iconBox}>
              <Image source={icons.baodan} style={{ width: px2dp(17), height: px2dp(19) }} />
            </View>
            <Text style={styles.itemFooterText}>无保单</Text>
          </View>
          <View style={styles.footerItem}>
            <View style={styles.iconBox}>
              <Image source={icons.card} style={{ width: px2dp(19), height: px2dp(16) }} />
            </View>
            <Text style={styles.itemFooterText}>有信用卡</Text>
          </View>
          <View style={styles.footerItem}>
            <View style={styles.iconBox}>
              <Image source={icons.wld} style={{ width: px2dp(21), height: px2dp(16) }} />
            </View>
            <Text style={styles.itemFooterText}>有微粒贷</Text>
          </View>
        </View>
        <View style={styles.itemLine}></View>
      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
    /* paddingVertical: px2dp(15), */
    /* marginBottom: px2dp(10), */
    backgroundColor: '#fff',
  },
  itemHeadr: {
    flex:1,
    flexDirection: 'row',
    paddingHorizontal: px2dp(15),
    paddingTop: px2dp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1.5,
    fontSize: px2dp(18),
    color: '#333333',
    textAlign: 'center'
  },
  money: {
    flex: 1,
    textAlign: 'left',
    fontSize: px2dp(24),
    paddingHorizontal: px2dp(10),
    color: '#F87F30',
  },
  dw: {
    fontSize: px2dp(12),
  },
  category: {
    borderRadius: px2dp(5)
  },
  categoryText:{
    paddingHorizontal: px2dp(5),
    color: "#fff"
  },
  time: {
    flex: 3,
    textAlign: 'right',
    paddingRight: px2dp(20)
  },
  itemBody: {
    flex:1,
    flexDirection: 'row',
    paddingHorizontal: px2dp(15),
    paddingTop: px2dp(20)
  },
  city: {
    flex: 1,
    justifyContent: 'center',
  },
  cityBox: {
    maxWidth: px2dp(80),
    flexDirection: 'row',
    backgroundColor: '#EFF3FD',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: px2dp(10),
    borderRadius: 5,
  },
  cityIcon: {
    marginLeft: px2dp(4)
  },
  cityText: {
    flex: 2,
    justifyContent: 'center',
    textAlign: 'center'
  },
  order: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  orderBtn: {
    width: px2dp(110),
    height: px2dp(30),
    borderRadius: 20
  },
  itemFooter: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: px2dp(15),
    marginTop: px2dp(10),
    paddingBottom: px2dp(15),
  },
  footerItem: {
    flex: 1,
    justifyContent: 'center',
  },
  iconBox:{
    justifyContent: 'center',
    alignItems:'center',
  },
  itemFooterText:{
    textAlign: 'center'
  },
  itemLine: {
    width: width,
    height: px2dp(10),
    backgroundColor: '#f4f5f7'
  }
})