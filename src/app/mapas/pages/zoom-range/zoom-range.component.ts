import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.less']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //Es el tipado y ayuda a ver sus propiedades/mètodos
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-75.921029433568, 45.28719674822362];
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() {
    //console.log('constructor', this.divMapa);
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { });
    this.mapa.off('zooEnd', () => { });
    this.mapa.off('move', () => { });
  }

  ngAfterViewInit(): void {
    //console.log('oninit', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //Crea un listener
    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom();
    });

    //Crea un listener
    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    //Movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });


  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));

  }

}
