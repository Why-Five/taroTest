import { View } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import { useEffect, useState } from "react";
import { getTagsList } from "@/service/contribute";
import './search.scss'



export default function Search() {

  const [queryParams, setQueryParams] = useState({
    keyword: '',
    tagId: 0,
  });

  const handleClear = () => {
    console.log('Clearing...');
    setQueryParams({
      keyword: '',
      tagId: 0,
    });
  };

  const handleConfirm = () => {
    console.log('Searching for...',queryParams);
  }

  const [tagList, setTagList] = useState<Tag[]>([]);

  const getTagListFun = async () => {
    const res = await getTagsList();
    const arr = res.data.filter((item) => {
      return item.isHot === 1
    });
    setTagList(arr);
  };

  useEffect(() => {
    getTagListFun();
  },[])

  const clickTag = (item: Tag) => {
    setQueryParams({ ...queryParams, tagId: item.pkId })
  };


  return (
    <View className='searchLayout'>
      <View className='search>'>
        <AtSearchBar
          fixed
          actionName='搜一下'
          placeholder='请输入你想要搜索的资源'
          value={queryParams.keyword}
          onConfirm={handleConfirm}
          onActionClick={handleConfirm}
          onClear={handleClear}
          onChange={(e)=>setQueryParams({...queryParams, keyword: e})}
        />
      </View>
      <View className='history'>
        {tagList.length > 0 && (
          <>
            <View className='topTitle'>
              <View className='text'>热门标签</View>
            </View>
            <View className='tabs'>
              {tagList.map((tag) => (
                <View
                  key={tag.pkId}
                  className='tab'
                  onClick={() => clickTag(tag)}
                >
                  {tag.title}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
