import { Dropdown, Button, Table, Image, notification, Typography, Spin, Space, Badge, Avatar } from 'antd'
import { ShoppingCartOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from "react-router-dom"
import { nanoid } from 'nanoid'

import { useStore } from '../../../../store/index.js'
import { useAxios, baseURL } from '../../../../utils'


function ShoppingCar () {
  const [loadComplete, setLoadComplete] = useState(false)
  const [orderCarData, setOrderCarData] = useState([])
  const [total, setTotal] = useState([0])
  const { userStore, storeStore } = useStore()
  const [api, setContextHolder] = notification.useNotification()
  const { Text } = Typography
  const navigate = useNavigate()

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('stores/orderCar/' + userStore.userCookie).then((response) => {
        // console.log(response)
        const result = response.data.data
        let newTotal = 0
        setOrderCarData(result.map((item) => {
          newTotal += item.sum
          return {
            ...item,
            key: nanoid(),
            name: <Link to={'/storeDetail/' + item.sid}>
              <Image height={'8vh'} width={'5vw'} preview={false} src={item.small_pic} alt="查無圖片" fallback={baseURL + 'images/error/img404.jpg'} />
            </Link>,
            delete: <Button danger type="primary" onClick={() => deleteOrderCar(item.oid)}><DeleteOutlined /></Button>
          }
        }))
        setTotal(newTotal)
        setLoadComplete(true)
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeStore.changeOrderCar])

  //刪除購物車
  function deleteOrderCar (id) {
    (async function deleteData () {
      setLoadComplete(false)
      await useAxios.delete('stores/orderCar', {
        params: {
          id: id
        }
      }).then((response) => {
        // console.log(response)
        api.info({
          message: <Text type="danger">刪除成功</Text>,
          placement: 'top',
          icon: <CheckOutlined />
        })
        storeStore.setChangeOrderCar()
        setLoadComplete(true)
      })
    })()
  }

  //前往商品詳細頁
  function goOrder () {
    navigate('/Pet_you/order/one')
  }

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: nanoid(),
      fixed: true,
      width: 100,
    },
    {
      title: '數量',
      dataIndex: 'count',
      key: nanoid(),
      fixed: true,
      width: 100,
    },
    {
      title: '總價',
      dataIndex: 'sum',
      key: nanoid(),
      fixed: true,
      width: 100,
    },
    {
      title: '刪除',
      dataIndex: 'delete',
      key: nanoid(),
      fixed: true,
      width: 100,
    }
  ]

  const items = [
    {
      label:
        <Table
          columns={columns}
          dataSource={orderCarData}
          bordered={true} size='small'
          pagination={false}
          loading={!loadComplete}
          title={() => '購物車'}
          scroll={{
            y: '50vh',
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>合計</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>{total}</Table.Summary.Cell>
                <Table.Summary.Cell index={3}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          style={{ cursor: 'default', maxWidth: '500px' }}
        />,
      key: '1'
    }, {
      type: 'divider',
    }, {
      label: <Button type="primary" size='small' disabled={!loadComplete || orderCarData.length === 0} onClick={goOrder}>前往結帳</Button>,
      key: '3'
    }
  ]

  return (
    <>
      {!loadComplete ? <Spin /> :
        <Dropdown
          menu={{
            items,
          }}
          style={{ width: '100%' }}
        >
          <a href='/#' onClick={(e) => e.preventDefault()}>
            <Space>
              <Badge count={orderCarData.length} size='small'>
                <Avatar icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />} />
              </Badge>
            </Space>
          </a>
        </Dropdown>}
      {setContextHolder}
    </>
  )
}

export default observer(ShoppingCar)
