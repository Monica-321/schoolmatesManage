const login = require('./login.js');
const mockData = {
  ...login,
};

module.exports = ()=>{
  return mockData;
};