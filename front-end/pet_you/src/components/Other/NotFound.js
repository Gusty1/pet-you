import { Button, Result } from 'antd'
import { useNavigate } from "react-router-dom"

import { baseURL } from '../../utils'

function NotFound () {
  const navigate = useNavigate()
  const picSrc = baseURL + "images/error/404.png"

  function goHome () {
    navigate('/Pet_you/store')
  }

  return (
    <Result
      // status="404"
      status=""
      title=" "
      subTitle=""
      icon={<img alt="查無圖片" src={picSrc} />}
      extra={<Button type="primary" onClick={goHome}> 回首頁</Button >}
    />
  )
}

export default NotFound
