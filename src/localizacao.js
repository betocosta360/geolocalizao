import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'

//import GOOGLE_MAPS_KEY from './util/geolocalizacao'

const Localizacao = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permita acesso a sua localização');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [origin, setOrigin] = useState({
    latitude: -12.949395270655645,
    longitude: -38.43505847767478
  })

  const [destination, setDestination] = useState({
    latitude: -12.939637235560632,
    longitude: -38.45076441817547
  })

  const GOOGLE_MAPS_KEY = 'AIzaSyA7j2Wxb3ssgll7-OXqsvdUxsntZtA2rv4'

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }} 
        showsUserLocation
        loadingEnabled
        >

        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(direction) =>
            setOrigin(direction.nativeEvent.coordinate)} />

        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) =>
            setDestination(direction.nativeEvent.coordinate)} />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="black"
          strokeWidth={6} 
        />

        {/*<Polyline
          coordinates={[origin, destination]}
          strokeColor="green"
          strokeWidth={6} />*/}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Localizacao