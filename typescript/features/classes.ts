
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep');
  }

  protected drive(): void {
    console.log(`Starting ${this.color} vehicle.`);
  }
}

class Car extends Vehicle {

  constructor(color: string) {
    super(color);
  }

  startDriving(): void {
    this.honk();
    this.drive();
  }
}

const car = new Car('red');
car.startDriving();


