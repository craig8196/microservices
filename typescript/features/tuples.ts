
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};

type Drink = [string, boolean, number];
const tuple: Drink = ['brown', true, 40];
console.log(tuple);

