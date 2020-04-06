const OptionFilter = {
  selector: 'optionFilter',
  filter: function () {
    return function (item, arr) {
      var result = arr.filter(val => {
        return val.value == item;
      });
      if (result.hasOwnProperty(0)) {
        return result[0].name || 'No name';
      }
      return 'No name';
    }
  }
};

export default OptionFilter;
