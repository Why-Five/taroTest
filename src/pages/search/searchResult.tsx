import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import './searchResult.scss'



const SearchResult = () => {

  let query;
  useLoad((options) => {
    query = options;
  });

  return (
    <View className='searchResult'>
      {JSON.stringify(query)}
    </View>
  );
}
export default SearchResult;
