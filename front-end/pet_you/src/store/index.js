//組合子模塊 封裝統一後導出使用
import React from 'react'

import { MenuStore } from "./menu.Store.js"
import { UserStore } from "./user.Store.js"
import { StoreStore } from "./store.Store.js"

class RootStore {
  constructor() {
    //對子模塊進行實例化
    this.menuStore = new MenuStore()
    this.userStore = new UserStore()
    this.storeStore = new StoreStore()
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

//通過useContext拿到rootStore實例對象 然後在業務組件中調用useStore()
const useStore = () => React.useContext(context)

export { useStore }