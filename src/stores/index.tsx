import userStore from './userRelated/userStore'
import accountStore from './systemSetting/accountStore'
import schoolMateStore from './infoManage/schoolMateStore'
import schoolCompanyStore from './infoManage/schoolCompanyStore'
import basicAnalysisStore from './dataAnalysis/basicAnalysisStore'
import graduateAnalysisStore from './dataAnalysis/graduateAnalysisStore'
import graduateMediaStore from './mediaManage/graduateMediaStore'
import schoolPostStore from './infoManage/schoolPostStore'

const store = {
  userStore,
  accountStore,
  schoolMateStore,
  schoolCompanyStore,
  schoolPostStore,
  basicAnalysisStore,
  graduateAnalysisStore,
  graduateMediaStore,
}

export default store
