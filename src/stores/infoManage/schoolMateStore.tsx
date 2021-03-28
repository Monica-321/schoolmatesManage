import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  schoolMatesQuery,
  schoolMatesCreate,
  schoolMatesModify,
  schoolMatesDelete,
  schoolMatesDetail,
} = api

class SchoolMateStore{
  constructor(){
    makeObservable(this)
  }
  @observable schoolMatesTableData:any={}
  @observable schoolMateDetail:any={}

  //列表查询
  @action
  fetchTableData= async(params:any) => {
    let {status,success,msg, data} = await schoolMatesQuery(params)
    if(success){
      runInAction(() => {
        this.schoolMatesTableData = data
      })
    }
    return {success,msg}
  }

  //添加
  @action
  goschoolMatesCreate=async(params:any)=>{
    let {status,success,msg}=await schoolMatesCreate(params)
    return {success,msg}
  }

  //编辑
  @action
  goschoolMatesModify=async(params:any)=>{
    let {status,success,msg}=await schoolMatesModify(params)
    return {success,msg}
  }

  //删除
  @action
  goschoolMatesDelete=async(params:any)=>{
    let {status,success,msg}=await schoolMatesDelete(params)
    return {success,msg}
  }

  //详情查询
  @action
  fetchDetail= async(params:any) => {
    let {status,success,msg, data} = await schoolMatesDetail(params)
    if(success){
      runInAction(() => {
        this.schoolMateDetail = data
      })
    }
    return {success,msg}
  }

}
export default new SchoolMateStore()