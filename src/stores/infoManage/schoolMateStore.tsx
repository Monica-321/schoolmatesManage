import { observable, action , makeObservable, runInAction } from 'mobx'
import moment from 'moment'
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
  fetchDetail= async(params:any,format:Boolean) => {
    let {status,success,msg, data} = await schoolMatesDetail(params)
    if(success){
      runInAction(() => {
        this.schoolMateDetail = data
      })
      if(format){
        // console.log('格式化')
        this.formatData()
      }
    }
    return {success,msg}
  }
  formatData=()=>{
    let {_id,id,name,gender,nationality,faculty,educationStatus,politicalStatus,yearOfEnrollment,yearOfGraduation,major,majorClass,
      graduateChoice, contactPhone,contactEmail,contactAddress,workArea,job,companyRank,companySize,salarybirthDate,salary,
      birthDate,homeTown,srcPlace,dstPlace} = this.schoolMateDetail
    birthDate=moment(birthDate)
    // TODO 地图相关全保持一致
    homeTown=homeTown.split(' ')  //级联需要[ , , ]
    srcPlace=srcPlace.split(' ')
    dstPlace=dstPlace.split(' ')
    this.schoolMateDetail = {_id,id,name,gender,nationality,faculty,educationStatus,politicalStatus,yearOfEnrollment,yearOfGraduation,major,majorClass,
      graduateChoice, contactPhone,contactEmail,contactAddress,workArea,job,companyRank,companySize,salarybirthDate,salary,
      birthDate,homeTown,srcPlace,dstPlace}
    console.log(this.schoolMateDetail)
  }

}
export default new SchoolMateStore()