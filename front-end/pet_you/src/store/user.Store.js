import { makeAutoObservable } from "mobx"
import Cookies from 'js-cookie'

class UserStore {
  userCookie = Cookies.get('uid') === undefined ? null : Cookies.get('uid')

  constructor() {
    makeAutoObservable(this)
  }

  setUserCookie = (e) => {
    Cookies.set('uid', e)
    this.userCookie = e
  }

  userRemoveCookie = () => {
    Cookies.remove('uid')
    this.userCookie = null
  }
}

export { UserStore }