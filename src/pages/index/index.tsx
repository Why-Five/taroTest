import { View, Text, SwiperItem} from '@tarojs/components';
import { useEffect, useState } from 'react';
import { getIndexNotice, getNoticeSwiper } from '@/service/notice';
import 'taro-ui/dist/style/index.scss';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.scss';
import Navbar from './components/CustomNavbar';
import Notice from './components/Notice';
import Swiper from './components/Swiper';
import Panel from './components/Panel';


export default function Index() {
  const [noticeList, setNoticeList] = useState<SwiperItem[]>([]);
  const [swiper, setSwiper] = useState<SwiperItem[]>([]);

  const getIndexNoticeFunction = async () => {
    const res = await getIndexNotice();
    if (res.code === 0) {
      setNoticeList(res.data);
    }
  };

  const getSwiperFunction = async () => {
    const res = await getNoticeSwiper();
    if (res.code === 0) {
      setSwiper(res.data);
    }
  };

  useEffect(() => {
    getIndexNoticeFunction()
    getSwiperFunction()
  },[])
  return (
    <View className='index'>
      <Navbar />
      <Notice noticeList={noticeList} />
      <Swiper swiperList={swiper} />
      <Panel />
    </View>
  );
}
