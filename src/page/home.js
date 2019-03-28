import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ScrollView, Platform, StatusBar, TouchableHighlight, Alert, Animated} from 'react-native'
import {Header} from 'react-navigation'
import City from '../components/headerLeftCity'
import FilterButton from '../components/filterButton'
import OrderListItem from '../components/orderListItem'
import ResetHeaderRight from '../components/resetHeaderRight'
import HeaderRightRefresh from '../components/headerRightRefresh'
import FilterList from '../components/filterList'
import Swiper from '../components/swiper'
import { setStatusBar } from '../components/HOC/statusBar'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { SpringScrollView } from "react-native-spring-scrollview";
import { LargeList, NativeLargeList } from "react-native-largelist-v3";
import { px2dp } from '../utils/px2dp'
import {
  ChineseWithLastDateHeader,
  ChineseWithLastDateFooter
} from "react-native-spring-scrollview/Customize";
import Modal from 'react-native-modalbox';
import { inject, observer } from 'mobx-react'
import { computed, observable, action } from 'mobx'
import { ifiPhoneX } from '../utils/device'
const { width, height } = Dimensions.get('window')
const headerHeight = Platform.OS === 'android' ? StatusBar.currentHeight + Header.HEIGHT : Header.HEIGHT
const BottomTabBarHeight = ifiPhoneX(49+34, 49)

