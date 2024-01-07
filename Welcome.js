import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

export const Welcome = ({navigation}) => {
  return (
    <ImageBackground
      source={require('./speed-coach-welcome-page-cropped.jpeg')} // Replace with the path to your image
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      
      
      <Button title='Start Practice' onPress={() => navigation.navigate('show-data')}>Start</Button>
      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // You can also use 'contain' or 'stretch'
    justifyContent: 'center',
    width: '100%', // Adjust the width as needed
    height: '100%', 
    alignSelf: 'center',
  },
  container: {
    
    backgroundColor: 'rgba(255, 255, 255, 0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});