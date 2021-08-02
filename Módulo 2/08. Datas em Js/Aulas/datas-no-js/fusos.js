const {zonedTimeToUtc, utcToZonedTime,format} = require('date-fns-tz');

const utcDate = zonedTimeToUtc('2018-09-01 18:01:36.386', 'Europe/Berlin');

console.log(utcDate);

const date = new Date('2018-09-01 16:01:36.386');
const timeZone = 'Europe/Berlin';
const zonedDate = utcToZonedTime(date,timeZone,timeZone);

const pattern = 'd.M.yyyy HH:mm:ss.SSS \'GMT\' XXX (z)';
const output = format(zonedDate, pattern, {timeZone: 'Europe/Berlin'});

console.log(output);