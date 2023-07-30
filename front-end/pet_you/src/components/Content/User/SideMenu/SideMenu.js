import { Layout, Menu, Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from "react-router-dom"

import { useStore } from '../../../../store/index.js'

function SideMenu () {
  const { userStore, menuStore } = useStore()
  const { Sider } = Layout
  const navigate = useNavigate()

  let testAry = [{
    key: 'm-1',
    label: <Link to="/Pet_you/user">會員資料</Link>,
  }, {
    key: 'm-2',
    label: <Link to="/Pet_you/user/buyHistory">購買紀錄</Link>,
  }, {
    key: 'm-3',
    label: <Button onClick={userFunction} type="primary" danger>登出</Button>,
  }]

  //菜單點擊事件
  function userFunction () {
    navigate('/Pet_you/user')
    userStore.userRemoveCookie()
  }

  return (
    <Sider
      width={300}
      style={{ minHeight: '100%' }}
    >
      <Menu
        theme='dark'
        selectedKeys={[menuStore.userMenuSelected]}
        mode="inline"
        defaultSelectedKeys={['m-1']}
        style={{
          minHeight: '100%'
        }}
        items={testAry}
        onClick={(e) => menuStore.userMenuAcceptClick(e)}
      />
    </Sider>
  )
}

export default observer(SideMenu)
