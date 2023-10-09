// https://leafletjs.com/
import scrollspy from '../utils/scrollspy';

const maps = document.querySelectorAll('.js-map');
let leafletLoaded = false;

class Map {
    constructor (div) {
        this.map = div;

        if (!leafletLoaded) {
            this.addFiles();
        } else {
            this.init();
        }
    }

    addFiles () {
        // JS
        this.leafletJS = document.createElement('script');
        this.leafletJS.type = 'text/javascript';
        // this.leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        this.leafletJS.src = '/assets/js/leaflet.min.js';
        document.getElementsByTagName('body')[0].appendChild(this.leafletJS);
        
        // CSS
        this.leafletCSS = document.createElement('link');
        this.leafletCSS.rel = 'stylesheet';
        // this.leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        this.leafletCSS.href = '/assets/css/leaflet.min.css';
        document.getElementsByTagName('head')[0].appendChild(this.leafletCSS);
        
        this.leafletJS.addEventListener('load', () => {
            leafletLoaded = true;
            this.init();
        });
    }

    init () {
        let location = JSON.parse(this.map.dataset.location),
            coordinate = location.coordinates.reverse(),
            zoom = JSON.parse(this.map.dataset.zoom),
            markerHidden = this.map.dataset.markerHidden || false,
            newIcon = false,
            map = false;

        // options
        map = L.map(this.map, {
            center: coordinate, 
            zoom: zoom,
            scrollWheelZoom: false
        });

        // add tiles
        // https://leafletjs.com/reference.html#tilelayer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // new icon
        // https://leafletjs.com/reference.html#icon
        if (!markerHidden) {
            newIcon = L.icon({
                iconUrl: '/assets/images/map-marker.svg',
                iconSize:     [50, 50],
                iconAnchor:   [25, 40]
            });
            // add marker to map
            L.marker(coordinate, {icon: newIcon}).addTo(map);
        }
    }
}

maps.forEach((map) => {
    scrollspy(map, () => {
        new Map(map);
    });
});