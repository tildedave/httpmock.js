var request = {
  uri : function (regexp) {
    var re = new RegExp(regexp);
    
    var obj = {
      matches: function (str) {
        return str.match(re) !== null;
      }
    };

    return obj;
  }
};

module.exports = request;
