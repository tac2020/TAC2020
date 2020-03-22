import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import ReactDOM from 'react-dom';
import { Card, Typography, CardContent, CardActionArea, CardActions, Button } from '@material-ui/core';
import { ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import DataVis from './vis';
import LearnMore from './info';
// import Helplines from './data.json';
// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidWRpdGd1cnUiLCJhIjoiY2luNDJrdDBvMDByNnY5bTFwODF3bGdlNyJ9.t0KlYHtINMl6zmIXPByF_g';

// Initial viewport settings
const initialViewState = {
    longitude: 10,
    latitude: 19,
    zoom: 1.4,
    pitch: 0,
    bearing: 0
};

// Data to be used by the LineLayer

function Map() {
    const [data, setData] = useState(null);
    const [showHelp, setShowhelp] = useState([])
    const [learn,setLearn ] = useState(false);
    const dataFetch = async () => {
        let info = await fetch("https://coronavirus-tracker-api.herokuapp.com/all")
            .then(res => res.json())
            .then(result => result);
        let infected = info.confirmed;
        let deaths = info.deaths;
        let recovered = info.recovered;

        let aggdata = info.confirmed.locations.map((item, index) => {
            var rst = {
                "coordinates": [parseFloat(item.coordinates.long), parseFloat(item.coordinates.lat)],
                "numbers": item.latest,
                "country": item.country,
                "province" : item.province === "" ? null : item.province,
                "code": item.country_code,
                "deaths": deaths.locations[index].latest,
                "recovered": recovered.locations[index].latest,
                "geometry" : {
                    "type" : "Polygon",
                    "coordinates" : [parseFloat(item.coordinates.long), parseFloat(item.coordinates.lat)]
                }
            }
            return rst;
        });
        setData({
            "infected": infected.latest,
            "deaths": deaths.latest,
            "recovered": recovered.latest,
            "data": aggdata
        })
        setShowhelp(aggdata);
        return aggdata;
    }

    const layer = [
        new ScatterplotLayer({
            id: 'scatter-plot',
            data: showHelp,
            radiusScale: 120,
            radiusMaxPixels: 20,
            radiusMinPixels: 5,
            getRadius: d => d.numbers,
            getPosition: d => d.coordinates,
            getFillColor: d => d.numbers >= 1000 ? [255, 0, 0] : d.numbers > 100 ? [255, 165, 0] : d.numbers === 0 ? [255, 255, 0, 20] : [255, 199, 0],
            pickable: true,
            onClick: (info) => setTooltip(info.object, info.x, info.y)
        })
    ];

    // const layer = new GeoJsonLayer({
    //     data: showHelp ,
    //     opacity: 0.8,
    //     stroked: false,
    //     filled: true,
    //     extruded: true,
    //     wireframe: true,
    //     fp64: true,
  
    //     getFillColor: f => [255,123,200],
    //     getLineColor: [255, 255, 255],
  
    //     pickable: true,
    //     onHover: (info) => setTooltip(info.object, info.x, info.y)
    //   });
  

    function setTooltip(object, x, y) {

        const el = document.getElementById('tooltip');

        ReactDOM.unmountComponentAtNode(el);

        if (object) {
            el.style.display = 'block';
            ReactDOM.render(<DataVis data={object} country={object.country} code={object.code} />, el)
        } else {
            el.style.display = 'none';
        }
    }

    function toggleBTN(){
        setLearn(true ? false : true);
    }

    useEffect(() => {
        dataFetch()
    },[])
    return (
        <div>
            <DeckGL controller={true} initialViewState={initialViewState} layers={layer} >
                <StaticMap mapStyle="mapbox://styles/mapbox/dark-v10" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                {
                    data &&
                    <div style={{ display: "flex", borderRadius: "25px", minWidth: "40%", maxWidth: "90%", margin: "auto", marginTop: "2%", zIndex: 99, color: "white", backgroundColor: "rgba(0,0,10,0.5)" }} >
                        <div style={{ width: "33.33%" }}>
                            <h6>Total Infected Globally</h6>
                            <h3> {data.infected} </h3>
                        </div>
                        <div style={{ width: "33.33%" }}>
                            <h6>Total Deaths Globally</h6>
                            <h3> {data.deaths} </h3>
                        </div>
                        <div style={{ width: "33.33%" }}>
                            <h6>Total Recovered Globally</h6>
                            <h3> {data.recovered} </h3>
                        </div>
                    </div>
                }
                <div id="tooltip" style={{color: "white", position: "absolute",bottom:5,left:0,zIndex: 12, maxWidth: 400 }}></div>
                <Card style={{ textAlign:"justify",background: "black", color: "white", position: "absolute", bottom: 20, right: 10, margin: 5, maxWidth: 400 }}>
                    {/* <CardContent>
                        <Typography variant="caption"> Stay Home </Typography>
                        <Typography variant="body2" >Social Distancing is the best way to protect yourself and others from coming under threat of Covid-19.</Typography>
                    </CardContent>
                    <CardActionArea>
                    <CardActions onClick={() => toggleBTN()} >Learn More</CardActions>
                    </CardActionArea> */}
                    <CardContent>
                    प्रारंभिक लक्षणों की पुष्टि करने के लिए दिए गए बटन को चुने
                    </CardContent>
                    <Button style={{ width : "90%", margin : "5%" ,background: "rgba(255,33,32,60)", color: "white"  }} > क्लिक करें </Button>
                </Card>
            </DeckGL>
            <LearnMore open={learn} close={toggleBTN} />
        </div>

    );
}


export default Map; 