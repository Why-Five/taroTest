import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import './searchResult.scss'

type IndexResourceReturnType = {
  list: IndexResourceType[]
  total: number
}


const SearchResult = () => {

  const [queryParams, setQueryParams] = useState({
    keyword: '',
    tagId: 0,
    diskType: 0,
    page: 1,
    limit: 10
  });

  useLoad((options) => {
    for (const key in options) {
      queryParams[key] = options[key];
    }
    setQueryParams({ ...queryParams });
  });

  const [dataList, setDataList] = useState<IndexResourceReturnType>({
    list: [],
    total: 0
  });

  const [finish, setFinish] = useState(false);
  const [isNoData, setIsNoData] = useState(false);


  return (
    <View className='searchResult'>
      {JSON.stringify(queryParams)}
    </View>
  );
};
export default SearchResult;
