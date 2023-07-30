import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { useStore } from '../../../store/index.js'
import { observer } from 'mobx-react-lite'

import Login from './Login/Login.js'
import SideMenu from './SideMenu/SideMenu.js'

function UserContent () {
  const { userStore } = useStore()

  return (
    <>
      {
        userStore.userCookie === null ? <Login /> :
          <Layout>
            <SideMenu />
            <Layout
              style={{
                padding: '0 24px 24px',
              }}
            >
              <Outlet />
            </Layout>
          </Layout>
      }
    </>
  )
}

export default observer(UserContent)
