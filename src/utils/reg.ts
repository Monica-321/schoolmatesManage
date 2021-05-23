export const nameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,10}$/
export const userNameReg = /^[\w]{0,12}$/
export const platformNameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,8}$/
export const mainBodyReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,100}$/
// 手机
export const phoneReg = /^1\d{10}$/
// 固定电话
export const fixedPhoneReg = /(^400[0-9]{7}$)|(^800[0-9]{7}$)|(^[08]\d{2,4}-[1-9]\d{4,7}$)/
// 邮箱
export const emailReg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// 密码
export const pwdReg = /(?!^[",.@#$%^&*_-]+$)(?!^[0-9]+$)(?!^[a-zA-Z]+$)^[a-zA-Z0-9",.@#$%^&*_-]{6,20}$/
// 中文英文数字
export const znEnNumReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
// 中文英文数字-
export const znEnNumIncludeLineReg = /^[\u4E00-\u9FA5A-Za-z0-9-]+$/
// 英文数字_
export const enNumUnderlineReg = /^[A-Za-z0-9_]+$/
// 中文英文数字特殊符号含中英文的()
export const znEnNumSymbolIncludeBracketReg = /^[\u4E00-\u9FA5A-Za-z0-9,./\\()（）#^&*-_]+$/
// 中文英文数字特殊符号
export const znEnNumSymbolReg = /^[\u4E00-\u9FA5A-Za-z0-9,./\\@#$%^&*-_]+$/
// 中文英文数字特殊符号含""
export const znEnNumSymbolIncludeQuoteReg = /^[\u4E00-\u9FA5A-Za-z0-9"",./\\@#$%^&*-_]+$/
// 英文数字特殊符号
export const enNumSymbolReg = /^[A-Za-z0-9,./\\@#$%^&*-_]+$/
// 英文数字特殊符号含()
export const enNumSymbolIncludeBracketReg = /^[A-Za-z0-9,./\\()@#$%^&*-_]+$/
// 中文英文
export const znEnReg = /^[\u4E00-\u9FA5A-Za-z]+$/
// 空格
export const emptyReg = /\S/
// IP地址
export const IPReg = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])\.((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){2}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))(\/(([1-9])|([1-2]\d)|(3[0-2])))?$/
