import { Spin, Row, Col, Card, Typography, Pagination, Button, notification, Input, Select, Empty, Image } from 'antd'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'

import { useAxios, baseURL } from '../../../../utils'
import { useStore } from '../../../../store/index.js'

function ListCard () {
  const { userStore, storeStore } = useStore()
  const { Title, Text } = Typography
  const params = useParams()
  const [loadComplete, setLoadComplete] = useState(false)
  const [cardComponent, setCardComponent] = useState(<div style={{ margin: 'auto' }}><Spin /></div>)
  const [api, setContextHolder] = notification.useNotification()
  const [pages, setPages] = useState(0)
  const navigate = useNavigate()


  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('stores/' + params.type, {
        params: storeStore.storeObj
      }).then((response) => {
        // console.log(response)
        setPages(response.data.data.pages)
        const storeAry = response.data.data.list
        if (storeAry.length === 0) {
          setCardComponent(<div style={{ margin: 'auto' }}><Empty /></div>)
        } else {
          setCardComponent(storeAry.map((item) => {
            return <Col key={nanoid()} span={4} >
              <Card
                hoverable
                style={{ width: '100%', minHeight: '50vh' }}
                cover={<Image alt="查無圖片" preview={false} src={item.smallPic} fallback={baseURL + 'images/error/img404.jpg'} />}
                onClick={() => goDetail(item.id)}
              >
                <Title level={5}>{item.name}</Title>
                <Row gutter={16} justify="space-around">
                  <Col span={10}>
                    <Text mark>NT&nbsp;{item.price}</Text>
                  </Col>
                  <Col span={6}>
                    {
                      userStore.userCookie === null ?
                        <Button disabled ><PlusOutlined /></Button> :
                        <Button onClick={(e) => addStore(item.id, e)}><PlusOutlined /></Button>
                    }
                  </Col>
                </Row>
              </Card>
            </Col>
          }))
        }
        setLoadComplete(true)
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeStore.storeObj, params.type])

  //購物車添加商品
  function addStore (id, e) {
    (async function insertData () {
      e.stopPropagation()
      setLoadComplete(false)
      await useAxios.post('stores/orderCar', {
        uid: userStore.userCookie,
        sid: id,
        count: 1
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

  //名稱查詢
  function setParamName (e) {
    storeStore.setStoreObj({ ...storeStore.storeObj, name: e.target.value.trim(), pageNum: 1 })
  }

  //排序方式
  function setParamOrder (e) {
    storeStore.setStoreObj({ ...storeStore.storeObj, order: e, pageNum: 1 })
  }

  //頁數點擊
  function pageChange (e) {
    storeStore.setStoreObj({ ...storeStore.storeObj, pageNum: e })
  }

  //前往商品詳細頁
  function goDetail (id) {
    navigate('/Pet_you/storeDetail/' + id)
  }

  return (
    <>
      {setContextHolder}
      <Row gutter={16} justify="space-around" style={{ padding: '10px' }}>
        <Col span={8}>
          <Input
            value={storeStore.storeObj.name}
            addonBefore="商品名稱"
            allowClear
            onChange={(e) => { setParamName(e) }} />
        </Col>
        <Col span={6}>
          排序方式
          <Select
            value={storeStore.storeObj.order}
            style={{
              width: '60%',
            }}
            onChange={(e) => setParamOrder(e)}
            options={[
              {
                value: 'ASC',
                label: '$$低-->高',
              },
              {
                value: 'DESC',
                label: '$$高-->低',
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>{cardComponent}</Row>
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Pagination disabled={!loadComplete} current={storeStore.storeObj.pageNum} total={pages * 10} onChange={(e) => pageChange(e)} />
      </div>
    </>
  )
}

export default observer(ListCard)
