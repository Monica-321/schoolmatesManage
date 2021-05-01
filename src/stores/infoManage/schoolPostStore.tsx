import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  schoolPostsQuery,
  schoolPostsCreate,
  schoolPostsModify,
  schoolPostsDelete,
  schoolPostsDetail,
} = api

class SchoolPostStore{
  constructor(){
    makeObservable(this)
  }
  @observable schoolPostsTableData:any={}
  @observable schoolPostDetail:any={}

  //列表查询
  @action
  fetchTableData= async(params:any) => {
    let {status,success,msg, data} = await schoolPostsQuery(params)
    if(success){
      runInAction(() => {
        this.schoolPostsTableData = data
      })
    }
    return {success,msg}
  }

  //添加
  @action
  goschoolPostsCreate=async(params:any)=>{
    let {status,success,msg}=await schoolPostsCreate(params)
    return {success,msg}
  }

  //编辑
  @action
  goschoolPostsModify=async(params:any)=>{
    let {status,success,msg}=await schoolPostsModify(params)
    return {success,msg}
  }

  //删除
  @action
  goschoolPostsDelete=async(params:any)=>{
    let {status,success,msg}=await schoolPostsDelete(params)
    return {success,msg}
  }

  //详情查询
  @action
  fetchDetail= async(params:any,format:Boolean) => {
    let {status,success,msg, data} = await schoolPostsDetail(params)
    if(success){
      runInAction(() => {
        this.schoolPostDetail = data
      })
    }
    return {success,msg}
  }

}
export default new SchoolPostStore()