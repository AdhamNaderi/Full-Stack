var num1 = 14;
var num2 = 3;
var num3 = 17;

console.log(num1);
console.log(num2);
console.log(num3);

function findLargest(num1, num2, num3) {
    var largest = num1;
    if (num2 > largest) {
      largest = num2;
    }
    if (num3 > largest) {
      largest = num3;
    }
    console.log("\r\nThe largest number is " + largest);  
  }
findLargest(num1, num2, num3); 