import { useAppSelector } from '@/store'
import { Text , View , Image , Picker, RadioGroup , Label, Radio, Button} from '@tarojs/components'
import { useEffect, useState } from 'react'
import './userInfo.scss'

export default function UserInfo() {
  const userInfo = useAppSelector(state => state.user.userInfo)

  const [myUserInfo, setMyUserInfo] = useState({
    pkId: 0,
    nickname: '',
    avatar: '',
    gender: 0,
    birthday:'',
  })

  useEffect(() => {
    setMyUserInfo({
      ...myUserInfo,
      nickname: userInfo.nickname || '',
      avatar: userInfo.avatar || '',
      gender: userInfo.gender || 0,
      birthday: userInfo.birthday || ''
    })
  }, [userInfo])

  const onChangeNickname = () => {
  }

  const onGenderChange = (ev) => {
    const { value } = ev.detail
    setMyUserInfo((prev) =>({...prev,gender:value}))
   }

  const onBirthdayChange = (ev) => {
    const { value } = ev.detail
    setMyUserInfo((prev) =>({...prev,birthday:value}))
  }

  const onAvatarChange = () => {
  }
  const handleSubmit = () => {
  }

  return (
    <View className='userInfoPage'>
      <View className='user-info'>
        <View className='avatar'>
          <View className='row'>
            <View className='left'>头像</View>
            <View className='right' onClick={onAvatarChange}>
              <View className='img'>
                <Image src={myUserInfo.avatar} mode='aspectFill' />
              </View>
              <View className='icon'> {/**右箭头图标 */}   </View>
            </View>
          </View>
        </View>

        <View className='nickname'>
          <View className='row'>
            <View className='left'>昵称</View>
            <View className='right'>
              <Text className='txt'>{myUserInfo.nickname}</Text>
              <View className='icon' onClick={onChangeNickname}> {/**右箭头图标 */}   </View>
            </View>
          </View>
        </View>

        <View className='birthday'>
          <View className='row'>
            <View className='left'>生日</View>
            <View className='right'>
              <Picker
                className='picker'
                mode='date'
                value={myUserInfo.birthday}
                start='1900-01-01'
                end={new Date().toISOString().split('T')[0]}
                onChange={onBirthdayChange}
              >
              <View>{myUserInfo.birthday}</View>
              </Picker>
            </View>
          </View>
        </View>


        <View className='sex'>
          <View className='row'>
            <View className='left'>性别</View>
            <View className='right'>
              <RadioGroup onChange={onGenderChange}>
                <Label className='radio'>
                  <Radio value='0' color='#1296db' checked={myUserInfo.gender === 0} />男
                </Label>
                <Label className='radio'>
                  <Radio value='1' color='#1296db' checked={myUserInfo.gender === 1} />女
                </Label>
              </RadioGroup>
            </View>
          </View>
        </View>

        <Button className='button' onClick={handleSubmit}>保存</Button>

      </View>
    </View>
  )
}
