import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import MapboxCircle from 'mapbox-gl-circle';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MAPBOX_API_TOKEN} from '../../api/keys';
import Tooltip from './Tooltip';

import {updateClient} from '../../actions/Client';

import './Map.less';

mapboxgl.accessToken = MAPBOX_API_TOKEN;

const metersToPixelsAtMaxZoom = (meters, latitude) =>
    meters / 0.075 / Math.cos(latitude * Math.PI / 180);

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.createPopup = this.createPopup.bind(this);
    }
    tooltipContainer;

    setTooltip(features) {
        if (features.length) {
            ReactDOM.render(
                React.createElement(
                    Tooltip, {
                        features
                    }
                ),
                this.tooltipContainer
            );
        } else {
            ReactDOM.unmountComponentAtNode(this.tooltipContainer);
        }
    }

    createPopup(event) {
        let that = this;
        const div = document.createElement('div');
        ReactDOM.render(<div>
            <p>Rayon au autour du point</p>
            <input type="number" ref={input => this.radiusInput = input} />
            <button onClick={() => {
                const interestZone = {
                    radius: Number(this.radiusInput.value),
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat
                };
                if (!that.props.client.interestZones) {
                    that.props.client.interestZones = [];
                }
                that.props.client.interestZones.push(interestZone);
                that.props.updateClient(this.props.client);
                that.popup.remove();
            }}>OK</button>
        </div>, div);

        this.popup = new mapboxgl.Popup()
            .setLngLat([event.lngLat.lng, event.lngLat.lat])
            .setDOMContent(div)
            .addTo(this.map);

    }

    componentDidMount() {
        // Container to put React generated content in.
        this.tooltipContainer = document.createElement('div');

        const that = this;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [0.410006, 46.545840],
            zoom: 12.5
        });

        this.map.getCanvas().style.cursor = 'pointer';

        this.map.on('click', (e) => {
            that.createPopup(e);
        });
    }

    componentDidUpdate() {
        this.props.houses.forEach(house => {
            const popup = new mapboxgl.Popup();
            const div = document.createElement('div');
            ReactDOM.render(<div>
                <p>{house.address + ' ' + house.postCode + ' ' + house.town}</p>
                <p><b>{house.price} €</b> {house.rooms} chambres</p>
                <p>A vendre depuis {moment(house.toSellSince).format('DD/MM/YYYY')}</p>
            </div>, div);
            popup.setDOMContent(div);
            new mapboxgl.Marker()
                .setLngLat([house.longitude, house.latitude])
                .setPopup(popup)
                .addTo(this.map);
        });

        if (!this.props.client.interestZones) {
            this.props.client.interestZones = [];
        }
        if (typeof this.props.client.interestZones === 'string') {
            this.props.client.interestZones = JSON.parse(this.props.client.interestZones);
        }
        const map = this.map;
        this.props.client.interestZones.forEach(zone => {
            new MapboxCircle({lat: zone.latitude, lng: zone.longitude}, zone.radius * 1000, {
                editable: false,
                minRadius: 1500,
                fillColor: '#29AB87'
            }).addTo(map);
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        return <div className="map" ref={el => this.mapContainer = el} />
    }
}

function mapStateToProps(state, ownProps){
    return {
        houses: state.House.houses,
        client: state.Client.currentClient,
        clients: state.Client.clients
    };
}

function mapDispatchToProps(dispatch){
    return {
        updateClient: bindActionCreators(updateClient, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
