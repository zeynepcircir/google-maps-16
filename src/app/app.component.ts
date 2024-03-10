import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  coordinates: any[] = [];

  @ViewChild(GoogleMap, { static: false }) set map(m: GoogleMap) {
    if (m) {
      this.initDrawingManager(m);
      this.drawingManager.addListener('polygoncomplete', (data: any) => {
        const coords = data.getPaths().Fg[0].Fg;
        for (let i = 0; i < coords.length; i++) {
          this.coordinates.push(coords[i].toJSON())
        }
      });
    }
  }

  display: any;
  myLatLng = { lat: 48.829677, lng: 2.239609 };

  mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 10,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
  };

  drawingManager: any;

  initDrawingManager(map: GoogleMap) {
    const drawingOptions = {
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      polygonOptions: {
        strokeColor: '#00ff00',
      },
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(
      drawingOptions
    );
    this.drawingManager.setMap(map.googleMap);
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
