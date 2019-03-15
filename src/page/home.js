import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native'
import City from '../components/headerLeftCity'
import FilterButton from '../components/filterButton'
import ResetHeaderRight from '../components/resetHeaderRight'
import FilterList from '../components/filterList'
import Swiper from '../components/swiper'
import { setStatusBar } from '../components/HOC/statusBar'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { SpringScrollView } from "react-native-spring-scrollview";
import {
  WithLastDateHeader,
  ChineseNormalHeader,
  ChineseWithLastDateHeader,
} from "react-native-spring-scrollview/Customize";
import { LargeList, NativeLargeList } from "react-native-largelist-v3";
import Modal from 'react-native-modalbox';
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'
const { width, height } = Dimensions.get('window')

@setStatusBar({
  barStyle: 'dark-content',
  translucent: true,
  backgroundColor: 'rgba(0,0,0,0.1)'
})

@inject('rootStore') // 缓存rootStore,也就是在main.js注入的
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class Home extends Component{
  constructor (props) {
    super(props)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: '抢单',
      headerTitleStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: "400",
        textAlign: "center"
      },
      headerTintColor: "#333333",
      headerLeft: <TouchableOpacity onPress={() => navigation.navigate("SelectCity")}><City/></TouchableOpacity> ,
      headerRight: <ResetHeaderRight />
    }
  }
  @computed get filterStore() {
    const { rootStore } = this.props;
    const { filterStore } = rootStore;
    return filterStore;
  }
  _tabChange(obj) {
    const { i, ref } = obj
  }

  _openModal() {
    this._filter.open()
  }
  _closeModal() {
    this._filter.close()
  }

  componentDidMount() {
    //在static中使用this方法
    // this.props.navigation.setParams({ openFilter: this._openModal })
  }

  _renderIndexPath = ({ section: section, row: row }) => {
    return (
      <View style={styles.row}>
        <Text>
          Section {section} Row {row}
        </Text>
        <View style={styles.line} />
      </View>
    );
  };

  _contentCount = 20;
  _sectionCount = 10;
  _rowCount = 10;
  render() {
    const arr = [];
    for (let i = 0; i < this._contentCount; ++i) arr.push(i);
    const data = [];
    for (let section = 0; section < this._sectionCount; ++section) {
      const sContent = { items: [] };
      for (let row = 0; row < this._rowCount; ++row) {
        sContent.items.push(row);
      }
      data.push(sContent);
    }
    return (
      <View style={styles.container}>
          <View style={styles.swiperBox}>
            <Swiper />
          </View>
          <View style={styles.navContainer}>
            <ScrollableTabView
              renderTabBar={() => <ScrollableTabBar tabsContainerStyle={{width: (width/4)*3}} style={styles.topNavBox} />}
              tabBarInactiveTextColor='#333333'
              tabBarActiveTextColor='#333333'
              tabBarTextStyle={{ fontSize: 15 }}
              tabBarUnderlineStyle={styles.topNavLineStyle}
              onChangeTab={this._tabChange}
            >
            <LargeList
              tabLabel='全部可抢'
              data={data}
              style={{flex:1}}
              heightForIndexPath={() => 50}
              renderIndexPath={this._renderIndexPath}
              ref={ref => (this._list = ref)}
              refreshHeader={ChineseWithLastDateHeader}
              onRefresh={() => {
                setTimeout(() => {
                  this._list.endRefresh();
                  setTimeout(() => this.setState({ prop: "your changed props" }));
                }, 2000);
              }} />
            {/* <SpringScrollView tabLabel='全部可抢' style={{height: height}}>
                {arr.map((i, index) =>
                  <Text key={index} style={styles.text}>
                    Modify the '_contentCount','_bounces' and '_scrollEnabled' in
                    BouncesExample.js to check if VerticalScrollView works well.
              </Text>
                )}
            </SpringScrollView> */}
              <View tabLabel='优选' style={styles.topNavItem}>
                {arr.map((i, index) =>
                  <Text key={index} style={styles.text}>
                    Modify the '_contentCount','_bounces' and '_scrollEnabled' in
                    BouncesExample.js to check if VerticalScrollView works well.
              </Text>
                )}
              </View>
              <Text tabLabel='淘单' style={styles.topNavItem}>project</Text>
            </ScrollableTabView>
            <TouchableOpacity onPress={this._openModal} style={styles.filter}><FilterButton /></TouchableOpacity>
            </View>
          <Modal style={styles.modal}
          backdrop={true}
          backdropPressToClose={false}
          position={"top"}
          entry={'top'}
          coverScreen={true}
          swipeToClose={false}
          animationDuration={600}
          ref={(ref) => (this._filter = ref)}>
            <View style={styles.formBox}>
              <FilterList closeModal={this._closeModal} filterStore={this.filterStore}/>
            </View>
          </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  swiperBox: {
    width: width,
    height: 120
  },
  navContainer: { 
    flex: 1, 
    position: 'relative', 
  },
  topNavBox: {
    height: 44,
    borderWidth: 0
  },
  topNavItem: {
    paddingHorizontal: 15,
  },
  topNavLineStyle: { 
    backgroundColor: '#2F7AFF',
    borderRadius: 10,
  },
  filter: { 
    position: 'absolute', 
    top: 0, 
    right: 0
  },
  modal: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  formBox: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: "black",
    fontSize: 22
  }
})