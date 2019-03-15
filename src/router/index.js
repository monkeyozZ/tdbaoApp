import { createStackNavigator, createBottomTabNavigator, Header, createAppContainer  } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import React from 'react'
import { Image, Platform, StatusBar } from 'react-native';
import { px2dp } from '../utils/px2dp'
import HomeScreen from '../page/home'
import CustomerScreen from '../page/customer'
import OwnScreen from '../page/own'
import SelectCityScreen from '../page/selectCity'
import icons from '../icon'

const TabNavigationList = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(
        { Home: HomeScreen },
        {
          defaultNavigationOptions: {
            headerStyle: {
              ...Platform.OS === 'android' && {
                height: StatusBar.currentHeight + Header.HEIGHT,
                paddingTop: StatusBar.currentHeight,
                borderBottomWidth: 0.5,
                borderBottomColor: "#CACACB",
                elevation: 0
              }
            }
          }
        }
      ),
      navigationOptions: ({ navigation }) => {
        /* var visible = true
        if (navigation.state.index > 0) {
          visible = false
        } */
        return {
          tabBarLabel: '抢单',
          // tabBarVisible: visible
        }
      }
    },
    Customer: {
      screen: createStackNavigator(
        { Customer: CustomerScreen },
        {
          defaultNavigationOptions: {
            headerStyle: {
              ...Platform.OS === 'android' && {
                height: StatusBar.currentHeight + Header.HEIGHT,
                paddingTop: StatusBar.currentHeight,
                borderBottomWidth: 0.5,
                borderBottomColor: "#CACACB",
                elevation: 0
              }
            }
          }
        }
      ),
      navigationOptions: {
        tabBarLabel: '客户',
      }
    },
    Own: {
      screen: createStackNavigator(
        { Own: OwnScreen },
        {
          defaultNavigationOptions: {
            headerStyle: {
              ...Platform.OS === 'android' && {
                height: StatusBar.currentHeight + Header.HEIGHT,
                paddingTop: StatusBar.currentHeight,
                borderBottomWidth: 0.5,
                borderBottomColor: "#CACACB",
                elevation: 0
              }
            }
          }
        }
      ),
      navigationOptions: {
        tabBarLabel: '我的',
      }
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon;
        if (routeName === 'Home') {
          icon = focused ? icons.orderActive : icons.order
          return <Image source={icon} style={{ width: px2dp(16), height: px2dp(20) }} />
        } else if (routeName === 'Customer') {
          icon = focused ? icons.customerActive : icons.customer
          return <Image source={icon} style={{ width: px2dp(16), height: px2dp(20) }} />
        } else if (routeName === 'Own') {
          icon = focused ? icons.ownActive : icons.own
          return <Image source={icon} style={{ width: px2dp(20), height: px2dp(20) }} />
        }

      }
    })
  }
)
TabNavigationList.navigationOptions = {
  header: null
};

const AppNavigator = createStackNavigator(
  {
    Tab: { 
      screen: TabNavigationList,
    },
    SelectCity: { 
      screen: SelectCityScreen,
    }
  },
  {
    mode: 'card',
    defaultNavigationOptions: {
      headerStyle: {
        ...Platform.OS === 'android' && {
          height: StatusBar.currentHeight + Header.HEIGHT,
          paddingTop: StatusBar.currentHeight,
          borderBottomWidth: 0.5,
          borderBottomColor: "#CACACB",
          elevation: 0
        }
      }
    },
    transitionConfig: () => ({
      // 统一安卓和苹果页面跳转的动画
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    })
  }
)

export default createAppContainer(AppNavigator);