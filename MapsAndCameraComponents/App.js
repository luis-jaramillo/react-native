import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location'
import Constants from 'expo-constants';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000,
        enableHighAccuracy: true,
      });
      setLocation(userLocation);
    })();
  }, []);
 


  return (
    <View style={styles.container}>
      <MapView   style={styles.mapContainer} >
          {
            location.coords? <Marker 
          coordinate={location.coords}
          title="Location"
          description='Description'
           ></Marker> : null
          }
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
  mapContainer:{
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height
  }
});
