import { Avatar, Layout, Form, Input, Radio, DatePicker } from 'antd'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'

import { useAxios, showDateYMD, baseURL } from '../../../../utils'
import { useStore } from '../../../../store/index.js'

function UserInfo () {
  const { userStore } = useStore()
  const [userInfo, setUserInfo] = useState({})
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    (async function getData () {
      if (userStore.userCookie === null) return false
      await useAxios.get('users/' + userStore.userCookie).then((response) => {
        const myUserInfo = response.data.data
        myUserInfo.avatar = baseURL + "images/user/" + myUserInfo.id + ".jpg"
        myUserInfo.birth = showDateYMD(myUserInfo.birth)
        setUserInfo(myUserInfo)
      })
    })()
  }, [userStore.userCookie])

  return (
    <>
      <Layout style={{
        paddingTop: '5vh',
        minWidth: '100%',
        maxHeight: '1vh',
        textAlign: 'center',
        display: 'block'
      }}>
        <Avatar size={160} src={userInfo.avatar} alt="已違反數位中介法" />
      </Layout >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        disabled={true}
        style={{
          minWidth: '30vw',
          padding: '2vh',
          margin: 'auto'
        }}
      >
        <Form.Item label="姓名">
          <Input value={userInfo.name} />
        </Form.Item>
        <Form.Item label="暱稱">
          <Input value={userInfo.nickName} />
        </Form.Item>
        <Form.Item label="生日">
          <DatePicker value={dayjs((userInfo.birth), dateFormat)} format={dateFormat} />
        </Form.Item>
        <Form.Item label="性別">
          <Radio.Group value={userInfo.sex}>
            <Radio value="male"> 男 </Radio>
            <Radio value="female"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="電話">
          <Input value={userInfo.phone} />
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(UserInfo)
