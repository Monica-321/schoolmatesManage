import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'
import {majorMap}from '@/utils/staticData'

const {
  getGenderRate,
  getEducationRate,
  getMajorNum,
  getPoliticalSta,
} = api

class BasicAnalysisStore{
  constructor(){
    makeObservable(this)
  }
  @observable genderRateData:any=[]
  @observable educationRateData:any=[]
  @observable majorNumData:any={}
  @observable politicalStaData:any={}

  //性别比例
  @action
  fetchGenderRate=async(params:any) => {
    let {status,success,msg, data} = await getGenderRate(params)
    if(success){
      runInAction(() => {
        for (let i=0;i<data.length;i++){
            switch(data[i].name){
              case 0: data[i].name='女';break;
              case 1: data[i].name='男';break;
              default: break;
            }
        }
        // console.log('data',data)
        this.genderRateData = data
      })
    }
    return {success,msg}
  }
  //学历结构
  @action
  fetchEducationRate=async(params:any) => {
    let {status,success,msg, data} = await getEducationRate(params)
    if(success){
      runInAction(() => {
        for (let i=0;i<data.length;i++){
            switch(data[i].name){
              case '0': data[i].name='本科生';break;
              case '1': data[i].name='硕士';break;
              default: break;
            }
        }
        // console.log('data',data)
        this.educationRateData = data
      })
    }
    return {success,msg}
  }

  //专业人数
  @action
  fetchMajorNum=async(params:any) => {
    let {status,success,msg, data} = await getMajorNum(params)
    if(success){
      runInAction(() => {
        for (let i=0;i<data.length;i++){
          for(let key in majorMap){
            if(data[i]._id===key){
              data[i]._id=majorMap[key]
            }
          }
        }

        let obj={}
        let majornames=[]
        let majorvalues=[]
        for (let i=0;i<data.length;i++){
          majornames.push(data[i]._id)
          majorvalues.push(data[i].value)
        }
        obj={majornames,majorvalues}

        console.log('data',data,obj)
        this.majorNumData = obj
        // this.majorNumData = {...data}
        // console.log('this.majorNumData',this.majorNumData)
      })
    }
    return {success,msg}
  }
  
  @action
  fetchPoliticalSta=async(params:any) => {
    let {status,success,msg, data} = await getPoliticalSta(params)
    if(success){
      runInAction(() => {
        let obj={}
        let politicalnames=[]
        let politicalvalues=[]
        for (let i=0;i<data.length;i++){
          politicalnames.push(data[i]._id)
          politicalvalues.push(data[i].value)
        }
        obj={politicalnames,politicalvalues}

        console.log('data',data,obj)
        this.politicalStaData = obj
      })
    }
    return {success,msg}
  }

}
export default new BasicAnalysisStore()