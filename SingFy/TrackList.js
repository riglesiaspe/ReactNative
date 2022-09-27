import React from 'react';

import SingFyClient from './SingFyClient';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { TrackRow } from './TrackRow';



export default class TrackList extends React.Component {

constructor(props){
  super(props);
  this.apiClient = new SingFyClient();
  this.page = 1;
  this.state = {
    tracks: [],
    //artists: [],
    loading: false,
  }

 /*
constructor(props){
  super(props);
  this.apiClient = new SingFyClient();
  this.state = {
    numberOfMovies: 0,
  }
}
*/

props.navigation.setOptions({
  title: this.title(),
});


}

title() {
  return "UNTITLED";
}

async getTracks() {
  return [];
}


componentDidMount() {
  this.loadPage()
}

loadPage = async () => {
    if (this.state.loading){
      return
    }

    this.setState({loading: true})

    //const result = await this.apiClient.getTracks(this.page)
    const result = await this.getTracks();

    let tracks = this.state.tracks
    if(this.page === 1){
      tracks= result.resultTracks
    }else{
      tracks = tracks.concat(result.resultTracks)
    }
      //console.log(result);
      //console.log(JSON.stringify(result));  //devuelve:   {}
      //console.log(JSON.stringify(result.resultTracks));
      //alert(JSON.stringify(result.resultTracks)); //indefinido
      this.setState({
        tracks: tracks,
        //artists: this.tracks.track.artists,
        loading: false,
      })  
}

//se actualiza si las canciones son diferentes, así se ahorra render
/*
shouldComponentUpdate(nextProps,nextState) {
  return nextState.tracks !== this.state.tracks
}
*/

loadNextPage = async () => {
  if (this.state.loading){
    return
  }
  this.page++;
  return this.loadPage()
}

/*
componentDidMount() {
  this.apiClient.getPopularMovies(1)
  .then((result) => {
    this.setState({
      numberOfMovies: result.resultMovies.lenght,
    })  
});
}
*/

onRefresh = () =>{
  if(this.state.loading) {
    return
  }
  this.page =1
  return this.loadPage()
}

  render() {
    //console.log(this.state.tracks);  //parece que la info si llega
    //console.log(this.state.loading); //parece que loading tambien
    //console.log(this.state.tracks.length); //me saca 100 items bien
    //console.log(this.state.artists);
    const { loading, tracks } = this.state
    return ( 
    <SafeAreaView style={styles.container}>
      { 
        loading && tracks.length === 0  
        ? this.renderLoadingIndicator()  //si no tenemos peliculas que cargar o no carga
        : this.renderList()  //aunque etse cargando si tenemos peliculas las muestra
      }
    </SafeAreaView>
    );
  }

  renderLoadingIndicator(){
    return <ActivityIndicator />
  }

  renderList(){
    const { tracks, loading } = this.state
    return (
      <FlatList 
      data={tracks}
      renderItem={this.renderItem}
      onRefresh={this.onRefresh}
      onEndReached={this.loadNextPage}
      refreshing={loading}
      />
    )
    }

  renderItem = ({item}) => (
    //console.log(item.track);
    //<Image source='https://source.unsplash.com/random/200x200?sig=incrementingIdentifier' style={styles.image}></Image>
      <TrackRow 
        name={item.track.name} 
        posterURI={ 'https://source.unsplash.com/random/?sig=incrementingIdentifier'} 
        popularity={item.track.popularity}
        onPress={() => this.onTrackRowPress(item.track)} //podía pasarle solo el item pero luego tendría que hacer track.track.name en detail
      />
    )

    onTrackRowPress = (track) => {
        console.log(track);
        this.props.navigation.navigate('trackDetails', {
            track: track,
        })
    }
  }


  /*
  render() {
    return (<View style={styles.container}>
    <Text>Hello People who Like music</Text>
    <Text>{this.state.numberOfMovies}</Text>
    </View>);
  }
*/




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

