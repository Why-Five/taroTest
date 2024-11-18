import { useAppDispatch, useAppSelector } from '@/store'
import { Text , View , Image , Picker, RadioGroup , Label, Radio, Button, Input } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtModal, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import { setUserInfo } from '@/store/modules/user'
import './userInfo.scss'


export default function UserInfo() {
  const userInfo = useAppSelector(state => state.user.userInfo)
  const dispatch = useAppDispatch()

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


  const [isOpenUserName, setIsOpenUserName] = useState(false)
  const [nickname , setNickname] = useState('')
  const onChangeNickname = () => {
    setNickname(myUserInfo.nickname)
    setIsOpenUserName(true)
  }
  const closePopup = () => {
    setIsOpenUserName(false)
  }
  const submitNickName = () => {
    setMyUserInfo((prev) => ({ ...prev, nickname: nickname }))
    setIsOpenUserName(false)
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
    Taro.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        const { tempFiles } = res
        const tempFilePath = tempFiles[0].tempFilePath
        console.log(tempFilePath, 'tempFilePath')
        Taro.uploadFile({
          url: 'https://106.14.107.37:8080/share-app-api/common/upload',
          filePath: tempFilePath,
          name: 'file',
          header: {
            'Authorization':Taro.getStorageSync('token')
          },
          success: (fileRes) => {
            const url = JSON.parse(fileRes.data).data
            setMyUserInfo((prev) => ({ ...prev, avatar: url }))
            dispatch(setUserInfo({ ...userInfo, avatar: url }))
            Taro.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: (err) => {
            console.log(err)
            Taro.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }

    })
  }
  const handleSubmit = () => {
    console.log(myUserInfo,'myUserInfo')
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
              <Text className='txt' onClick={onChangeNickname}>{myUserInfo.nickname}</Text>
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

      <AtModal className='nikeNamePopup' isOpened={isOpenUserName}>
        <View className='container'>
          <View className='popHeader'>
            <View></View>
            <View className='title'>修改用户昵称</View>
            <View className='close' onClick={closePopup}>
              <AtIcon value='close' color='#999' size='18' />
            </View>
          </View>

          <View className='content'>
            <Input
              className='input'
              type='text'
              placeholder='请输入昵称'
              value={nickname}
              onInput={(e) => setNickname(e.detail.value)}
            />
          </View>

          <View className='footer'>
            <Button className='submit-btn' onClick={submitNickName} size='mini' plain>
              确定修改昵称
            </Button>
          </View>
        </View>
      </AtModal>
    </View>
  )
}
