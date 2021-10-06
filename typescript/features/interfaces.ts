
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
  summary(): string;
}


const oldCivic: Vehicle = {
  name: 'civic',
  year: 2000,
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const printVehicle = ({ name, year, broken }: Vehicle): void => {
  console.log(name);
  console.log(year);
  console.log(broken);
};

printVehicle(oldCivic);
console.log(oldCivic.summary());

