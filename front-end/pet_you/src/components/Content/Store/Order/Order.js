import { Steps, Layout } from 'antd'
import { Outlet } from "react-router-dom"
import { observer } from 'mobx-react-lite'

import { useStore } from '../../../../store/index.js'


function Order () {
  const { Content } = Layout
  const { storeStore } = useStore()

  const steps = [
    {
      key: 'or-1',
      title: '確認商品'
    },
    {
      key: 'or-2',
      title: '選擇付款&運送方式'
    },
    {
      key: 'or-3',
      title: '完成購買'
    },
  ]

  return (
    <Content style={{ padding: '5vh 10vw' }}>
      <Steps current={storeStore.orderStep} items={steps} />
      <Layout style={{ margin: '1vh 2.5vw' }}>
        <Outlet />
      </Layout>
    </Content>
  )
}

export default observer(Order)