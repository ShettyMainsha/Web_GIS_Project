// Initialize the map for 'map_PC'
var map_PC = new ol.Map({
    target: 'map_PC',
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

var geoserverLayerSourcePC = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/project/wms',
    params: {
        'LAYERS': 'project:india_pc_2019',
        'TILED': true
    }
});

var layer_PC = new ol.layer.Tile({
    source: geoserverLayerSourcePC
});

map_PC.addLayer(layer_PC);




function applyFilterST_PC(geoserverLayerSourcePC) {
    const value = document.getElementById('filterST').value;
    console.log(value)
    if (value === "None") {
        geoserverLayerSourceAC.updateParams({
            'CQL_FILTER': ''
        });
    }
    const main = "ST_NAME ilike " +  "'%" + `${value}` + "%'"
    console.log(main)
    geoserverLayerSourcePC.updateParams({
        'CQL_FILTER': main
    });
}


function applyFilterPT_PC() {
    const value = document.getElementById('filterPT').value;
    console.log(value)
    if (value === "None") {
        geoserverLayerSourcePC.updateParams({
            'CQL_FILTER': ''
        });
    }
    const main = "Party ilike " +  "'%" + `${value}` + "%'"
    console.log(main)
    geoserverLayerSourcePC.updateParams({
        'CQL_FILTER': main
    });
}


function applyFilterRS_PC() {
    const value = document.getElementById('filterRS').value;
    console.log(value)
    if (value === "None") {
        geoserverLayerSourcePC.updateParams({
            'CQL_FILTER': ''
        });
    }
    const main = "PC_type ilike " + "'%" + `${value}` + "%'"
    console.log(main)
    geoserverLayerSourcePC.updateParams({
        'CQL_FILTER': main
    });
}


function popupPC(map_PC, geoserverLayerSourcePC) {
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

    map_PC.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map_PC.on('singleclick', function (evt) {
        var viewResolution = map_PC.getView().getResolution();
        var coordinate = evt.coordinate;
        var url = geoserverLayerSourcePC.getFeatureInfoUrl(
            coordinate, viewResolution, 'EPSG:4326',
            { 'INFO_FORMAT': 'application/json' }
        );
        console.log(url)

        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.features && data.features.length > 0) {
                        var feature = data.features[0];
                        var properties = feature.properties;
                        var formattedContent = `
                                    <div class="popup-header">
            <h3>Parliamentary Contituency Information</h3>
            
        </div>
        <table>
            <tr>
                <td style="width: auto;">State Name:</td>
                <td style="width: auto;">${properties.ST_NAME}</td>
            </tr>
            <tr>
                <td style="width: auto;">Parliamentary Constituency:</td>
                <td style="width: auto;">${properties.PC_NAME}</td>
            </tr>
            <tr>
                <td style="width: auto;">Number of Polling Booth:</td>
                <td style="width: auto;">${properties.No_of_boot}</td>
            </tr>
            <tr>
                <td style="width: auto;">Candidate Name:</td>
                <td style="width: auto;">${properties.Candidate_}</td>
            </tr>
            <tr>
                <td style="width: auto;">Party Name:</td>
                <td style="width: auto;">${properties.Party}</td>
            </tr>
            <tr>
                <td style="width: auto;">Parliamentary Constituency Type:</td>
                <td style="width: auto;">${properties.PC_type}</td>
            </tr>
            <tr>
                <td style="width: auto;">Winning Margin:</td>
                <td style="width: auto;">${properties.Winning_Ma}</td>
            </tr>
            <tr>
                <td style="width: auto;">Area (km²):</td>
                <td style="width: auto;">${properties.area_km2}</td>
            </tr>

                                `;
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