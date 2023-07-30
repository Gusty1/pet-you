import { Table, Button, Image, Input, Space, Layout } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { nanoid } from 'nanoid'

import { useStore } from '../../../../../store/index.js'
import { useAxios, baseURL } from '../../../../../utils'


function Step1 () {
  const { storeStore, userStore } = useStore()
  const navigate = useNavigate()
  const [loadComplete, setLoadComplete] = useState(false)
  const [orderCarData, setOrderCarData] = useState([])
  const [deleteAry, setDeleteAry] = useState([])
  const [total, setTotal] = useState([0])

  const columns = [
    {
      title: '商品',
      dataIndex: 'pic',
      key: nanoid(),
    },
    {
      title: '名稱',
      dataIndex: 'showName',
      key: nanoid(),
    },
    {
      title: '單價',
      dataIndex: 'price',
      key: nanoid(),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '數量 (最多10個)',
      dataIndex: 'showCount',
      key: nanoid(),
    },
    {
      title: '刪除',
      dataIndex: 'showDelete',
      key: nanoid(),
    }
  ]

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
        setOrderCarData(result)
        setLoadComplete(true)
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //前往第2步
  function getNext () {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.put('stores/updateOrder', {
        newOrderAry: JSON.stringify(orderCarData),
        deleteAry: JSON.stringify(deleteAry)
      }).then((response) => {
        // console.log(response)
        storeStore.setChangeOrderCar()
        storeStore.setOrderStep(1)
        setLoadComplete(true)
        navigate('/Pet_you/order/two')
      })
    })()
  }

  // 刪除該筆
  function deleteOrderCar (id) {
    let newTotal = 0
    const testAry = [...deleteAry]
    testAry.push(id)
    setDeleteAry([...testAry])
    setOrderCarData(orderCarData.map((item) => {
      newTotal += item.oid === id ? 0 : item.sum
      return {
        ...item,
        delete: item.oid === id ? true : false
      }
    }).filter((item) => {
      return item.delete !== true
    }))
    setTotal(newTotal)
  }

  //數量+1
  function addCount (id) {
    let newTotal = 0
    setOrderCarData(orderCarData.map((item) => {
      let newCount = item.count
      let newSum = item.sum
      if (item.oid === id) {
        newCount = (item.count + 1) > 10 ? 10 : item.count + 1
        newSum = item.price * newCount
        newTotal += newSum
      } else {
        newTotal += item.sum
      }
      return {
        ...item,
        count: newCount,
        sum: newSum
      }
    }).filter((item) => {
      return item.delete !== true
    }))
    setTotal(newTotal)
  }

  //數量-1
  function minusCount (id) {
    let newTotal = 0
    setOrderCarData(orderCarData.map((item) => {
      let newCount = item.count
      let newSum = item.sum
      if (item.oid === id) {
        newCount = (item.count - 1) <= 0 ? 1 : item.count - 1
        newSum = item.price * newCount
        newTotal += newSum
      } else {
        newTotal += item.sum
      }
      return {
        ...item,
        count: newCount,
        sum: newSum
      }
    }).filter((item) => {
      return item.delete !== true
    }))
    setTotal(newTotal)
  }

  //自訂數量
  function changeCount (id, e) {
    let newTotal = 0
    let inputValue = e.target.value.trim()
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      if (inputValue === '' || inputValue === '-') inputValue = 1
      else {
        inputValue = parseInt(inputValue)
        if (inputValue <= 0) inputValue = 1
        if (inputValue > 10) inputValue = 10
      }
      setOrderCarData(orderCarData.map((item) => {
        let newCount = item.count
        let newSum = item.sum
        if (item.oid === id) {
          newCount = inputValue
          newSum = item.price * inputValue
          newTotal += newSum
        } else {
          newTotal += item.sum
        }
        return {
          ...item,
          count: newCount,
          sum: newSum
        }
      }).filter((item) => {
        return item.delete !== true
      }))
      setTotal(newTotal)
    }
  }

  //包裝成顯示資料
  function packageData (data) {
    return data.map((item) => {
      return {
        ...item,
        key: nanoid(),
        showName: <Link to={'/storeDetail/' + item.sid}>{item.name}</Link>,
        showCount: <Space.Compact>
          <Button onClick={() => minusCount(item.oid)}><MinusOutlined /></Button>
          <Input onChange={(e) => changeCount(item.oid, e)} value={item.count} />
          <Button onClick={() => addCount(item.oid)}><PlusOutlined /></Button>
        </Space.Compact>,
        pic: <Image height={'8vh'} width={'5vw'} preview={false} src={item.small_pic} alt="查無圖片" fallback={baseURL + 'images/error/img404.jpg'} />,
        showDelete: <Button danger type="primary" onClick={() => deleteOrderCar(item.oid)}><DeleteOutlined /></Button>
      }
    }).filter((item) => {
      return item.delete !== true
    })
  }

  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={packageData(orderCarData)}
        pagination={false}
        loading={!loadComplete}
        scroll={{
          y: '52vh',
        }}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>合計</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{total}</Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
              <Table.Summary.Cell index={4}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
      <Layout style={{ display: 'block', marginTop: '20px', textAlign: 'right' }}>
        <Button size='large'
          type='primary'
          onClick={getNext}
          disabled={!loadComplete || orderCarData.filter((item) => {
            return item.delete !== true
          }).length === 0}>
          下一步
        </Button>
      </Layout >
    </>
  )
}

export default observer(Step1)