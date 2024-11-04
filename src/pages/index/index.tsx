import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import 'taro-ui/dist/style/index.scss';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.scss';
import Navbar from './components/CustomNavbar';

export default function Index() {
  return (
    <View className='index'>
      <Navbar />
    </View>
  );
}
