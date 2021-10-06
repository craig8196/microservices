
// 'number' in the next line is a type annotation
const apples: number = 5;

// let allows reassignment
let n: number = 1;

// error!
// n = 'asdf';

// more examples
let nothing: null = null;
let nonothing: undefined = undefined;
let s: string = 'asdf';

// built in objects
let now: Date = new Date();


// Array
let colors: string[] = ['red', 'green', 'blue'];
console.log(colors);

// Classes
class Car { // typically have an UppderCase starting word
}
let car: Car = new Car();

// Object literal
let point: { x: number; y: number, z: number } = { x: 11, y: 21, z: 31 };
console.log(point);

// Function
const logNumber: (i: number) => void  = (i: number) => { console.log(i); };
logNumber(6);

// Function that returns 'any' type
const json = '{"x": 10, "y": 20}';
const coord: { x: number, y: number } = JSON.parse(json);
console.log(coord.x, coord.y);

// Declaration and initialization separated
let words = [ 'red', 'green', 'blue' ];
let foundWord: boolean;

for (let i = 0; i < words.length; ++i) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}
console.log(foundWord);

// Variable type cannot be inferred correctly
let number = [ -10, -2, 17 ];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < number.length; ++i) {
  if (number[i] > 0) {
    numberAboveZero = number[i];
    break;
  }
}


