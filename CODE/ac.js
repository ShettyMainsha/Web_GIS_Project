// Initialize the map for 'map_PC'
var map_AC = new ol.Map({
    target: 'map_AC',
    view: new ol.View({
        center: [80.79177015731213, 22.000720899771604], // Centered on India
        projection: 'EPSG:4326',
        zoom: 4.5
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

var geoserverLayerSourceAC = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/project/wms',
    params: {
        'LAYERS': 'project:india_ac',
        'TILED': true
    }
});

var layer_AC = new ol.layer.Tile({
    source: geoserverLayerSourceAC
});

map_AC.addLayer(layer_AC);


function applyFilterST_AC(geoserverLayerSourceAC) {
    const value = document.getElementById('filterST').value;
    console.log(value)
    if (value === "None") {
        geoserverLayerSourceAC.updateParams({
            'CQL_FILTER': ''
        });
    }
    const main = "ST_NAME ilike " +  "'%" + `${value}` + "%'"
    console.log(main)
    geoserverLayerSourceAC.updateParams({
        'CQL_FILTER': main
    });
}



function applyFilterPT_AC() {
    const value = document.getElementById('filterPT').value;
    console.log(value)
    if (value === "None") {
        geoserverLayerSourceAC.updateParams({
            'CQL_FILTER': ''
        });
    }
    const main = "Party ilike " +  "'%" + `${value}` + "%'"
    console.log(main)
    geoserverLayerSourceAC.updateParams({
        'CQL_FILTER': main
    });
}


function applyFilterRS_AC() {
    const value = document.getElementById('filterRS').value;
    console.log(value)
    if (value === "None") {
        geoserverLayerSourceAC.updateParams({
            'CQL_FILTER': ''
        });
    }
    const main = "AC_Type ilike " + "'%" + `${value}` + "%'"
    console.log(main)
    geoserverLayerSourceAC.updateParams({
        'CQL_FILTER': main
    });
}


function popupAC(map_AC, geoserverLayerSourceAC) {
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    map_AC.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map_AC.on('singleclick', function (evt) {
        var viewResolution = map_AC.getView().getResolution();
        var coordinate = evt.coordinate;
        var url = geoserverLayerSourceAC.getFeatureInfoUrl(
            coordinate, viewResolution, 'EPSG:4326',
            { 'INFO_FORMAT': 'application/json' }
        );
        // console.log(url)

        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.features && data.features.length > 0) {
                        var feature = data.features[0];
                        // console.log(feature)
                        var properties = feature.properties;
                        var formattedContent = `
                                    <div class="popup-header">
            <h3>Assembly Contituency Information</h3>
            
        </div>
        <table>
            <tr>
                <td style="width: auto;">State Name:</td>
                <td style="width: auto;">${properties.ST_NAME}</td>
            </tr>
            <tr>
                <td style="width: auto;">District Name:</td>
                <td style="width: auto;">${properties.DIST_NAME}</td>
            </tr>
            <tr>
                <td style="width: auto;">Parliamentary Contituency:</td>
                <td style="width: auto;">${properties.PC_NAME}</td>
            </tr>
            <tr>
                <td style="width: auto;">Assembly Contituency:</td>
                <td style="width: auto;">${properties.AC_NAME}</td>
            </tr>
            <tr>
                <td style="width: auto;">No. of Polling Booth:</td>
                <td style="width: auto;">${properties.No_of_boot}</td>
            </tr>
            <tr>
                <td style="width: auto;">Party Name:</td>
                <td style="width: auto;">${properties.Party}</td>
            </tr>
            <tr>
                <td style="width: auto;">Assembly Contituency Type:</td>
                <td style="width: auto;">${properties.AC_Type}</td>
            </tr>
            <tr>
                <td style="width: auto;">Area (km²):</td>
                <td style="width: auto;">${properties.area_km2}</td>
            </tr>

                                
                                `;
                        // console.log(formattedContent)
                        content.innerHTML = formattedContent;
                        overlay.setPosition(coordinate);
                    } else {
                        content.innerHTML = 'No feature information found.';
                        overlay.setPosition(coordinate);
                    }
                })
                .catch(error => {
                    console.error('Error fetching feature info:', error);
                    content.innerHTML = 'Error fetching feature info.';
                    overlay.setPosition(coordinate);
                });
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
}


function applyMap() {
    // Hide all maps
    document.querySelectorAll('.mapstyle').forEach(map => map.style.display = 'none');

    // Get the selected map
    var selectedMap = document.querySelector('input[name="layer"]:checked').value;
    console.log(selectedMap)
    if (selectedMap === 'map_AC') {
        popupAC(map_AC, geoserverLayerSourceAC);
    }
    else if (selectedMap === 'map_PC') {
        popupPC(map_PC, geoserverLayerSourcePC);
    }
    document.getElementById(selectedMap).style.display = 'block';
}