import { Routes, Route } from "react-router-dom"
import { Layout, ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
// import Cookies from 'js-cookie'

import Header from './components/Header/Header.js'
import StoreContent from './components/Content/Store/StoreContent.js'
import ListCard from './components/Content/Store/ListCard/ListCard.js'
import Detail from './components/Content/Store/Detail/Detail.js'
import Order from './components/Content/Store/Order/Order.js'
import Step1 from './components/Content/Store/Order/Step1/Step1.js'
import Step2 from './components/Content/Store/Order/Step2/Step2.js'
import Step3 from './components/Content/Store/Order/Step3/Step3.js'
import UserContent from './components/Content/User/UserContent.js'
import UserInfo from './components/Content/User/UserInfo/UserInfo.js'
import BuyHistory from './components/Content/User/BuyHistory/BuyHistory.js'
import Shop from './components/Content/OtherInfo/Shop.js'
import Vet from './components/Content/OtherInfo/Vet.js'
import Lost from './components/Content/OtherInfo/Lost.js'
import NotFound from './components/Other/NotFound.js'
import ErrorPage from './components/Other/ErrorPage.js'
import Footer from './components/Footer/Footer.js'


function App () {

  window.onbeforeunload = () => {
    // Cookies.remove('userMenuSelected')
    // Cookies.remove('headerSelected')
    // Cookies.remove('storeMenuSelected')
    // Cookies.remove('uid')
  }

  return (
    <ConfigProvider locale={zhTW}>
      <Layout className="layout">
        <Header />
        <Layout style={{
          minHeight: '85.7vh',
        }}>

          <Routes>
            <Route path='/' element={<StoreContent />}></Route>
            <Route path='/store' element={<StoreContent />}>
              <Route index element={< ListCard />}></Route>
              <Route path='/store/:type' element={< ListCard />}></Route>
            </Route>
            <Route path='/storeDetail/:id' element={< Detail />}></Route>
            <Route path='/order' element={<Order />}>
              <Route index path='/order/one' element={<Step1 />}></Route>
              <Route index path='/order/two' element={<Step2 />}></Route>
              <Route index path='/order/three' element={<Step3 />}></Route>
            </Route>
            <Route path='/user' element={<UserContent />}>
              <Route index element={<UserInfo />}></Route>
              <Route path='/user/buyHistory' element={<BuyHistory />}></Route>
            </Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/vet' element={<Vet />}></Route>
            <Route path='/lost' element={<Lost />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>

        </Layout>
        <Footer />
      </Layout>
    </ConfigProvider>
  )
}

export default App
