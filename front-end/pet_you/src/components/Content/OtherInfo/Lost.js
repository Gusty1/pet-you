import { Layout, Input, Col, Row, Button, Select, Typography, Table, Image, Divider } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import { useAxios, showDateYMD, baseURL } from '../../../utils'

function Lost () {
  const { Content } = Layout
  const { Title, Paragraph } = Typography
  const [loadComplete, setLoadComplete] = useState(false)
  const [petType, setPetType] = useState("貓")
  const [petFeature, setPetFeature] = useState("")
  const [lostPlace, setLostPlace] = useState("")
  const [searchParams, setSearchParams] = useState({
    petType,
    petFeature,
    lostPlace
  })
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    (async function getData () {
      setLoadComplete(false)
      await useAxios.get('losts/', {
        params: searchParams
      }).then((response) => {
        const lostData = response.data.data
        for (let i = 0; i < lostData.length; i++) {
          lostData[i].key = nanoid()
          lostData[i].lostOwner = <div><p>{lostData[i].ownerName}</p><p>{lostData[i].ownerPhone}</p><p>{lostData[i].ownerEmail}</p></div>
          lostData[i].lostDate = showDateYMD(lostData[i].lostDate)
          lostData[i].petPicture = <Image
            src={lostData[i].petPicture}
            alt='查無圖片'
            height="12vh"
            width="8vw"
            fallback={baseURL + 'images/error/img404.jpg'}
          />
        }
        setSearchResult(lostData)
        setLoadComplete(true)
      })
    })()
  }, [searchParams])

  const selectPetType = [
    {
      value: 'cat',
      label: '貓',
    },
    {
      value: 'dog',
      label: '狗',
    },
  ]

  const columns = [
    {
      title: '照片',
      dataIndex: 'petPicture'
    }, {
      title: '名字',
      dataIndex: 'petName'
    }, {
      title: '特徵',
      dataIndex: 'petFeature',
      responsive: ['md'],
    }, {
      title: '遺失日期',
      dataIndex: 'lostDate',
      sorter: (a, b) => new Date(a.lostDate) > new Date(b.lostDate) ? -1 : 1
    }, {
      title: '遺失地點',
      dataIndex: 'lostPlace',
      responsive: ['md'],
    }, {
      title: '聯絡人資訊',
      dataIndex: 'lostOwner',
    }
  ]

  //綁定寵物類型
  function changePetType (e) {
    if (e === 'cat') setPetType('貓')
    else if (e === 'dog') setPetType('狗')
  }

  //綁定寵物特徵
  function changePetFeature (e) {
    setPetFeature(e.target.value)
  }

  //綁定遺失地點
  function changeLostPlace (e) {
    setLostPlace(e.target.value.trim())
  }

  //將查詢參數組合
  function combParams () {
    setSearchParams({
      "petType": petType,
      "petFeature": petFeature,
      "lostPlace": lostPlace
    })
  }

  return (
    <Content style={{ padding: '0px 50px' }}>
      <Typography>
        <Title>走失協尋</Title>
        <Paragraph>
          <pre style={{ color: 'red' }}>
            這邊資料不是我亂掰的，是從<a rel="noreferrer noopener" href="https://data.gov.tw/dataset/77682" target="_blank">政府公開資料</a>抓來的，應該都是真的，所以真的有看到就稍微幫個忙吧。
          </pre>
        </Paragraph>
      </Typography>
      <Divider />

      <Row justify="space-around">
        <Col span={3} style={{ textAlign: 'center' }}>
          寵物種類
          <Select
            defaultValue="cat"
            options={selectPetType}
            onChange={(e) => changePetType(e)}
          />
        </Col>
        <Col span={6} >
          <Input
            addonBefore="寵物特徵"
            allowClear
            placeholder="例:戴黃色項圈、白毛..."
            onChange={(e) => { changePetFeature(e) }} />
        </Col>
        <Col span={6}>
          <Input
            addonBefore="走失地方"
            allowClear
            placeholder="例:XX公園、內湖區..."
            onChange={(e) => { changeLostPlace(e) }} />
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
          y: '45.2vh',
        }}
      />
    </Content>
  )
}

export default Lost
