import { observable, computed, action } from 'mobx';
export default class cityStore {
  @observable cityName = '上海';
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action.bound
  updateCity(name) {
    this.cityName = name
  }

  @computed get currentCityName() {
    return this.cityName;
  }
}