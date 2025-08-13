import { useCallback, useEffect, useState } from 'react'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMap,
    InfoWindow
} from '@vis.gl/react-google-maps';
import SensorCard from '../../components/SensorCard/SensorCard';
import type { SensorBox } from '../../types/sensors';
import { GOOGLE_MAPS_API_KEY } from "../../api/googlemaps"
import { fetchSensors } from '../../api/sensors';
import { useNavigate } from 'react-router-dom';

const defaftMapCenter = { lat: 38.895328803637845, lng: -77.03758169837043 }

const MapPage = () => {
  const [loading, setLoading] = useState(false);
  const [boxes, setBoxes] = useState<SensorBox[]>([]);
  const [sensorInfo, setSensorInfo] = useState<SensorBox | null>(null);
  const nav = useNavigate();

  useEffect(() => {

    const obtainSensorData = async () => {
      setLoading(true);
      try {
        const res = await fetchSensors();
        setBoxes(res)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    obtainSensorData();
  }, [])


  const SensorMarkers = (props: { sensors: SensorBox[] }) => {
    const map = useMap();

    const handleClick = useCallback((sensor: SensorBox) => {
      setSensorInfo(sensor)
      if (!map) return;
      map.panTo(sensor.coordinates);
    }, [map]);

    return (
      <>
        {props.sensors.map((sensor: SensorBox) => (
          <AdvancedMarker
            key={sensor.id}
            position={sensor.coordinates}
            clickable={true}
            onClick={() => handleClick(sensor)}>
            <Pin
              background={'#FF0000'}
              glyphColor={'#000'}
              borderColor={'#000'} />
          </AdvancedMarker>
        ))}

        {sensorInfo && (
          <InfoWindow
            position={sensorInfo.coordinates}
            onCloseClick={() => setSensorInfo(null)}
          >
            <SensorCard
              key={sensorInfo.id}
              box={sensorInfo}
              onClick={(id) => nav(`/charts/${id}`)} />
          </InfoWindow>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (

    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>

        <Map
          style={{ width: '100%', height: '100%' }}
          defaultZoom={13}
          defaultCenter={defaftMapCenter}
          mapId='DEMO_MAP_ID'>
          <SensorMarkers sensors={boxes} />
        </Map>

      </div>
    </APIProvider>
  )
}

export default MapPage
