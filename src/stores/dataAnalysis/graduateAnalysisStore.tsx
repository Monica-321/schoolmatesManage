import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  getGraduateOption,
  getCompanyIndus,
  getCompanyScale,
  getCompanyRank,
} = api

class GraduateAnalysisStore{
  constructor(){
    makeObservable(this)
  }
  @observable graduateOption:any=[]
  @observable companyIndus:any=[]
  @observable companyScale:any=[]
  @observable companyRank:any={}

  @action
  fetchGraduateOption=async(params:any) => {
    let {status,success,msg, data} = await getGraduateOption(params)
    if(success){
      runInAction(() => {
        this.graduateOption = data
      })
    }
    return {success,msg}
  }

  @action
  fetchCompanyIndus=async(params:any) => {
    let {status,success,msg, data} = await getCompanyIndus(params)
    if(success){
      runInAction(() => {
        this.companyIndus = data
      })
    }
    return {success,msg}
  }

  @action
  fetchCompanyScale=async(params:any) => {
    let {status,success,msg, data} = await getCompanyScale(params)
    if(success){
      runInAction(() => {
        this.companyScale = data
      })
    }
    return {success,msg}
  }

  @action
  fetchCompanyRank=async(params:any) => {
    let {status,success,msg, data} = await getCompanyRank(params)
    if(success){
      runInAction(() => {
        this.companyRank =data
      })
    }
    return {success,msg}
  }

}
export default new GraduateAnalysisStore()