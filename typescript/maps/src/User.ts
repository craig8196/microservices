
import faker from 'faker';
import { Mappable } from './CustomMap';


export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'blue';

  constructor() {
    this.name = faker.name.firstName();
    const lat = parseFloat(faker.address.latitude());
    const lng = parseFloat(faker.address.longitude());
    this.location = { lat, lng };
  }

  markerContent() {
    return `${this.name}`;
  }

  getTitle() {
    return 'User';
  }
}

