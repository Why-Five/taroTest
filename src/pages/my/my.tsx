import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppSelector } from 'src/store';
import { AtButton, AtList, AtListItem } from 'taro-ui';

export default function My() {
  // 获取Redux中用户数据
  const user = useAppSelector((state) => state.user.userInfo);

  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/login/login' });
  };
  return (
    <View>
      <View>用户信息:{JSON.stringify(user)}</View>
      <AtButton type="primary">清理用户信息</AtButton>
      <AtList>
        <AtListItem title="去登录" onClick={handleClick} arrow="right" />
      </AtList>
    </View>
  );
}
