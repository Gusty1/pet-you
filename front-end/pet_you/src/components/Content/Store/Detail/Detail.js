import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Row, Col, Image, Typography, Divider, Layout, Button, Input, Space, notification } from 'antd'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons'

import { useAxios, baseURL } from '../../../../utils'
import { useStore } from '../../../../store/index.js'

function Detail () {
  const params = useParams()
  const { userStore, storeStore } = useStore()
  const [loadComplete, setLoadComplete] = useState(false)
  const [storeData, setStoreData] = useState({})
  const [count, setCount] = useState(0)
  const { Title, Text } = Typography
  const { Content } = Layout
  const [api, setContextHolder] = notification.useNotification()

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('stores/detail/' + params.id).then((response) => {
        // console.log(response)
        setStoreData(response.data.data)
        setLoadComplete(true)
      })
    })()
  }, [params.id])

  //數量+1
  function addCount () {
    if (count + 1 > 10) return
    setCount(count + 1)
  }

  //數量-1
  function minusCount () {
    if (count - 1 < 0) return
    setCount(count - 1)
  }

  //改變數量
  function changeCount (e) {
    let inputValue = e.target.value.trim()
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      if (inputValue === '' || inputValue === '-') inputValue = 0
      else {
        inputValue = parseInt(inputValue)
        if (inputValue < 0) inputValue = 0
        if (inputValue > 10) inputValue = 10
      }
      setCount(inputValue)
    }
  }

  //加入購物車
  function addStore () {
    (async function insertData () {
      setLoadComplete(false)
      await useAxios.post('stores/orderCar', {
        uid: userStore.userCookie,
        sid: params.id,
        count: count
      }).then((response) => {
        // console.log(response)
        api.info({
          message: <Text type="success">添加成功</Text>,
          placement: 'top',
          icon: <CheckOutlined />
        })
        setLoadComplete(true)
        storeStore.setChangeOrderCar()
      })
    })()
  }

  return (
    <Content style={{ padding: '5vh 10vw' }}>
      <Row gutter={8} justify="space-evenly">
        <Col span={8}>
          <Image
            width='100%'
            src={storeData.bigPic}
            fallback={baseURL + 'images/error/img404.jpg'}
          />
        </Col>
        <Col span={8}>
          <Title level={2}>{storeData.name}</Title>
          <Title level={4} style={{ color: '#0080FF' }}>NT&nbsp;{storeData.price}</Title>
          <Space.Compact
            style={{
              width: '50%',
              marginTop: '3vh'
            }}
          >
            <Button disabled={!loadComplete} onClick={minusCount}><MinusOutlined /></Button>
            <Input disabled={!loadComplete} onChange={(e) => changeCount(e)} value={count} />
            <Button disabled={!loadComplete} onClick={addCount}><PlusOutlined /></Button>
          </Space.Compact>
          <Space.Compact
            style={{
              width: '50%',
              paddingLeft: '3vw'
            }}
          >
            <Button disabled={!loadComplete || count === 0 || userStore.userCookie === null} type="primary" onClick={addStore}>加入購物車</Button>
          </Space.Compact>
          <Text type="danger">單次購買數量最多10個</Text>
        </Col>

      </Row>
      <Divider orientationMargin="0">
        商品介紹
      </Divider>
      <div style={{ textAlign: 'center', paddingTop: '3vh' }}>
        <img src={storeData.description} alt="查無圖片" />
      </div>
      {setContextHolder}
    </Content>
  )
}

export default Detail