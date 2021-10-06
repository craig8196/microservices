
//import { User } from './User';
//import { Company } from './Company';
//
//const user = new User();
//const comp = new Company();
//
//console.log(user);
//console.log(comp);

//new google.maps.Map(document.getElementById('map') as Element, {
//  zoom: 1,
//  center: {
//    lat: 0,
//    lng: 0
//  }
//});

import { CustomMap } from './CustomMap';
import { User } from './User';
import { Company } from './Company';

const map = new CustomMap('map');
map.addMarker(new User());
map.addMarker(new Company());


