import { ScrollView, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getCategoryList } from "@/service/contribute";
import './resourceList.scss'
// const ResourceList = () => {
//   const [pageParams, setPageParams] = useState({
//     resType: 1,
//   });

//   const selectList = [
//     {
//       pkId: 1,
//       title: '动漫区',
//     },
//     {
//       pkId: 2,
//       title: '学习区',
//     },
//     {
//       pkId: 3,
//       title: '摄影区',
//     },
//     {
//       pkId: 4,
//       title: '全栈区',
//     },
//   ];
//   return (
//     <View className='resourceList'>
//       <ScrollView scrollX className='scroll-view' scrollWithAnimation>
//         {selectList.map(item => (
//           <View
//             key={item.pkId}
//             className={`scroll-view-item ${pageParams.resType === item.pkId ? 'active' : ''}`}
//             onClick={() => setPageParams({resType : item.pkId})}
//           >
//             {item.title}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };
const ResourceList = () => {
  const [pageParams, setPageParams] = useState({ resType: 0 });
  const [selectList, setSelectList] = useState<CategoryType[]>([]);

  const getIndexCategoryListData = async () => {
    const res = await getCategoryList();
    if (res.code === 0) {
      const filteredList = res.data.filter(item => item.type === 1).slice(0, 8);
      setSelectList([{ title: '推荐', pkId: 0, type: 0 }, ...filteredList]);
    }
  };

  useEffect(() => {
    getIndexCategoryListData();
  }, []);

  const handleSelectChange = (pkId) => {
    setPageParams({ resType: pkId });
  };

  return (
    <View className='resourceList'>
      <ScrollView scrollX className='scroll-view' scrollWithAnimation>
        {selectList.map(item => (
          <View
            key={item.pkId}
            className={`scroll-view-item ${pageParams.resType === item.pkId ? 'active' : ''}`}
            onClick={() => handleSelectChange(item.pkId)}
          >
            {item.title}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
export default ResourceList;
