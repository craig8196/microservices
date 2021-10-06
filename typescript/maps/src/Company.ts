
import faker from 'faker';
import { Mappable } from './CustomMap';


export class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'red';

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    const lat = parseFloat(faker.address.latitude());
    const lng = parseFloat(faker.address.longitude());
    this.location = { lat, lng };
  }

  markerContent() {
    return `
      <div>
        <h3>${this.companyName}</h3>
        <p>${this.catchPhrase}</p>
      </div>
    `;
  }

  getTitle() {
    return 'Company';
  }
}

