import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp
} from '../action';

describe('actions', function() {
  describe('changeLocation', function(){
    it('should have a type of "CHANGE_LOCATION"', function(){
      expect(changeLocation().type).toEqual('CHANGE_LOCATION');
    });
    it('should pass on the location we pass in', function() {
    var location = 'Vienna, Austria';
    expect(changeLocation(location).location).toEqual(location);
    });
  });
  describe('setSelectedDate', function() {
    it('should have a type of SET_SELECTED_DATE', function() {
            expect(setSelectedDate().type).toEqual('SET_SELECTED_DATE');
        });

        it('should pass on the date we pass in', function() {
            var date = '2016-01-01';
            expect(setSelectedDate(date).date).toEqual(date);
        });
  });

  describe('setSelectedTemp', function() {
    it('should have a type of SET_SELECTED_TEMP', function() {
            expect(setSelectedTemp().type).toEqual('SET_SELECTED_TEMP');
        });

        it('should pass on the temp we pass in', function() {
            var temp = '31';
            expect(setSelectedTemp(temp).temp).toEqual(temp);
        });
  });
});
