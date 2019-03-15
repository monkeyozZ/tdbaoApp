import { observable, computed, action } from 'mobx';
export default class filterStore {
  @observable list = [
    {
      label: '城市',
      placehoder: '不限'
    },
    {
      label: '借款额度',
      placehoder: '不限'
    },
    {
      label: '年龄区间',
      placehoder: '不限'
    },
    {
      label: '客户类型',
      placehoder: '不限'
    },
    {
      label: '是否有房',
      placehoder: '不限'
    },
    {
      label: '是否有车',
      placehoder: '不限'
    }
  ];
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action.bound
  updateListItem(index, val) {
    console.log(val)
    this.list[index].placehoder = val
  }
  @action.bound
  updateList(arr) {
    // console.log(val)
    this.list = arr
  }

}