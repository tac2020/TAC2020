/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import Lottie from 'react-lottie';
import { XYPlot, LineSeries, XAxis, YAxis, DiscreteColorLegend } from 'react-vis';
import Wash from './anim/wash.json';
// import { CancelOutlined } from "@material-ui/icons";
import { Slide, Button } from '@material-ui/core';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Wash,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

function DataVis(props) {
    const [data, setData] = useState(null);
    const [dinfo, setDinfo] = useState(null);
    const [rinfo, setRinfo] = useState(null);
    const [visible, setVisible] = useState(true);

    const ITEMS = [
        'Infected',
        'Deaths',
        'Recovered'
    ];

    const COLORS = [
        "orange",
        "red",
        "green"
    ]

    const fn = async () => {

    let final = await fetch(`//coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=${props.code}&timelines=1`)
        .then(res => res.json())
        .then(result => {
            let confirmed = result.locations[0].timelines.confirmed.timeline;
            let deaths = result.locations[0].timelines.deaths.timeline;
            let recovered = result.locations[0].timelines.recovered.timeline;
            let con = Object.keys(confirmed).map((key, value) => {
                let a = {
                    x: new Date(key).toLocaleDateString(),
                    y: confirmed[key]
                }
                return a;
            })
            let ded = Object.keys(deaths).map((key, value) => {
                let a = {
                    x: new Date(key).toLocaleDateString(),
                    y: deaths[key]
                }
                return a;
            })
            let rec = Object.keys(recovered).map((key, value) => {
                let a = {
                    x: new Date(key).toLocaleDateString(),
                    y: recovered[key]
                }
                return a;
            })
            return {
                confirmed: con.filter((item, index) => (index % 14 === 0 || index === con.length - 1) && item),
                deaths: ded.filter((item, index) => (index % 14 === 0 || index === ded.length - 1) && item),
                recovered: rec.filter((item, index) => (index % 14 === 0 || index === rec.length - 1) && item)
            };
        })
    setTimeout(() => {
        setData(final.confirmed);
        setDinfo(final.deaths);
        setRinfo(final.recovered);
    }, 5000);
    console.log(final);

    return final;
}


useEffect(() => {
    fn();
}, [])
return (
    <div>
        {
            visible &&
            <Slide direction="right" in={visible}>
                <div style={{ background: "black", maxWidth: 400, padding: 10, zIndex: 999 }} className="App">
                    <label> { props.data.province ? props.data.province : props.country } </label>
                    <div style={{ display: "flex", textAlign: "justify", placeContent: 'center' }}>
                        <div style={{ margin: "5%", textAlign: "center" }}>
                            <h6>Total Cases</h6>
                            <h4> {props.data.numbers} </h4>
                        </div>
                        <div style={{ margin: "5%", textAlign: "center", fontSize: "medium" }}>
                            <h6>Total Deaths</h6>
                            <h4> {props.data.deaths} </h4>
                        </div>
                        <div style={{ margin: "5%", textAlign: "center", fontSize: "medium" }}>
                            <h6>Total Recovered</h6>
                            <h4> {props.data.recovered} </h4>
                        </div>
                    </div>
                    {
                        data ? (
                            <div style={{ width: 400, maxWidth: 400 }}>
                                <lable> Cumulative Graph of {props.country}  </lable>
                                <XYPlot xType="ordinal" height={180} width={450 * 0.80} margin={{ left: 50 }}>
                                    <DiscreteColorLegend orientation="horizontal" colors={COLORS} height={50} width={200} items={ITEMS} />
                                    <XAxis />
                                    <YAxis />
                                    <LineSeries strokeWidth={3} curve={"curveMonotoneX"} className="one" color="orange" data={data} />
                                    <LineSeries strokeWidth={3} curve={"curveMonotoneX"} className="two" color="red" data={dinfo} />
                                    <LineSeries strokeWidth={3} curve={"curveMonotoneX"} className="three" color="green" data={rinfo} />
                                </XYPlot>
                                <br />
                                <br />
                                <Button style={{ color: "white" }} onClick={() => setVisible(false)} >close</Button>
                            </div>
                        ) : (
                                <div style={{ margin: "auto" }} >
                                    <Lottie
                                        options={defaultOptions}
                                        height={150}
                                        width={150}
                                    />
                                    <label style={{ margin: 5 }}>Wash Your Hands Frequently to avoid contracting Covid-19.</label>
                                    <br />
                                    <Button style={{ color: "white" }} onClick={() => setVisible(false)} >close</Button>
                                </div>
                            )
                    }
                </div>
            </Slide>

        }

    </div>
);
}

export default DataVis;
