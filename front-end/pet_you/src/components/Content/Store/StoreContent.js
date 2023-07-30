import { Layout } from 'antd'
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react'

import SideMenu from './SideMenu/SideMenu.js'

function StoreContent () {
  const { Content } = Layout
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.type === undefined) navigate('/Pet_you/store/food')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <SideMenu />
      <Content
        style={{
          padding: 24,
          margin: 0
        }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default StoreContent
