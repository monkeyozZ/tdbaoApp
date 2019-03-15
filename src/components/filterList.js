import React, { Component } from 'react'
import Picker from 'react-native-picker'
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text ,FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import { observer } from 'mobx-react'
import { observable, computed, action } from 'mobx';

@observer
export default class FilterList extends Component{
  constructor(props) {
    super(props)
  };

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    // console.log(this.props.filterStore)
  }

  @computed get dataSource() {
    return this.props.filterStore.list.slice();
  }

  _showMoneyPicker(index) {
    let data = ['哈哈', '嘿嘿', '嚯嚯', '嘻嘻']
    Picker.init({
      pickerData: data,
      pickerTitleText: '请选择',
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerBg: [255, 255, 255, 1],
      selectedValue: [59],
      onPickerConfirm: data => {
        console.log(data);
        // this.list[index].label = data[1]
        this.props.filterStore.updateListItem(index, data[0])
        this.props.filterStore.updateList(this.props.filterStore.list.slice())
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      }
    });
    Picker.show()
  }


  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => (
    <ListItem
      title={item.placehoder}
      titleStyle={styles.itemTitle}
      /* containerStyle={styles.itemBox} */
      bottomDivider={true}
      leftElement={<Text style={styles.labelStyle}>{item.label}</Text>}
      rightIcon={<Icon name={'angle-right'} size={20} />}
      onPress={() => this._showMoneyPicker(index)}
    />
  )

  renderFooter = () => {
    return (
      <View style={styles.listFooter}></View>
    )
  }

  render() {
    return (
      <View style={styles.formBox}>
        <FlatList
          style={styles.formBox}
          keyExtractor={this.keyExtractor}
          data={this.dataSource}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
        />
        <View style={styles.formFooter}>
          <View style={styles.formFooterItem}>
            <Button
              title="重置"
              buttonStyle={[styles.btnResetColor, styles.borderRadius0]}
              containerStyle={styles.btnReset}
            />
          </View>
          <View style={styles.formFooterItem}>
            <Button
              title="确定"
              buttonStyle={styles.borderRadius0}
              containerStyle={styles.btnConfirm}
              onPress={this.props.closeModal}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formBox: {
    flex: 1,
  },
  Picker: {
    flex: 1,
    height: 44
  },
  labelStyle: {
    color: '#333',
    fontSize: 16
  },
  itemTitle: {
    textAlign: 'right'
  },
  itemBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  listFooter: {
    height: 10
  },
  formFooter: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formFooterItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnResetColor: {
    backgroundColor: 'red',
  },
  borderRadius0: {
    borderRadius: 0,
    borderColor: 'transparent'
  },
  btnReset: {
    flex: 1,
    height: 40,
  },
  btnConfirm: {
    flex: 1,
    height: 40,
  }
})