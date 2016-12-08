import xhr from 'xhr';

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
// PASS URL IN HERE
export function fetchData(url) {
  return function thunk(dispatch) {
    xhr({
      url: url
    }, function (err, data) {
      var data = JSON.parse(data.body);
      var list = data.list;
      var dates = [];
      var temps = [];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }
      // RENAME self.props.dispatch TO dispatch
      dispatch(setData(data));
      dispatch(setDates(dates));
      dispatch(setTemps(temps));
      dispatch(setSelectedDate(''));
      dispatch(setSelectedTemp(null));
    });
  }
}
