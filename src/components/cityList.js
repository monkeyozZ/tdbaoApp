import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native'
import { withNavigation } from 'react-navigation';
import { LargeList, NativeLargeList } from "react-native-largelist-v3";
import PropTypes from 'prop-types';
import { px2dp } from '../utils/px2dp'
import data from '../static/city.json'
import icons from '../icon'
const { width, height } = Dimensions.get('window')
import { observer } from 'mobx-react'
import { computed, action } from 'mobx'

let totalHeight = []
let BaiduMap_URL = 'http://api.map.baidu.com/geocoder/v2/?output=json&pois=1&latest_admin=1&ak=0NwnbYy5KtXmfKU2tw258DK69Wip0Xkg&location='

@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
class CityList extends Component {
  constructor(props) {
    super(props);
    this.props.onRef && this.props.onRef(this)
    this._showletterItem = this._showletterItem.bind(this)
    /* this.state = {
      city: this.props.rootStore.cityStore.cityName
    } */
  }
  
  static propTypes = {
    showLetterView: PropTypes.func.isRequired,
  }

  @computed get cityName() {
    return this.props.cityStore.cityName
  }
  componentWillReact() {
    // console.log(`render${this.city}`)
  }

  _caculater() {
    for (let i = 0; i < data.length; i++) {
      var eachheight = 26 + 40 * data[i].items.length
      totalHeight.push(eachheight)
    }
  }
  componentWillMount() {
    this._caculater()
  }
  componentDidMount() {
    this.getCityLocation()
      .then(res => {
        console.log('获取当前位置', res);
        this._confirmCity(res);
      })
      .catch(err => {
        console.log('获取失败' + err);
      });
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.cityStore.cityName, this.cityName, nextProps)
    if (this.props.cityStore.cityName === this.cityName) {
      return false
    }
    return true
  }
  _setCity = (val) => {
    this.props.cityStore.updateCity(val)
    this.props.navigation.navigate('Home')
  }
  render() {
    console.log(`store${this.props.cityStore.cityName}`)
    const List = this.props.native ? NativeLargeList : LargeList;
    return (
      <View style={{ flex: 1 }}>
        <List
          style={styles.container}
          data={data}
          heightForSection={() => 26}
          renderSection={this._renderSection}
          heightForIndexPath={() => 40}
          renderIndexPath={this._renderIndexPath}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          ref={ref => (this._scrollView = ref)}
        />
      </View>
    );
  }
  _renderSection = (section) => {
    return (
      <View style={styles.section}>
        <Text>
          {data[section].title}
        </Text>
      </View>
    );
  };

  _renderIndexPath = ({ section: section, row: row }) => {
    return (
      <TouchableOpacity style={styles.touch} activeOpacity={0.85} onPress={this._setCity.bind(this, data[section].items[row].name)}>
        <View style={styles.row}>
          <Text>
            {data[section].items[row].name}
          </Text>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  };

  _renderHeader = () => {
    return (
      <View style={styles.headerBox}>
        <Text style={{ color: '#999999' }}>当前城市</Text>
        <View style={styles.currentCity}>
          <View style={styles.iconBox}>
            <Image source={icons.address} style={styles.icon} />
          </View>
          <View style={styles.text_box}>
            <Text style={styles.text}>{this.cityName}</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={{ paddingVertical: 2 }}></View>
    );
  };

  _renderLetters(letter, index) {
    return (
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
    )
  }
  _showletterItem(val, index) {
    let position = 84
    for (let i = 0; i < index; i++) {
      position += totalHeight[i]
    }
    console.log(val, index)
    this._scrollView && this._scrollView.scrollTo({ x: 0, y: position }, false).then(() => {
      /* this.props.showLetterView(val) */
      setTimeout(() => {
        this.props.showLetterView(val)
      }, 0);
    })
  }
  //获取经纬度
  getLongitudeAndLatitude = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        error => {
          reject(error);
        }
      );
    });
  };

  //逆地址解析定位当前城市
  getNetData = url => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(responseData => {
          resolve(responseData);
        })
        .catch(error => {
          reject(error);
        })
        .done();
    });
  };

  //获取城市定位信息
  getCityLocation = () => {
    return new Promise((resolve, reject) => {
      this.getLongitudeAndLatitude()
        //获取经纬度的方法返回的是经纬度组成的数组
        .then(locationArr => {
          let longitude = locationArr[0];
          let latitude = locationArr[1];
          this.getNetData(BaiduMap_URL + latitude + ',' + longitude)
            .then(data => {
              if (data.status == 0) {
                resolve(data);
              } else {
                reject(data.code);
              }
            })
            .catch(data => {
              reject(data.code);
            });
        })
        .catch(data => {
          reject(data.code);
        });
    });
  };

  //弹出定位框
  _confirmCity(data) {
    let address = data.result.addressComponent;

    if (address != '') {
      Alert.alert(
        ``,
        `当前定位城市为${address.city},\n\n是否设为当前城市？\n`,
        [
          {
            text: '取消',
            onPress: () => { },
          },
          {
            text: '确定',
            onPress: () => {
              this.props.cityStore.updateCity(address.city)
              // console.log(this.props.rootStore.cityStore.cityName, )
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }

  @action
  updateCity(val) {
    this.city = val
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
    height: 33,
    paddingHorizontal:15,
    backgroundColor: '#EEEEEE',
    alignItems: "center",
    justifyContent: "center",
    color: '#333333',
    marginVertical: 8,
  },
  iconBox: {
    marginRight: 8,
  },
  icon: {
    width: px2dp(12),
    height: px2dp(16)
  },
  text_box: {
    minWidth: 80,
  },
  text_box: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    flex: 1,
    backgroundColor: "#979797",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
    marginRight: 30,
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
  touch: {
    backgroundColor: '#FFF'
  }
});

export default withNavigation(CityList)