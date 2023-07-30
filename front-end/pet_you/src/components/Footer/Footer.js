import { Layout } from 'antd'

function MyFooter () {
  const { Footer } = Layout
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Copyright &copy; 2023 PET YOU
    </Footer>
  )
}

export default MyFooter
