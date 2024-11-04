import { useState } from 'react'
import { View , Text} from '@tarojs/components'
import './noticeDetail.scss'

export default function NoticeDetail() {
  const [notice, setNotice] = useState<NoticeItem>({
    pkId: 1,
    title: '资源分享应用维护',
    content: '<p>资源分享应用维护</p>',
    adminId: 1,
    isTop: 1,
    createTime: '2024-01-01',
    adminName: 'admin',
  })

  return (
    <View className='noticeLayout' style={{ display: notice ? 'block' : 'none' }} >
      <View className='title'>
        <View className='tag'>
          {notice.isTop === 1 && <Text className='isTop'>置顶</Text>}
        </View>
        <Text className='font'>{notice.title}</Text>
      </View>

      <View className='info'>
        <Text className='item'>{notice.adminName}</Text>
        <Text className='item'>{notice.createTime}</Text>
      </View>

      <View className='content'>
        <View dangerouslySetInnerHTML={{ __html: notice.content }} />
      </View>
    </View>
  )
}
