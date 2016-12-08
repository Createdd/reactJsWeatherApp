export function changeLocation(location){
  return{
    type: 'CHANGE_LOACTION',
    location: location
  };
}
export function setSelectedDate(date) {
  return {
    type: 'SET_SELCTED_DATE',
    date: date
  };
}
export function setSelectedTemp(temp) {
  return {
    type: 'SET_SELCTED_TEMP',
    temp: temp
  };
}
