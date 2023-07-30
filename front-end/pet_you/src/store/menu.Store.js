import { makeAutoObservable } from "mobx"
import Cookies from 'js-cookie'

class MenuStore {

  userMenuSelected = Cookies.get('userMenuSelected') === undefined ? 'm-1' : Cookies.get('userMenuSelected')
  headerSelected = Cookies.get('headerSelected') === undefined ? 'h-2' : Cookies.get('headerSelected')
  storeMenuSelected = Cookies.get('storeMenuSelected') === undefined ? 's-1' : Cookies.get('storeMenuSelected')
  error = false

  constructor() {
    makeAutoObservable(this)
  }

  // get filterList () {
  //   return this.list.filter(item => item > 2)
  // }

  headerAcceptClick = (e) => {
    this.headerSelected = e.key
    if (e.key === 'h-2' || e.key === 'h-3' || e.key === 'h-1') this.storeMenuSelected = 's-1'
    Cookies.set('storeMenuSelected', this.storeMenuSelected)
    Cookies.set('headerSelected', this.headerSelected)
  }

  userMenuAcceptClick = (e) => {
    if (e.key === 'm-3') e.key = 'm-1'
    this.userMenuSelected = e.key
    Cookies.set('userMenuSelected', this.userMenuSelected)
  }

  storeMenuAcceptClick = (e) => {
    this.storeMenuSelected = e.key
    Cookies.set('storeMenuSelected', this.storeMenuSelected)
  }
  setError = () => {
    this.error = true
  }

}

export { MenuStore }