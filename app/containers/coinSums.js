// hr solution
var coinSums = function(total){
  var counter = 0;
​
  (function recurse (index, remainder) {
    var coin = coins[index];
    
    if (index === 0) {
      counter++;
      return;
    }
    
    while (remainder >= 0) {
      recurse(index-1, remainder);
      remainder -= coin;
    }
  })(coins.length-1, total);
​
  return counter;
};