import { NavLink } from "react-router-dom"
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import './OtherDropdown.css'


function OtherDropdown () {
  const otherItems = [
    {
      key: 'o-1',
      label: <NavLink to='/Pet_you/shop' className={({ isActive }) => isActive ? 'otherActive' : null}>寵物店位置</NavLink>
    },
    {
      key: 'o-2',
      label: <NavLink to='/Pet_you/vet' className={({ isActive }) => isActive ? 'otherActive' : null}>獸醫院位置</NavLink>
    },
    {
      key: 'o-3',
      label: <NavLink to='/Pet_you/lost' className={({ isActive }) => isActive ? 'otherActive' : null}>走失協尋</NavLink>
    }
  ]

  function dealOther (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Dropdown
      menu={
        {
          items: otherItems
        }
      }
    >
      <a href="/#" onClick={(e) => dealOther(e)}>
        <Space>
          其它資訊
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default OtherDropdown
