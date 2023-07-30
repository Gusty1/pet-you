import { Layout, Select, Button, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"

import { useStore } from '../../../../store/index.js'
import { useAxios } from '../../../../utils'

function Login () {
  const { userStore } = useStore()
  const [selectedUser, setSelectedUser] = useState('1')
  const [loadComplete, setLoadComplete] = useState(false)
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('users').then((response) => {
        const newUserList = response.data.data
        setUserList(newUserList.map((item) => {
          return {
            value: item.id,
            label: item.nickName
          }
        }))
      })
      setLoadComplete(true)
    })()
  }, [])

  //綁定使用者
  function userChange (e) {
    setSelectedUser(e)
  }

  //前往登入
  function goLogin () {
    userStore.setUserCookie(selectedUser)
    navigate('/Pet_you/user')
  }

  return (
    <Layout style={{ margin: 'auto' }}>
      <Avatar shape="square"
        style={{ margin: '50px' }}
        size={100} icon={<UserOutlined />} />
      <Select
        defaultValue={1}
        style={{
          width: 200,
        }}
        onChange={(e) => userChange(e)}
        options={userList}
      />
      <Button type="primary"
        style={{ marginTop: '2.5vh' }}
        onClick={goLogin}
        disabled={!loadComplete}
      >登入</Button>
    </Layout>
  )
}

export default observer(Login)
