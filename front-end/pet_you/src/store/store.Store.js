import { makeAutoObservable } from "mobx"

class StoreStore {
  storeObj = {
    pageNum: 1,
    name: '',
    order: 'ASC'
  }
  changeOrderCar = false
  orderStep = 0
  orderTotal = 0

  constructor() {
    makeAutoObservable(this)
  }

  setStoreObj = (e) => {
    this.storeObj = e
  }

  setChangeOrderCar = () => {
    this.changeOrderCar = !this.changeOrderCar
  }

  setOrderStep = (current) => {
    this.orderStep = current
  }

  setOrderTotal = (total) => {
    this.orderTotal = total
  }

}

export { StoreStore }