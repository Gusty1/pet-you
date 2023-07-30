import { Layout, Row, Col, Typography, Divider, Button, Input, Table, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import { useAxios, taiwanCounty } from '../../../utils'

function Vet () {
  const { Content } = Layout
  const { Title } = Typography
  const [loadComplete, setLoadComplete] = useState(false)
  const selectAddress = taiwanCounty.map((item) => {
    return {
      value: item,
      label: item
    }
  })
  const [address, setAddress] = useState(selectAddress[0].value)
  const [name, setName] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [searchParams, setSearchParams] = useState({
    address,
    name
  })

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('vets/', {
        params: searchParams
      }).then((response) => {
        const vetData = response.data.data
        for (let i = 0; i < vetData.length; i++) {
          vetData[i].key = nanoid()
          let newAddress = 'https://www.google.com/maps/search/?api=1&query=' + vetData[i].address
          vetData[i].address = <a
            rel="noreferrer noopener"
            href={newAddress}
            target="_blank"
          >{vetData[i].address}</a>
        }
        setSearchResult(vetData)
        setLoadComplete(true)
      })
    })()
  }, [searchParams])

  //綁定輸入店名
  function changeName (e) {
    setName(e.target.value.trim())
  }

  //綁定選擇地區
  function changeAddress (e) {
    setAddress(e)
  }

  //組合參數
  function combParams () {
    setSearchParams({
      name,
      address
    })
  }

  const columns = [
    {
      title: '店名',
      dataIndex: 'name'
    }, {
      title: '負責獸醫',
      dataIndex: 'vetName'
    }, {
      title: '地址',
      dataIndex: 'address'
    }, {
      title: '電話',
      dataIndex: 'phone'
    }
  ]

  return (
    <Content style={{ padding: '0 50px' }}>
      <Typography>
        <Title>獸醫院位置</Title>
      </Typography>
      <Divider />

      <Row justify="space-evenly">
        <Col span={5}>
          地區
          <Select
            showSearch
            style={{
              width: '50%',
            }}
            defaultValue={selectAddress[0].value}
            options={selectAddress}
            onChange={(e) => changeAddress(e)}
          />
        </Col>
        <Col span={5}>
          <Input
            addonBefore="店名"
            allowClear
            onChange={(e) => changeName(e)}
          />
        </Col>
        <Col span={2}>
          <Button
            type='primary'
            disabled={!loadComplete}
            onClick={combParams}
          >
            <SearchOutlined />
          </Button>
        </Col>
      </Row>

      <Table
        style={{ marginTop: '3vh' }}
        columns={columns}
        dataSource={searchResult}
        loading={!loadComplete}
        bordered
        scroll={{
          y: '51vh',
        }}
      />
    </Content>
  )
}

export default Vet
