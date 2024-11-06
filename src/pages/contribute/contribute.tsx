import { useAppSelector } from '@/store';
import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { AtAccordion, AtButton, AtForm, AtInput, AtList, AtSwitch, AtTag, AtTextarea } from 'taro-ui';
import './contribute.scss'

const Contribute = () => {
  type CategoryType = number;  //?????????/
  const nickName = useAppSelector((state) => state.user.userInfo.nickname);
  const [ContributeForm, setContributeForm] = useState<ContributeForm>({
    title: '',
    isTop: 1,
    downloadUrl: '',
    price: 0,
    detail: '',
    tags: [],
    diskType: null,
    resType: [],
  });
  const handleSubmitClick = () => {
    console.log(ContributeForm);
  };

  const handleUrlChange = (e) => { };

  const [tagOpen, setTagOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);

  const setResourceInverted = (item: CategoryType) => {
    console.log(item);
  };
  const setTagsInverted = (item: CategoryType) => {
    console.log(item);
  };
  const [panType, setPanType] = useState(null);

    return (
      <>

        <View className='contribute'>
          <AtForm onSubmit={handleSubmitClick}>
            <AtInput
              name='value'
              title='用户昵称'
              type='text'
              placeholder='请输入用户昵称'
              value={nickName}
              disabled
            />
            <AtInput
              name='value'
              title='标题'
              type='text'
              required
              placeholder='请输入标题'
              value={ContributeForm.title}
              onChange={(e) => setContributeForm({ ...ContributeForm, title: e + '' })}
            />

            <AtSwitch title='是否置顶' checked={ContributeForm.isTop === 1 ? true : false}
              onChange={(e) => setContributeForm({ ...ContributeForm, isTop: e === true ? 1 : 0 })}
            />

            <AtInput
              name='value'
              title='下载链接'
              type='text'
              required
              placeholder='请输入下载链接'
              value={ContributeForm.title}
              onChange={(e) => handleUrlChange(e)}
            />

            <AtInput
              name='value'
              title='网盘类型'
              type='text'
              disabled
              placeholder='请输入网盘类型'
              value={panType === null ? '请选择网盘类型' : panType}
            />

            <AtInput
              name='price'
              title='积分'
              type='number'
              required
              placeholder='请输入积分'
              value={ContributeForm.price + ''}
              onChange={(e) => setContributeForm({ ...ContributeForm, price: + e })}
            />

            <View className='detail-box'>
              <View className='detail-text'>资源描述</View>
              <AtTextarea
                className='detail-textarea'
                placeholder='请输入详细描述'
                maxLength={200}
                value={ContributeForm.detail}
                onChange={(e) => setContributeForm({ ...ContributeForm, detail: e + '' })}
              />
            </View>
            <AtAccordion
              open={tagOpen}
              onClick={() => setTagOpen(!tagOpen)}
              title='标签'
            >
              <AtList hasBorder>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <AtTag
                      name='tag-1'
                      type='primary'
                      circle
                      key={item}
                      customStyle={{ margin: '5px 10px 10px 0' }}
                      active
                      onClick={() => setTagsInverted(item)}
                    >
                      tag-{item}
                    </AtTag>
                  ))
                }
              </AtList>
            </AtAccordion>
            <AtAccordion
              open={resourceOpen}
              onClick={() => setResourceOpen(!resourceOpen)}
              title='资源类型'
            >
              <AtList hasBorder>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <AtTag
                      name='tag-1'
                      active={false}
                      customStyle={{ margin: '5px 10px 10px 0' }}
                      key={item}
                      onClick={() => setResourceInverted(item)}
                    >
                      tag-{item}
                    </AtTag>
                  ))
                }
              </AtList>
            </AtAccordion>
          </AtForm>


          <AtButton formType='submit' circle type='primary' customStyle={{ margin: '20px' }}>
            提交
          </AtButton>
        </View>
      </>
    );
  }

export default Contribute;
