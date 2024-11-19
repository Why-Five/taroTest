import ResourceActionInfo from "@/components/resourceActionInfo/resourceActionInfo";
import ResourceBonusInfo from "@/components/resourceBonusInfo/resourceBonusInfo";
import { useAppSelector } from "@/store";
import { View , Text, ScrollView} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import './bonus.scss'

export default function Bonus() {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
    type: 1,
  })

  const [bonusData, setBonusData] = useState<UserScoreReturn>({
    list: [
      {
        pkId: 1,
        content: '签到',
        createTime: '2024-01-01',
        bonus:10,
      }
    ],
    total: 0,
  })
  const [resourceData,setResourceData]= useState<UserResourceReturn>({
    list: [],
    total: 0,
  })
  const handleSelectClick = (type: number) => {
    setPageParams((prev) => ({
      ...prev,
      type,
    }))
  }
  const userInfo = useAppSelector((state)=>state.user.userInfo)
  return (
    <View className='scorePage'>
      <View className='myScore'>
        <View className='header'>
          <View className='bonus'>
            {userInfo.bonus}
            <Text className='txt'>分</Text>
          </View>
          <View className='btn' onClick={()=>Taro.showToast({title:'刷新成功',icon:'success',duration:1000})}>
            刷新积分
          </View>
        </View>
        <View className='tips'>可以积分</View>
      </View>
      <View className='infoCard'>
          <View className='header'>
            <View
              className={`select ${pageParams.type === 1 ? 'active' : ''}`}
              onClick={() => handleSelectClick(1)}
            >
              积分收支明细
            </View>
            <View
              className={`select ${pageParams.type === 2 ? 'active' : ''}`}
              onClick={() => handleSelectClick(2)}
            >
              积分兑换记录
            </View>
        </View>
        {pageParams.type === 1 ? (
          <ScrollView
            scrollY
            enableBackToTop
            className='scrollView'
          >
            {bonusData.list.map((item) => (
              <ResourceBonusInfo key={item.pkId} info={item} />
            ))}
          </ScrollView>
        ) : (
            <ScrollView className='exchangeList' scrollY>
              {resourceData.list.map((item) => (
                <ResourceActionInfo key={item.pkId} info={item} />
              ))}
          </ScrollView>
        )}

        </View>
    </View>
  )
}
