// 'number' in the next line is a type annotation
var apples = 5;
// let allows reassignment
var n = 1;
// error!
// n = 'asdf';
// more examples
var nothing = null;
var nonothing = undefined;
var s = 'asdf';
// built in objects
var now = new Date();
// Array
var colors = ['red', 'green', 'blue'];
console.log(colors);
// Classes
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());
var car = new Car();
// Object literal
var point = { x: 11, y: 21, z: 31 };
console.log(point);
// Function
var logNumber = function (i) { console.log(i); };
logNumber(6);
// Function that returns 'any' type
var json = '{"x": 10, "y": 20}';
var coord = JSON.parse(json);
console.log(coord.x, coord.y);
var words = ['red', 'green', 'blue'];
var foundWord;
for (var i = 0; i < words.length; ++i) {
    if (words[i] === 'green') {
        foundWord = true;
    }
}
console.log(foundWord);
for (; ; )
    : : ;
{
}
