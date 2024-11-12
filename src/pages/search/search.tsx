import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon, AtSearchBar } from "taro-ui";
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

  const [historySearch,setHistorySearch] = useState<string[]>(Taro.getStorageSync('historySearch')||['视频','项目']);

  const removeHistory = () => {
    Taro.showModal({
      title: '确定清除历史搜索记录？',
      success: (res) => {
        if (res.confirm) {
          Taro.removeStorageSync('historySearch');
          setHistorySearch([]);
        }
      },
    });
  };

  const clickHistoryTab = (tab: string) => {
    setQueryParams({ ...queryParams, keyword: tab });
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
      <View className='history'>
              {historySearch.length > 0 && (
                <>
                  <View className='topTitle'>
                    <View className='text'>最近搜索</View>
                    <View className='icon' onClick={removeHistory}>
                      <AtIcon value='trash' size='25' />
              </View>
              </View>
                    <View className='tabs'>
                      {historySearch.map((tab) => (
                        <View
                          key={tab}
                          className='tab'
                          onClick={() => clickHistoryTab(tab)}
                        >
                        {tab}
                        </View>
                      ))}
                    </View>
            </>
          )}
      </View>
    </View>
  );
}
