import { Menu, Avatar } from 'antd'
import { Link, useNavigate } from "react-router-dom"
import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../../store/index.js'
import { useAxios, baseURL } from '../../../utils'
import ShoppingCar from './ShoppingCar/ShoppingCar.js'
import OtherDropdown from './OtherDropdown/OtherDropdown.js'

const initLoginAry = [
  {
    icon: '',
    key: 'h-1',
    label: <OtherDropdown />
  }, {
    icon: <ShopOutlined />,
    key: 'h-2',
    label: <Link to="/Pet_you/store/food">商城</Link>
  }, {
    icon: <UserOutlined />,
    key: 'h-3',
    label: <Link to="/Pet_you/user">登入</Link>
  }
]

function HeaderMenu () {
  const { menuStore, userStore, storeStore } = useStore()
  const [loginAry, setLoginAry] = useState(initLoginAry)
  const navigate = useNavigate()

  useEffect(() => {
    (async function getData () {
      if (userStore.userCookie === null) {
        setLoginAry(initLoginAry)
        return false
      }
      await useAxios.get('users/' + userStore.userCookie).then((response) => {
        const avatarUrl = baseURL + "images/user/" + response.data.data.id + ".jpg"
        setLoginAry([
          {
            icon: '',
            key: 'h-1',
            label: <OtherDropdown />
          }, {
            icon: <ShopOutlined />,
            key: 'h-2',
            label: <Link to="/Pet_you/store/food">商城</Link>
          }, {
            icon: '',
            key: 'h-2-2',
            label: <ShoppingCar />
          }, {
            icon: <Avatar src={avatarUrl} alt="error" />,
            key: 'h-3',
            label: <Link to="/Pet_you/user">{response.data.data.nickName}</Link>
          }
        ])
      }).catch((error) => {
        console.log(error)
        menuStore.setError()
        navigate('/Pet_you/error')
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userCookie])

  function goHref (e) {
    if (e.key === 'h-2-2') return false
    menuStore.headerAcceptClick(e)
    menuStore.userMenuAcceptClick({ key: 'm-1' })
    storeStore.setStoreObj({
      pageNum: 1,
      name: '',
      order: 'ASC'
    })
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[menuStore.headerSelected]}
      items={loginAry}
      style={
        {
          marginLeft: 'auto',
          minWidth: '30vw',
          // flex: "auto"
        }
      }
      onClick={(e) => goHref(e)}
    />
  )
}

export default observer(HeaderMenu)
