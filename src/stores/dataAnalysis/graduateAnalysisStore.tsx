import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  
} = api

class GraduateAnalysisStore{
  constructor(){
    makeObservable(this)
  }
  @observable data:any={}

  @action
  handelSth= async(params:any) => {

  }

}
export default new GraduateAnalysisStore()