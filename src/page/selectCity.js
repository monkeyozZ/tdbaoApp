import React, { Component } from 'react'
import { View } from 'react-native'
import LetterView from '../components/letter'
import CityList from '../components/cityList'
import LetterList from '../components/letterList'
import ResetHeaderRight from '../components/resetHeaderRight'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('rootStore') // 缓存rootStore,也就是在main.js注入的
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class SelectCity extends Component {
  constructor(props) {
    super(props);
    this.showLetterView = this.showLetterView.bind(this)
    this.hideLetterView = this.hideLetterView.bind(this)
    this.state = {
      letterItem: '',
      showLetterItem: false
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "选择城市",
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
      headerTintColor: "#333333",
      headerRight: <ResetHeaderRight />
    }
  }

  @computed get cityStore() {
    const { rootStore } = this.props;
    const { cityStore } = rootStore;
    return cityStore;
  }

  showLetterView(val) {
    this.setState({ letterItem: val, showLetterItem: true })
  }

  hideLetterView() {
    this.setState({ letterItem: '', showLetterItem: false })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CityList showLetterView={this.showLetterView} cityStore={this.cityStore} onRef={(ref) => {this.citylist = ref;}}/>
        <LetterList
        showletterItem={
          (val, index) => {
            this.citylist._showletterItem && this.citylist._showletterItem(val, index)
          }
        }
        hideLetterView= {this.hideLetterView}
        />
        <LetterView showLetterItem={this.state.showLetterItem} letterItem={this.state.letterItem}/>
      </View>
    );
  }
}
