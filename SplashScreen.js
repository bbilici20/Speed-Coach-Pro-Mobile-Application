// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    
    setTimeout(() => {
      navigation.replace('welcome'); 
    }, 2000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./speed-coach-welcome-page-cropped.jpeg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%', // Adjust the width as needed
    height: '80%', // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
});


