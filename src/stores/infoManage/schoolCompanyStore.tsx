import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  schoolCompaniesQuery,
  schoolCompaniesCreate,
  schoolCompaniesModify,
  schoolCompaniesDelete,
  schoolCompaniesDetail,
} = api

class SchoolCompanyStore{
  constructor(){
    makeObservable(this)
  }
  @observable schoolCompaniesTableData:any={}
  @observable schoolCompanyDetail:any={}

  //列表查询
  @action
  fetchTableData= async(params:any) => {
    let {status,success,msg, data} = await schoolCompaniesQuery(params)
    if(success){
      runInAction(() => {
        this.schoolCompaniesTableData = data
      })
    }
    return {success,msg}
  }

  //添加
  @action
  goschoolCompaniesCreate=async(params:any)=>{
    let {status,success,msg}=await schoolCompaniesCreate(params)
    return {success,msg}
  }

  //编辑
  @action
  goschoolCompaniesModify=async(params:any)=>{
    let {status,success,msg}=await schoolCompaniesModify(params)
    return {success,msg}
  }

  //删除
  @action
  goschoolCompaniesDelete=async(params:any)=>{
    let {status,success,msg}=await schoolCompaniesDelete(params)
    return {success,msg}
  }

  //详情查询
  @action
  fetchDetail= async(params:any) => {
    let {status,success,msg, data} = await schoolCompaniesDetail(params)
    if(success){
      runInAction(() => {
        this.schoolCompanyDetail = data
      })
    }
    return {success,msg}
  }

}
export default new SchoolCompanyStore()