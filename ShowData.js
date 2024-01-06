import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

export const ShowData = ({navigation}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [image, setImage] = useState(null);
    const [strokeCount, setStrokeCount] = useState(0);
    const [lastThreeStrokes, setLastThreeStrokes] = useState([]);
    const [prevaccVector, setprevAccVector] = useState(0);
    const [spm, setSpm] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [split, setSplit] = useState(0);

    const [accelerometerData, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
    
    const [subscription, setSubscription] = useState(null);
    
    const _subscribe = () => {
      setSubscription(Accelerometer.addListener((accelerometerData) => setData(accelerometerData)));
      
    };
    
    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
      
    };
  
    useEffect(() => {
      fetchImage();
      Accelerometer.setUpdateInterval(200);
      const speed = location && parseFloat(location.coords.speed);

      const subscription = Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
  
        // Call your step counting function here
        calculateStrokeCount(accelerometerData);
      });


      const getLocation = async () => {
          try {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
              // If not, request permission
              let permissionStatus = await Location.requestForegroundPermissionsAsync();
              if (permissionStatus.status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
              }
            }
    
            // get the current location
            let newLocation = await Location.getCurrentPositionAsync({});
            setLocation(newLocation);
            
            const speed = location && parseFloat(location.coords.speed);

            if (speed) {
              const timeIntervalInSeconds = 1;
              const distance = speed * timeIntervalInSeconds;
              setTotalDistance((val) => val + distance);
              setSplit(500/speed);
            }

          } catch (error) {
            console.error('Error fetching location:', error);
          }
        };

        
    
        // Run the functions initially
        getLocation();
        _subscribe();
    
        // Set up an interval to run the function every second
        const intervalId = setInterval(getLocation, 1000);
      
        return () => {clearInterval(intervalId);_unsubscribe();}
      }, []); 

      const calculateStrokeCount = (accelerometerData) => {
        if (accelerometerData) {
          const { x, y, z } = accelerometerData;
          const vector = Math.sqrt(x * x + y * y + z * z);
          const diff = vector - prevaccVector;
          setprevAccVector(vector);

          if (diff > 2) {
            setStrokeCount((prevCount) => prevCount + 1);
            console.log('Stroke count increased. New value:', strokeCount);

            setLastThreeStrokes((prevStrokes) => {
              const newStrokes = [...prevStrokes, Date.now()/1000].slice(-4);
            
              if (newStrokes.length >= 4) {
                const timeBetweenStrokes = newStrokes[3] - newStrokes[0];
                const timeForOne = timeBetweenStrokes / 3;
                const spmValue = 60 / timeForOne;
                setSpm(spmValue.toFixed(2));
              }
            
              return newStrokes;
            }); 
          }
        }
      };

      const fetchImage = async () => {
        try {
          const response = await fetch('http://192.168.4.1/capture.jpg');
          
          // Assuming the response is an image/jpeg, you may need to adjust the content type accordingly
          const uri = 'data:image/jpeg;base64,' + (await response.arrayBuffer()).toString('base64');
          
          setImage(uri);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

  return (
    <View style={styles.container}>
    <View style={{flex:1}}>
      <Text style={styles.text}>{location && `Latitude: ${location.coords.latitude.toFixed(2)}`}</Text>
      <Text style={styles.text}>{location && `Longitude: ${location.coords.longitude.toFixed(2)}`}</Text>
      <Text style={styles.text}>{location && `Speed: ${location.coords.speed}`}</Text>
      {errorMsg && <Text>Error: {errorMsg}</Text>}

      <Text style={styles.text}>Stroke Count: {strokeCount}</Text>
      <Text style={styles.text}>Strokes Per Minute: {spm}</Text>
      <Text style={styles.text}>Distance Traveled: {totalDistance}</Text>
      <Text style={styles.text}>Time for 500m: {split}</Text>
    </View>
    

      
    {image && <Image source={{ uri: image }} style={styles.image} />}
    <Image source={{uri: 'http://192.168.4.1/capture.jpg'}}
       style={{width: 400, height: 400}} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignContent: 'center',
    paddingVertical: 5,
    paddingHorizontal:15,
    justifyContent: 'center', 
    alignItems: 'center',
    width: 250, // Adjust the width as needed
    height: 40,
    margin: 2, // Add margin between items
    borderColor: 'black', // Black border color
    borderWidth: 5, // 5-pixel border width
    backgroundColor: 'yellow', // Yellow background color
  },
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: '#ffa',
  },
  image: {
    width: 200, // Adjust the width of the image as needed
    height: 200, // Adjust the height of the image as needed
    marginVertical: 10, // Add margin around the image
  },
});