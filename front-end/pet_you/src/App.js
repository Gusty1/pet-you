import { Routes, Route } from "react-router-dom"
import { Layout, ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import { observer } from 'mobx-react-lite'
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

import { useStore } from './store/index.js'


function App () {
  const { menuStore } = useStore()

  window.onbeforeunload = () => {
    // Cookies.remove('userMenuSelected')
    // Cookies.remove('headerSelected')
    // Cookies.remove('storeMenuSelected')
    // Cookies.remove('uid')
  }

  return (
    <ConfigProvider locale={zhTW}>
      <Layout className="layout">
        {menuStore.error ? null : <Header />}
        <Layout style={{
          minHeight: '85.7vh',
        }}>

          <Routes>
            <Route path='/Pet_you' element={<StoreContent />}></Route>
            <Route path='/Pet_you/store' element={<StoreContent />}>
              <Route index element={< ListCard />}></Route>
              <Route path='/Pet_you/store/:type' element={< ListCard />}></Route>
            </Route>
            <Route path='/Pet_you/storeDetail/:id' element={< Detail />}></Route>
            <Route path='/Pet_you/order' element={<Order />}>
              <Route index path='/Pet_you/order/one' element={<Step1 />}></Route>
              <Route index path='/Pet_you/order/two' element={<Step2 />}></Route>
              <Route index path='/Pet_you/order/three' element={<Step3 />}></Route>
            </Route>
            <Route path='/Pet_you/user' element={<UserContent />}>
              <Route index element={<UserInfo />}></Route>
              <Route path='/Pet_you/user/buyHistory' element={<BuyHistory />}></Route>
            </Route>
            <Route path='/Pet_you/shop' element={<Shop />}></Route>
            <Route path='/Pet_you/vet' element={<Vet />}></Route>
            <Route path='/Pet_you/lost' element={<Lost />}></Route>
            <Route path="/Pet_you/:error" element={<ErrorPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>

        </Layout>
        {menuStore.error ? null : <Footer />}
      </Layout>
    </ConfigProvider>
  )
}

export default observer(App)
