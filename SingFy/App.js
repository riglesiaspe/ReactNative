
import React from 'react';

import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesTracksList from './FavoritesTracksList';
import UpcomingTracksList from './UpcomingTracksList';
import TrackDetails from './TrackDetails';
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FavoritesTracksListStack = () => (   //hago esto como un lambda para así reciclar codigo
        <Stack.Navigator>
          <Stack.Screen name="trackList" component={FavoritesTracksList} />
          <Stack.Screen name="trackDetails" component={TrackDetails} />
        </Stack.Navigator>
);

/* //esto y lo de debajo es exactamente lo mismo, son tres formas diferentes de hacerlo, en este caso con
//componentes funcionales
class UpcomingTracksListStack extends React.Component {
  render () {
    return (
      <Stack.Navigator>
          <Stack.Screen name="trackList" component={UpcomingTracksList} />
          <Stack.Screen name="trackDetails" component={TrackDetails} />
      </Stack.Navigator>
    );
  }
}

//igual que arriba pero sin el render y con function
function UpcomingTracksListStack(props) {
  return (
    <Stack.Navigator>
        <Stack.Screen name="trackList" component={UpcomingTracksList} />
        <Stack.Screen name="trackDetails" component={TrackDetails} />
    </Stack.Navigator>
  );
}
*/



//es mejor esta forma que las anteriores, las otras más codigo, y mas riesgos de seguridad
const UpcomingTracksListStack = () => (   //hago esto como un lambda para así reciclar codigo
//si hubiera variables en el parentesis, usariamos también un return
        <Stack.Navigator>
          <Stack.Screen name="trackList" component={UpcomingTracksList} />
          <Stack.Screen name="trackDetails" component={TrackDetails} />
        </Stack.Navigator>
);

class App extends React.Component {

  render() {
    return ( 
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
               name="favoritesTracks" 
               component={FavoritesTracksListStack} 
               options = {{
                  headerShown: false,
                  tabBarLabel: 'Favorites Tracks :)',
                  tabBarIcon: ({color,size}) => (
                  <Icon name="md-heart" size={size} color={color}/>
                  ),
               }}
          />
          <Tab.Screen 
               name="upcomingTracks" 
               component={UpcomingTracksListStack} 
               options = {{
                  headerShown: false,
                  tabBarLabel: 'Upcoming Tracks',
                  tabBarIcon: ({color,size}) => (
                  <Icon name="md-calendar" size={size} color={color}/>
                  ),
               }}
          />        
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
