import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'
import {industryMap} from '@/utils/staticData'
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
        for (let i=0;i<data.length;i++){
          data[i].name=industryMap[data[i].name]
      }
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
        let obj={}
        let ranknames=[]
        let rankvalues=[]
        for (let i=0;i<data.length;i++){
          ranknames.push(data[i]._id)
          rankvalues.push(data[i].value)
        }
        obj={ranknames,rankvalues}

        console.log('data',data,obj)
        this.companyRank =obj
      })
    }
    return {success,msg}
  }

}
export default new GraduateAnalysisStore()