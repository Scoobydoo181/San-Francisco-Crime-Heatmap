const baseLayer = L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20
            })
            
const heatmapLayer = new HeatmapOverlay({
    scaleRadius: true, 
    radius: 0.01, 
    blur: 0.99,
    // gradient: {
    //     "0.01": "#F6DFDF",
    //     "0.2": "#F6BDC0",
    //     "0.4": "#F1959B",
    //     "0.6": "#F07470",
    //     "0.8": "#CB423D",
    //     "1": "#A7150E"
    // }
})
            
const map = new L.Map('heatmap', {
    center: new L.LatLng(37.759078, -122.451126),
    zoom: 13,
    layers: [baseLayer, heatmapLayer]
})