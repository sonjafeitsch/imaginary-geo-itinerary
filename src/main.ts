import './style.scss';
import 'leaflet/dist/leaflet.css';
import { hideMap, initMap, showMap } from './map';
import store from './store';
import { hideItinerary, initItinerary, showItinerary } from './itinerary';
import { Itinerary } from './store.types';
import { hideMedia, initImage, showMedia } from './media';
import { initAppInfo, setAppInfoButtonColor, toggleAppInfo } from './app-info';

fetch('itinerary/index.json')
  .then((response) => response.json())
  .then((itinerary: Itinerary) => {
    itinerary.groups.forEach((group) =>
      group.tracks.forEach((track) => {
        const type = itinerary.types[track.type];
        track.color = type?.color || '#000000';
        track.symbol = type?.symbol || '';
      })
    );
    store.set.itinerary(itinerary);
  });

initMap();
initImage();
initItinerary();
initAppInfo();

const body = document.getElementsByTagName('body')[0];

body.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a': {
      store.set.selectAllGroups();
      break;
    }
    case 'n': {
      store.set.selectNoGroup();
      break;
    }
    case 'm': {
      enableMapMode();
      break;
    }
    case 'i': {
      enableImageMode();
      break;
    }
    case 'Escape': {
      enableDefaultMode();
      break;
    }
    case 'ArrowRight': {
      // case ' ': {
      store.set.nextImage();
      break;
    }
    case 'ArrowLeft': {
      store.set.previousImage();
      break;
    }
    case 'h':
    case 'F1': {
      toggleAppInfo();
      break;
    }
  }
});

function enableMapMode() {
  hideMedia();
  hideItinerary();
  setAppInfoButtonColor('black');
  showMap();
}

function enableDefaultMode() {
  showMedia('64h');
  showItinerary();
  setAppInfoButtonColor('inherit');
  showMap();
}

function enableImageMode() {
  showMedia('100vh');
  hideMap();
  hideItinerary();
  setAppInfoButtonColor('inherit');
}
