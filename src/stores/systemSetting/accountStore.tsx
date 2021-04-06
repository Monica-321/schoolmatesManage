import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  adminsQuery,
  adminsCreate,
  adminsModify,
  adminsDelete,
  toOnOrOff,
} = api

class AccountStore{
  constructor(){
    makeObservable(this)
  }
  @observable adminsTableData:any={}

  //列表查询
  @action
  fetchTableData= async(params:any) => {
    let {status,success,msg, data} = await adminsQuery(params)
    if(success){
      runInAction(() => {
        this.adminsTableData = data
      })
    }
    return {success,msg}
  }

   //添加
   @action
   goAdminsCreate=async(params:any)=>{
     let {status,success,msg}=await adminsCreate(params)
     return {success,msg}
   }
 
   //编辑
   @action
   goAdminsModify=async(params:any)=>{
     let {status,success,msg}=await adminsModify(params)
     return {success,msg}
   }

  //删除
  @action
  goAdminsDelete=async(params:any)=>{
    let {status,success,msg}=await adminsDelete(params)
    return {success,msg}
  }

  //启用停用
  @action
  goOnOrOff=async(params:any)=>{
    let {status,success,msg}=await toOnOrOff(params)
    return {success,msg}
  }

}
export default new AccountStore()