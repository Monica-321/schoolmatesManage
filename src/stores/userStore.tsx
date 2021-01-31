import { observable, action , makeObservable } from 'mobx'
// import api from '@/api'

// const {
  
// } = api

class UserStore{

  constructor(){
    makeObservable(this)
  }


  // @observable 

  @action
  handelLogin(params:any) {
    
  }

  @action
  handelRegister(params:any) {
    
  }
}
export default new UserStore();