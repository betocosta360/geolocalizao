import React, { useState, useEffect } from "react";

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { height, width } = Dimensions.get('window')

const Local = () => {
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

    const GOOGLE_MAPS_KEY = 'AIzaSyA7j2Wxb3ssgll7-OXqsvdUxsntZtA2rv4'

    return (
        <View style={styles.container}>
           
                
                
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -12.97537831801328,
                    longitude: -38.5121154952631,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={PROVIDER_GOOGLE}
            >
                
                <Marker

                    coordinate={{
                        latitude: -12.97537831801328,
                        longitude: -38.5121154952631,
                    }}
                    title={'testando o mapa'}
                    description={'teste real'}
                >
                    <View style={styles.containerCircle}>
                        <View style={styles.balon}>
                            <Image style={styles.imgUser} source={{ uri: "https://avatars.githubusercontent.com/u/42754685?v=4" }} />
                        </View>
                        <View >
                            <Image style={styles.imgTriangulo} source={require('./assets/img/download.png')} />
                        </View>
                    </View>
                    

                </Marker>
                
                <MapViewDirections

                    apikey={GOOGLE_MAPS_KEY}
                    strokeColor="black"
                    strokeWidth={6}
                />
                
            </MapView>
            
        </View>
    )
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
    containerCircle: {
        height: 100,
        width: 70,
        alignItems: 'center'
    },
    balon: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgUser: {
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    imgTriangulo: {
        marginTop: 1,
        height: 20,
        width: 20
    }
});

export default Local
