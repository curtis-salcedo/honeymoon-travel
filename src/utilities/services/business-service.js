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