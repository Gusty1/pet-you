import { Col, Row, Statistic, Layout, Divider, Table, Image } from 'antd'
import CountUp from 'react-countup'
import { Link } from "react-router-dom"
import { nanoid } from 'nanoid'
import { useEffect, useState } from "react"

import { useStore } from '../../../../store/index.js'
import { useAxios, baseURL } from '../../../../utils'


function BuyHistory () {
  const formatter = (value) => <CountUp end={value} separator="," />
  const [loadComplete, setLoadComplete] = useState(false)
  const [buyData, setBuyData] = useState([])
  const [staticData, setStaticData] = useState({
    allCount: 0,
    allTotal: 0,
  })
  const { userStore } = useStore()
  const { Content } = Layout

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('users/buy/' + userStore.userCookie).then((response) => {
        // console.log(response)
        const result = response.data.data
        setStaticData({
          allCount: result.length,
          allTotal: result.length > 0 ? result.map((item) => {
            return item.total
          }).reduce((prev, cur) => {
            return prev + cur
          }) : 0
        })

        result.forEach(async (item, index) => {
          let itemStoresAry = JSON.parse(item.stores)
          let storesAry = []
          for (let i = 0; i < itemStoresAry.length; i++) {
            storesAry.push(itemStoresAry[i].sid)
          }
          await useAxios.get('users/buy/stores', {
            params: {
              ids: storesAry.toString()
            }
          }).then((storesResult) => {
            // console.log(storesResult.data.data)
            const newStoreResult = storesResult.data.data.map((item2) => {
              let thisCount = 0
              for (let i = 0; i < itemStoresAry.length; i++) {
                if (item2.id === itemStoresAry[i].sid) thisCount = itemStoresAry[i].count
              }
              return {
                ...item2,
                key: nanoid(),
                smallPic: <Image
                  height={'8vh'} width={'5vw'}
                  src={item2.smallPic}
                  fallback={baseURL + 'images/error/img404.jpg'}
                />,
                name: <Link to={'/storeDetail/' + item2.id}>{item2.name}</Link>,
                count: thisCount,
                sum: item2.price * thisCount
              }
            })

            item.showStores = <Table
              columns={storesColumns}
              dataSource={newStoreResult}
              bordered
              pagination={false}
            />
            setBuyData(result.map((item) => {
              return {
                ...item,
                key: nanoid()
              }
            }))
          })
        })
        setLoadComplete(true)
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: '交易日期',
      dataIndex: 'date',
      key: nanoid(),
      sorter: (a, b) => a.date > b.date ? 1 : -1,
    },
    {
      title: '總金額',
      dataIndex: 'total',
      key: nanoid(),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: '付款方式',
      dataIndex: 'pay',
      key: nanoid(),
    },
    {
      title: '運送方式',
      dataIndex: 'transport',
      key: nanoid(),
    }
  ]

  const storesColumns = [
    {
      title: '商品圖片',
      dataIndex: 'smallPic',
      key: nanoid(),
    },
    {
      title: '商品名稱',
      dataIndex: 'name',
      key: nanoid(),
    },
    {
      title: '數量',
      dataIndex: 'count',
      key: nanoid(),
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: nanoid(),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '合計',
      dataIndex: 'sum',
      key: nanoid(),
      sorter: (a, b) => a.sum - b.sum,
    },
  ]


  return (
    <Content style={{ padding: '2vh 4vw' }}>
      <Row gutter={16} justify="space-evenly">
        <Col span={12} style={{ textAlign: 'center' }}>
          <Statistic title="訂單總筆數" value={staticData.allCount} formatter={formatter} valueStyle={{ color: '#00BB00' }} />
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Statistic title="訂單總金額" value={staticData.allTotal} formatter={formatter} valueStyle={{ color: 'red' }} />
        </Col>
      </Row>
      <Divider />
      <Table
        key={nanoid()}
        loading={!loadComplete}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                margin: 0,
                minWidth: '100%'
              }}
            >
              {record.showStores}
            </div>
          ),
          rowExpandable: (record) => record.stores !== '',
        }}
        scroll={{
          y: '52vh',
        }}
        dataSource={buyData}
        bordered
      />
    </Content>
  )
}

export default BuyHistory
