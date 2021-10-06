
const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age;
  }
};
console.log(profile);
profile.setAge(30);
console.log(profile);
const { age }: { age: number } = profile;
console.log(age);

const {
  coords: { lat, lng }
}: { coords: { lat: number, lng: number } } = profile;

console.log(lat);
console.log(lng);

