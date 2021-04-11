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
  fetchDetail= async(params:any,format:Boolean) => {
    let {status,success,msg, data} = await schoolCompaniesDetail(params)
    if(success){
      runInAction(() => {
        this.schoolCompanyDetail = data
      })
      if(format){
        // console.log('格式化')
        this.formatData()
      }
    }
    return {success,msg}
  }
  formatData=()=>{
    let {_id,companyName,companyType,companySize,companyCity,companyAddress,
      companyWebsite,companyPhone,companyEmail,companyDescription} = this.schoolCompanyDetail
    // TODO 地图相关全保持一致
    companyCity=companyCity.split(' ')  //级联需要[ , , ]
    this.schoolCompanyDetail = {_id,companyName,companyType,companySize,companyCity,companyAddress,
      companyWebsite,companyPhone,companyEmail,companyDescription}
    console.log(this.schoolCompanyDetail)
  }

}
export default new SchoolCompanyStore()