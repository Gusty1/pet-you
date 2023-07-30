import { Result, Button } from 'antd'
import { useNavigate } from "react-router-dom"

import { useStore } from '../../../../../store/index.js'

function Step3 () {
  const navigate = useNavigate()
  const { storeStore } = useStore()

  function goHome () {
    storeStore.setOrderStep(0)
    navigate('/store')
  }

  return (
    <Result
      status="success"
      title="訂單完成"
      subTitle=""
      extra={[
        <Button type="primary" onClick={goHome} key="console">
          回首頁
        </Button>
      ]}
    />
  )
}

export default Step3