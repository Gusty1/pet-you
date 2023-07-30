import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link } from "react-router-dom"

import { useStore } from '../../../../store/index.js'

function SideMenu () {
  const { Sider } = Layout
  const { menuStore, storeStore } = useStore()

  let testAry = [{
    key: 's-1',
    label: <Link to="/Pet_you/store/food">食品</Link>,
  }, {
    key: 's-2',
    label: <Link to="/Pet_you/store/toy">玩具</Link>,
  }, {
    key: 's-3',
    label: <Link to="/Pet_you/store/cosmetic">美容</Link>,
  }, {
    key: 's-4',
    label: <Link to="/Pet_you/store/other">其他</Link>,
  }]

  //連結點擊
  function goHref (e) {
    menuStore.storeMenuAcceptClick(e)
    storeStore.setStoreObj({
      pageNum: 1,
      name: '',
      order: 'ASC'
    })
  }

  return (
    <Sider
      width={300}
      style={{ minHeight: '100%' }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[menuStore.storeMenuSelected]}
        theme='dark'
        style={{
          minHeight: '100%'
        }}
        items={testAry}
        onClick={(e) => goHref(e)}
      />
    </Sider>
  )
}

export default observer(SideMenu)
