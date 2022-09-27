import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export class TrackRow extends React.Component
{
    render(){
        const { name, posterURI, popularity }= this.props;

        return(
          <Pressable onPress={this.props.onPress}>
              <View style={styles.container}>
                  <Image source= {{uri: posterURI}} style={styles.image}></Image>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTrack}>{name}</Text>
                    <Text>Popularity: {popularity}</Text>
                  </View>
              </View>
          </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    nameContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 10,
  
    },
    nameTrack: {
      fontSize: 20,
      marginBottom: 5,
    },
    image: {
      width: 100,
      height: 100,
    },
    
  });

  export default TrackRow;
