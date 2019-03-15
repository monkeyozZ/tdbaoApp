import cityStore from './modules/city'
import homeStore from './modules/home'
import filterStore from './modules/filter'

/**
 * 根store
 * @class RootStore
 * cityStore 为城市选择页面的数据
 */
class RootStore {
  constructor() {
    this.cityStore = new cityStore(this);
    this.homeStore = new homeStore(this);
    this.filterStore = new filterStore(this);
  }
}

// 返回RootStore实例
export default new RootStore();