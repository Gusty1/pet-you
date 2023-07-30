import { Layout } from 'antd'
import HeaderMenu from './Menu/Menu.js'

function Header () {
  const { Header } = Layout

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        minWidth: '100vw',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <div className="demo-logo" style={
        {
          marginLeft: '5vw',
          color: "white",
          fontSize: '20px'
        }
      }>PET你</div>
      <HeaderMenu />
    </Header>
  )
}

export default Header
