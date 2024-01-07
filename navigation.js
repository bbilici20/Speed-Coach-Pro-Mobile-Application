import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome} from './Welcome';
import {ShowData} from './ShowData';
import { SplashScreen } from './SplashScreen';
import {App} from'./App';
import { NavigationContainer, useNavigation } from "@react-navigation/native";


const AppStack = createNativeStackNavigator();


const AppStackNavigator = () => {
    return(
    
        <AppStack.Navigator
            screenOptions={{
                headerShown: true,
                fullScreenGestureEnabled: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
            }} >
            <AppStack.Screen name="welcome" component={Welcome} options={{
          headerShown: false, 
        }}/>
            <AppStack.Screen name="show-data" component={ShowData} options={{
          title: 'Practice Data',
          headerStyle: {
            backgroundColor: 'rgb(0, 132, 236)', 
          },
          headerTintColor: 'white', 
        }}/>
            <AppStack.Screen name="splash" component={SplashScreen}/>
        
        </AppStack.Navigator>
    
    )
}

export default AppStackNavigator;