_sectionCount = 1;
_rowCount = 10;
const data = [];
for (let section = 0; section < this._sectionCount; ++section) {
  const sContent = { items: [] };
  for (let row = 0; row < this._rowCount; ++row) {
    sContent.items.push(row);
  }
  data.push(sContent);
}

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
    this._watchScroll = this._watchScroll.bind(this)
    this._watchInsideScroll = this._watchInsideScroll.bind(this)
    this._resetListIndex = this._resetListIndex.bind(this)
    this._tabChange = this._tabChange.bind(this)
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
      headerRight: navigation.getParam('headerRightComponents', <ResetHeaderRight/>)
    }
  }
  @observable scrollAbleStatus = true
  @observable insideScrollAbleStatus = false
  @observable showsVerticalScrollIndicatorStatus = true
  @observable showsInsileVerticalScrollIndicatorStatus = false
  @observable bouncesStatus = true
  @observable _nativeOffset = {
                y: new Animated.Value(0)
              };

  @computed get filterStore() {
    const { rootStore } = this.props;
    const { filterStore } = rootStore;
    return filterStore;
  }


  @action
  disableScrollAbleStatus() {
    this.scrollAbleStatus = false
    this.showsVerticalScrollIndicatorStatus = false
  }
  @action
  enableScrollAbleStatus() {
    this.scrollAbleStatus = true
    this.showsVerticalScrollIndicatorStatus = true
  }
  @action
  disableInsideScrollAbleStatus() {
    this.insideScrollAbleStatus = false
    this.showsInsileVerticalScrollIndicatorStatus = false
  }
  @action
  enableInsideScrollAbleStatus() {
    this.insideScrollAbleStatus = true
    this.showsInsileVerticalScrollIndicatorStatus = true
  }


  @action
  disableBouncesStatus() {
    this.bouncesStatus = false
  }

  @action
  enableBouncesStatus() {
    this.bouncesStatus = true
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

  componentWillUnmount() {
    this.enableScrollAbleStatus()
  }
  _renderIndexPath = ({ section: section, row: row }) => {
    return (
      <TouchableHighlight onPress={() => {
        Alert.alert(
          '还没做',
          '你走吧！',
          [
            { text: '滚滚滚', onPress: () => {} },
            { text: '好好好', onPress: () => {} },
          ],
          { cancelable: false }) }} activeOpacity={0.9} underlayColor='rgba(0,0,0,0.15)'>
        <View style={{flex: 1}}>
        <OrderListItem ref={(ref) => (this._item = ref)}/>
          {data[section].items.length > 1 ? <View style={styles.itemLine}></View> : null}
        </View>
      </TouchableHighlight>
    );
  };

  _watchScroll(event) { //内层的也会监听到滚动事件，很奇怪
    let top = event.nativeEvent.contentOffset.y
    console.log(top)
    if (this.scrollAbleStatus) { //仅监听外层滚动事件
      if (this.showsVerticalScrollIndicatorStatus) {
        this.props.navigation.setParams({
          headerRightComponents:
            <ResetHeaderRight />
        })
      }

      if (top >= 120) {
      this.disableScrollAbleStatus()
        this.props.navigation.setParams({
          headerRightComponents:
            <TouchableOpacity onPress={this._resetListIndex}>
              <HeaderRightRefresh />
            </TouchableOpacity>
        })
      }
    }
  }

  _watchInsideScroll({ nativeEvent: { contentOffset: { x, y } } }) {
    // let top = event.nativeEvent.contentOffset.y
    /* if (top === 0) {
      this.disableInsideScrollAbleStatus()
      this.enableScrollAbleStatus()
    } */
    /* console.log("offset : x=", x, "y=", y); */
    }

  _resetListIndex() {
    this.enableScrollAbleStatus()
    this._wrapper && this._wrapper.scrollTo({ x: 0, y: 0})
    this._list && this._list.scrollTo({ x: 0, y: 0 }, false)
    this._list1 && this._list1.scrollTo({ x: 0, y: 0 }, false)
    this._list2 && this._list2.scrollTo({ x: 0, y: 0 }, false)
  }

  _tabChange(obj) {
    console.log(obj.i)
    this._wrapper && this._wrapper.scrollTo({ x: 0, y: 120 })
    this.disableScrollAbleStatus()
    this.props.navigation.setParams({
      headerRightComponents:
        <TouchableOpacity onPress={this._resetListIndex}>
          <HeaderRightRefresh />
        </TouchableOpacity>
    })
  }
  render() {
    console.log(this._nativeOffset.y)
    return (
      <View style={styles.container}>
        <ScrollView 
        ref={ref => (this._wrapper = ref)}
        bounces={false}
        scrollEnabled={this.scrollAbleStatus} 
        showsVerticalScrollIndicator={this.showsVerticalScrollIndicatorStatus} 
        /* stickyHeaderIndices={[1]} */
        onScroll = {this._watchScroll}
        >
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
              heightForIndexPath={() => 185}
              renderIndexPath={this._renderIndexPath}
              refreshHeader={ChineseWithLastDateHeader}
              scrollEnabled={!this.scrollAbleStatus}
              onNativeContentOffsetExtract={this._nativeOffset}
              showsVerticalScrollIndicator={!this.showsVerticalScrollIndicatorStatus}
              ref={ref => (this._list = ref)}
              onRefresh={() => {
                setTimeout(() => {
                  this._list.endRefresh();
                  // setTimeout(() => this.setState({ prop: "your changed props" }));
                }, 2000);
              }}
              loadingFooter={ChineseWithLastDateFooter}
              onLoading={()=>{
                setTimeout(()=>{
                  this._list.endLoading();
                },2000);
              }}
              />
            <LargeList
              tabLabel='优选'
              data={data}
              style={{flex:1}}
              heightForIndexPath={() => 185}
              renderIndexPath={this._renderIndexPath}
              refreshHeader={ChineseWithLastDateHeader}
              showsVerticalScrollIndicator={!this.showsVerticalScrollIndicatorStatus}
              ref={ref => (this._list1 = ref)}
              onRefresh={() => {
                setTimeout(() => {
                  this._list1.endRefresh();
                  // setTimeout(() => this.setState({ prop: "your changed props" }));
                }, 2000);
              }}
              loadingFooter={ChineseWithLastDateFooter}
              onLoading={()=>{
                setTimeout(()=>{
                  this._list1.endLoading();
                },2000);
              }}
              />
            <LargeList
              tabLabel='淘单'
              data={data}
              style={{flex:1}}
              heightForIndexPath={() => 185}
              renderIndexPath={this._renderIndexPath}
              refreshHeader={ChineseWithLastDateHeader}
              showsVerticalScrollIndicator={!this.showsVerticalScrollIndicatorStatus}
              ref={ref => (this._list2 = ref)}
              onRefresh={() => {
                setTimeout(() => {
                  this._list2.endRefresh();
                  // setTimeout(() => this.setState({ prop: "your changed props" }));
                }, 2000);
              }}
              loadingFooter={ChineseWithLastDateFooter}
              onLoading={()=>{
                setTimeout(()=>{
                  this._list2.endLoading();
                },2000);
              }}
              />
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
        </ScrollView>
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
    /* flex: 1, */
    height: height - headerHeight - BottomTabBarHeight, 
    position: 'relative', 
  },
  topNavBox: {
    height: 44,
    borderWidth: 0
  },
  topNavItem: {
    backgroundColor: '#f4f5f7'
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
  },
  itemLine: {
    width: width,
    height: px2dp(10),
    backgroundColor: '#f4f5f7'
  }
})