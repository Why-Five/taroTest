import { View } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import { useState } from "react";
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
    </View>
  );
}
