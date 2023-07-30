import { Result, Image, Button } from 'antd'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

import { baseURL } from '../../utils'


function NotFound () {
  const navigate = useNavigate()
  const [picURL, setPicURL] = useState(baseURL + 'images/error/error.jpg')

  useEffect(() => {
    (async function getPic () {
      await fetch('https://api.thecatapi.com/v1/images/search?limit=1').then((response) => {
        // 將結果轉成json
        return response.json()
      }).then((response) => {
        //結果顯示
        setPicURL(response[0].url)
      }).catch((error) => {
        //失敗處理
        console.log(error)
        setPicURL(baseURL + 'images/error/error.jpg')
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function goHome () {
    navigate('/Pet_you/store')
  }

  return (
    <Result
      status="error"
      title="非常抱歉，發生了點問題ˊ_ˋ"
      subTitle="給你看可愛貓貓，不要生氣"
      icon={<Image height='70vh' width='52vw' preview={false} src={picURL} alt='貓貓不給看' />}
      extra={<Button type="primary" onClick={goHome}> 回首頁</Button >}
    />
  )
}

export default NotFound
