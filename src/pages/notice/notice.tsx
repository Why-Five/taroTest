import { View, Text, RichText , Navigator } from '@tarojs/components';
import { useState } from 'react';
import './notice.scss';

const Notice = () => {
  const [noticeList, setNoticeList] = useState<IndexNotice>({
    list: [
      {
        pkId: 1,
        createTime: '2024-01-01',
        title: '资源分享应用维护',
        content: '<p>资源分享应用维护</p>',
        adminId: 1,
        isTop: 0,
        adminName: 'admin',
      },
      {
        pkId: 2,
        createTime: '2024-01-01',
        title: '资源分享应用关闭',
        content: '<p>资源分享应用关闭</p>',
        adminId: 1,
        isTop: 0,
        adminName: 'admin',
      }
    ],
    total: 0,
  });
return (
  <View className='noticePage'>
    {noticeList.list.map((item) => (
      <View className='item-card' key={item.pkId}>
        <View className='time'>{item.createTime}</View>
        <View className='content-card'>
          <View className='top'>
            <View className='tips'>{item.title}</View>
            <RichText className='content' nodes={item.content} />
          </View>
          <View className='bottom'>
            <Navigator
              url={`/pages/noticeDetail/noticeDetail?id=${item.pkId}`}
              className='more'
            >
              查看详情 &gt;
            </Navigator>
          </View>
        </View>
      </View>
))}
    <View className='loading-text'>没有更多数据</View>
  </View>
);
};

export default Notice;
