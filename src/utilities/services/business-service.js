import { model } from 'mongoose';
import { allData } from '../DataContext';

export function convertDate(date) {
  try {
    const convertedDate = new Date(date).toISOString().split('T')[0]; // Use index 0 for the date
    // console.log('business service convert date function', convertedDate)
    return convertedDate;
  } catch (err) {
    console.log('Error at convertDate in trips-service.js', err);
    throw err;
  }
}

export function convertDateToDetail(date) {
  const detailedDay = new Date(date);

  const dayOfWeekShort = detailedDay.toLocaleString('default', { weekday: 'short' });
  const monthNumber = detailedDay.getMonth() + 1;
  const dayOfMonth = detailedDay.getDate();

  return `${dayOfWeekShort} ${monthNumber}/${dayOfMonth}`;
}

export function convertDateToLongDetail(date) {
  const detailedDay = new Date(date);
  const dayOfWeek = detailedDay.toLocaleString('default', { weekday: 'long' });
  const month = detailedDay.toLocaleString('default', { month: 'long' });
  const dayOfMonth = detailedDay.getDate();
  let daySuffix;
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    daySuffix = 'st';
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    daySuffix = 'nd';
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }
  return `${dayOfWeek}, ${month} ${dayOfMonth}${daySuffix}`;
}
