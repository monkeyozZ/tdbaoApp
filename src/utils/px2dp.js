import { Dimensions } from 'react-native'

const deviceW = Dimensions.get('window').width
const basePx = 375

export const px2dp = (px) => {
  return px * deviceW / basePx
}