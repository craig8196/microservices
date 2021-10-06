
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };

  markerContent(): string;

  color: string;

  getTitle(): string;
};

export class CustomMap {
  private map: google.maps.Map;

  constructor(elId: string) {
    this.map = new google.maps.Map(document.getElementById(elId) as Element, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMarker(mappable: Mappable) {
    const marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      },
      label: {
        color: mappable.color,
        text: mappable.getTitle(),
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });
      infoWindow.open(this.map, marker);
    });
  }
};

