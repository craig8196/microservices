
const carMakers: string[] = ['ford', 'toyota', 'chevy'];
carMakers.push(JSON.stringify(100));
console.log(carMakers);

const dim2: string[][] = [['two'], ['dimensional', 'array']];
console.log(dim2);

const dates: (string | Date)[] = [ '2021-10-20', new Date() ];
console.log(dates);

