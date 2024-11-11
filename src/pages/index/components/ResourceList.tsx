import { ScrollView, View } from "@tarojs/components";
import { useState } from "react";
import './resourceList.scss'

const ResourceList = () => {
  const [pageParams, setPageParams] = useState({
    resType: 1,
  });

  const selectList = [
    {
      pkId: 1,
      title: '动漫区',
    },
    {
      pkId: 2,
      title: '学习区',
    },
    {
      pkId: 3,
      title: '摄影区',
    },
    {
      pkId: 4,
      title: '全栈区',
    },
  ];
  return (
    <View className='resourceList'>
      <ScrollView scrollX className='scroll-view' scrollWithAnimation>
        {selectList.map(item => (
          <View
            key={item.pkId}
            className={`scroll-view-item ${pageParams.resType === item.pkId ? 'active' : ''}`}
            onClick={() => setPageParams({resType : item.pkId})}
          >
            {item.title}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ResourceList;
