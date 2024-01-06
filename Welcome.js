import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>{'Welcome to Speed Coach Pro \n Mobile App!'}</Text>
      <View style={{height:15}}></View>
      <Button title='Start' onPress={() => navigation.navigate('show-data')}>Start</Button>
      <StatusBar style="auto" />
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
});