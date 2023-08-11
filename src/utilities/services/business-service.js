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

export async function getItemData(modelName, modelId) {
  console.log(modelName, modelId)
  // if (data.`active${modelName}`) {
  //   console.log('active model', data.active`${modelName}`)
  //   const item = data.active`${modelName}`.find(item => item._id === modelId);
  //   console.log('item', item)
  // }
}
