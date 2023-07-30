import { Button, Descriptions, Row, Col, Radio, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { useStore } from '../../../../../store/index.js'
import { useAxios } from '../../../../../utils'


function Step2 () {
  const { userStore, storeStore } = useStore()
  const [loadComplete, setLoadComplete] = useState(false)
  const [order, setOrder] = useState("")
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('stores/orderCar/' + userStore.userCookie).then((response) => {
        // console.log(response)
        const result = response.data.data
        setTotal(result.map((item) => {
          return item.sum
        }).reduce((prev, cur) => {
          return prev + cur
        }))
        setOrder(JSON.stringify(result.map((item => {
          return {
            sid: item.sid,
            count: item.count
          }
        }))))
        setLoadComplete(true)
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //上一步
  function getPrevious () {
    storeStore.setOrderStep(0)
    navigate('/order/one')

  }

  //下一步
  function getNext () {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.post('stores/deal', {
        uid: userStore.userCookie,
        stores: order,
        total: total,
        date: new Date(),
        pay: '貨到付款',
        transport: '宅配'
      }).then((response) => {
        // console.log(response)
        storeStore.setChangeOrderCar()
        storeStore.setOrderStep(2)
        setLoadComplete(true)
        navigate('/order/three', { replace: true })
      })
    })()
  }

  return (
    <>
      <Descriptions title="選擇付款&運送方式" layout="vertical" bordered>
        <Descriptions.Item label="總金額">{total}</Descriptions.Item>
        <Descriptions.Item label="付款方式">
          <Radio.Group disabled value={1} size='large'>
            <Radio value={1}>貨到付款</Radio>
            <Radio value={2}>信用卡</Radio>
            <Radio value={3}>超商取貨付款</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="運送方式" size='large'>
          <Radio.Group disabled value={1}>
            <Radio value={1}>宅配</Radio>
            <Radio value={2}>超商取貨</Radio>
          </Radio.Group>
        </Descriptions.Item>
      </Descriptions>
      <Row justify="space-evenly" style={{ marginTop: '20px' }}>
        <Col span={4}><Button disabled={!loadComplete} onClick={getPrevious}>上一步</Button></Col>
        <Col span={4}>
          <Popconfirm
            disabled={!loadComplete}
            title="訂單即將成立"
            description="訂單送出後將無法修改"
            onConfirm={getNext}
            okText="確定"
            cancelText="取消"
          >
            <Button disabled={!loadComplete} type="primary">
              下一步
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </>
  )
}

export default observer(Step2)