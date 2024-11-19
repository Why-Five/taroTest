import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Input, View ,Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useSendCode } from "@/composables/useSendCode";
import { useState } from "react";
import { isPhoneAvailable } from "@/utils/validate";
import { clearUserInfo } from "@/store/modules/user";
import { AtIcon, AtModal } from "taro-ui";
import { updateUserPhone } from "@/service/user";
import './setting.scss'

export default function Setting() {
  const {phoneForm,count,timer,sendPhoneCode} = useSendCode();
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const dispatch = useAppDispatch()
  const [isOpenPhone , setIsOpenPhone] = useState(false)
  const handleOpen = () => {
    setIsOpenPhone(true)
  }
  const handleClose = () => {
    setIsOpenPhone(false)
  }
  const handleClick = async () => {
    if (!phoneForm.phone || !isPhoneAvailable(phoneForm.phone)) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      });
      return;
    }
    if (!phoneForm.code || !isPhoneAvailable(phoneForm.code)) {
      Taro.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
      });
      return;
    }

    const res = await updateUserPhone(phoneForm.phone, phoneForm.code)
    if (res.code === 0) {
      Taro.showToast({
        title: '操作成功',
        icon: 'success',
      })
      handleClose()
      dispatch(clearUserInfo({}))
      Taro.reLaunch({
        url:'/pages/login/login',
      })
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      })
      return
    }
  }
  const [localPhoneForm, setLocalPhoneForm] = useState({ phone: '', code: '' });
  return (

    <>
      <View className='setting'>
        {userInfo && (
          <View className='list'>
            <Button
              className='item arrow'
              onClick={() => Taro.navigateTo({ url: '/pageUser/userInfo/userInfo' })}
            >
              个人资料
            </Button>
            <Button className='item arrow' onClick={handleOpen}>
              绑定手机号
            </Button>
          </View>
        )}

        <View className='list'>
          <Button className='item arrow' openType='openSetting'>
            隐私管理
          </Button>
          <Button className='item arrow' openType='contact'>
            联系我们
          </Button>
          <Button className='item arrow' openType='feedback'>
            问题反馈
          </Button>
        </View>

        <View className='list'>
          <Button className='item arrow'>
            关于我们
          </Button>
        </View>

        {userInfo.pkId >= 0 && (
          <View className='action'>
            <Button className='button' onClick={()=>console.log('退出登录')}>
              退出登录
            </Button>
          </View>
        )}
      </View>

      <AtModal className='nikeNamePopup' isOpened={isOpenPhone}>
        <View className='phonePopup'>
          <View className='container'>
            <View className='popHeader'>
              <View></View>
              <View className='title'>绑定手机</View>
              <View className='close' onClick={handleClose}>
                <AtIcon value='close' size='18' color='#999' />
              </View>
            </View>

            <View className='content'>
              <Input
                className='input'
                type='text'
                placeholder='请输入手机号'
                value={phoneForm.phone}
                onInput={(e:any)=>setLocalPhoneForm(pre=>({...pre,phone:e.detail.value}))}
              />
              <View className='yanz'>
                <Input
                  className='password'
                  type='text'
                  placeholder='请输入验证码'
                  value={phoneForm.code}
                  onInput={(e:any)=>setLocalPhoneForm(pre=>({...pre,code:e.detail.value}))}
                />
                {!timer ? (
                  <Text className='btn' onClick={sendPhoneCode} hidden={timer}>
                    获取验证码
                  </Text>
                ) : (
                    <Text className='btn' hidden={!timer}>
                      {count}秒后重新获取
                    </Text>
                )}
              </View>
            </View>

            <View className='footer'>
              <Button className='button' onClick={handleClick}>
                确定绑定
              </Button>
            </View>
          </View>
        </View>
      </AtModal>
    </>
  )
}
