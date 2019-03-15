import { observable, computed, action } from 'mobx';
export default class cityStore {
  @observable pageIndex = 0;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action.bound
  updatePageIndex(n) {
    this.pageIndex = n
  }

}