import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'

const {
  getMajorAndClass,
  getClassPics,
  addGraduateMedia,
  deleteGraduateMedia,
} = api

class GraduateMediaStore{
  constructor(){
    makeObservable(this)
  }
  @observable majordata:any=[]
  @observable classPicsdata:any=[]
  // @action
  // fetchMajorAndClass=async(params:any) => {
  //   let {status,success,msg, data} = await getMajorAndClass(params)
  //   if(success){
  //     runInAction(() => {
  //       for (let i=0;i<data.length;i++){
  //         data[i].name=industryMap[data[i].name]
  //     }
  //       this.companyIndus = data
  //     })
  //   }
  //   return {success,msg}
  // }

  @action
  fetchClassPics=async(params:any) => {
    let {status,success,msg, data} = await getClassPics(params)
    if(success){
      runInAction(() => {
        this.classPicsdata = data
      })
    }
    return {success,msg}
  }

  @action
  createGraduateMedia=async(params:any) => {
    let {status,success,msg, data} = await addGraduateMedia(params)
    return {success,msg}
  }

  @action
  goGraMediasDelete=async(params:any) => {
    let {status,success,msg, data} = await deleteGraduateMedia(params)
    return {success,msg}
  }
}
export default new GraduateMediaStore()