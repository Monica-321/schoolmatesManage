import userStore from './userRelated/userStore'
import accountStore from './systemSetting/accountStore'
import schoolMateStore from './infoManage/schoolMateStore'
import schoolCompanyStore from './infoManage/schoolCompanyStore'
import basicAnalysisStore from './dataAnalysis/basicAnalysisStore'
import graduateAnalysisStore from './dataAnalysis/graduateAnalysisStore'
import graduateMediaStore from './mediaManage/graduateMediaStore'

const store = {
  userStore,
  accountStore,
  schoolMateStore,
  schoolCompanyStore,
  basicAnalysisStore,
  graduateAnalysisStore,
  graduateMediaStore,
}

export default store
