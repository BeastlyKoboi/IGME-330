const init = () => {
    console.log("salkdjfhldjf asdlfkjas jljskaf dhdf jashjkldkhjdsfhjkdf hjkdsfjkhfhjkhjkfsshkjdhjkfkshjd khjdfhjkdsfhjk");

    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVhc3RseWtvYm9pIiwiYSI6ImNsb3g4c250ZDAwd3kya3JvZnI2YjBqd3EifQ.aBenoLkXcvaQ3pTuruoxGw';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-96, 37.8],
        zoom: 3
    });

    // code from the next step will go here!
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-77.032, 38.913]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Washington, D.C.'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }
            },
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "Point",
                    coordinates: [
                        -77.67220600186705,
                        43.08175623413075
                    ],
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Rochester Institute of Technology, NY'
                }
            }
        ]
    };

    // add markers to map
    for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                    )
            )
            .addTo(map);

    }
}

export { init };