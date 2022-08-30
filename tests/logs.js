const DateClass = require('../src/DateClass');

const date = new DateClass();

console.log(1, date.getNowClient())
console.log(2, date.getNowUTC())
console.log(3, date.getClientToUTC('2022-08-30 10:43:14'))
console.log(4, date.getUTCToClient('2022-08-30 13:43:14'))
console.log(5, date.getUTCToTimezone('2022-08-30 13:43:14', 'America/New_York'))
