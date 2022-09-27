import React, {useState, useEffect} from 'react';
import SingFyClient from './SingFyClient';
//import Icon from "react-native-vector-icons/Ionicons";

import{
    Text, 
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    Button,
    Animated,
} from 'react-native';

/*
const MyView = (props) => {
    const [count, setCount] = useState(0);
    useEffect(() =>  { //el useEffect podría ser una función llamada desde la línea de arriba
        alert(`Vista actualizada, count:  ${count}`); //cuando el componente se crea
        return() => {
            alert(`Vista desmontada count: ${count}`);
        };
    }); 

    return (
        <View>
            <Text>{props.name} Botón pulsado {count} veces</Text>
            <Button title="+1" onPress={() => setCount(count + 1 )}></Button>
            <Button title="Reset" onPress={() => setCount(0)}></Button>
        </View>
    );
};
*/

export default class TrackDetails extends React.Component {

    constructor(props){
        super(props);
        /*
        this.state = {
            track: props.route.params.track,
        }
        */
        this.apiClient = new SingFyClient();
        this.track = props.route.params.track //si esta lo de arriba esto sobra, state

        this.imagenOpacity = new Animated.Value(0);
        this.titleScale = new Animated.Value(0.5);

        //la animacion va a hacer que la opacidad pase de 0 a 1 en el tiempo que le digamos
        Animated.timing(this.imagenOpacity, {
            toValue: 1,
            duration: 3000,
            delay: 1000,
            useNativeDriver: true,
        }).start();

        //parallel para hacer varias a la vez, o sequence para hacer primero uno y luego otra
        Animated.parallel([ 
         //este afecta al head igual que el animated de abajo, diferentes ejemplos
        Animated.timing(this.titleScale, {
            toValue: 1,
            duration: 3000,
            delay: 4000,
            useNativeDriver: true,
        }),
        //.start();   si solo usara una hago el start sobre la individual 
        
        //también hay usando friction y tension
        //mass y stiffness, damping
        
        Animated.spring(this.titleScale, {
            toValue: 1,
            speed: 0.1,
            bounciness: 10,
            useNativeDriver: true,
        }),
    ]).start();

    }

    //async
    componentDidMount(){
        this.props.navigation.setOptions({
            title: this.track.name, //this.state.track.name
        })

        //const track = await this.apiClient.getTrackDetails(this.state.track.id)
        /*
        alert(JSON.stringify(track));
        this.setState({
            track: this.track,
        })
        */
    }


    //{this.renderGenres()}
    render(){
        return(
            //tengo que cambiar el nombre de overview, lo llamo así por una variable suya.
            //<Icon name="ios-heart" size={20} color="red"/> <Icon name="md-heart" size={20} color="red"/>
            //<MyView name = "Rober"></MyView> para probar hooks
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.container}>
                    {this.renderHeader()}
                    {this.renderArtist()}
                    {this.renderOverView()} 
                </View>
            </SafeAreaView>
        );
    }

    renderHeader(){
        const track = this.track;  //si usaramos stado tendríamos que sacarlo del estado

        return (
         <View style={styles.headerContainer}>
            <Animated.Image  //meto el image en animated sino no puedo animarlo
                source= {{uri: 'https://source.unsplash.com/random/?sig=incrementingIdentifier'}} 
                //style={styles.image} si quiero meter solo una propiedad de estilo
                style={[  //si quiero un array de estilos
                    styles.image,
                    {
                        opacity: this.imagenOpacity,
                    },
                ]}
            >
            </Animated.Image>
            <View style={styles.titleContainer}>
                <Animated.Text 
                    style={[
                        styles.title,
                        {
                            transform:  [{
                               scale: this.titleScale,
                            },],
                        }
                    ]}
                    >Name: { track.name}
                </Animated.Text>
                <Text>Popularity: { track.popularity}</Text>
            </View>
        </View>
        );
    }

    renderArtist(){   //es un objeto voy a mapearlo a ver si consigo sus datos
        //alert(JSON.stringify(this.track.artists)); //aqui si me sale el artista, sus datos

        if(this.track.artists === undefined) {  //por aqui no esta entrando aunque devuelva null
            return null;
        }

        return (
            <View style={styles.artistsContainer}>
                {this.renderArtistList()}
            </View>
        );
    }
    /*
    renderGenres(){
        if (this.track.genres === undefined){
            return null;
        }

        return(
            <View style={styles.genresContainer}>
                {this.renderGenresList()}
            </View>
        );
    }
    */

    renderArtistList(){
        console.log(this.track.artists); 
        //alert(JSON.stringify(this.track));
        const artists = this.track.artists;
        //alert(JSON.stringify(artists));

        return artists.map((artist) => { //aquí tenía index y abajo key = {artist.id} no se si es necesario
            return (
                <Text style={styles.artist}>{artist.name}</Text>
            );
        });
    }



    /*
    renderGenreList() {
        const genres = this.state.track.genres;

        return genres.map((genre, index) => {
            return (
                <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
            );
        });
    }
    */

renderOverView() {
    const track = this.track;

    /*
    if(track.overview === undefined){
        return null;
    }
    */

    return (
        <View style={styles.overviewContainer}>
            <Text style={styles.overview}>
                Duración: {track.duration_ms} segundos.
            </Text>
        </View>
    );
}



}

const styles = StyleSheet.create({
    safeAreaContainer:{
        flex: 1,
    },
    container:{
        flex: 1,
        padding: 10,
    },
    headerContainer: {
        flex: 0,
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 150,
    },
    titleContainer: {
        flex:1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
    },
    artistsContainer: {
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        //flexWrap: 'wrap',  para ajustar contenido si se pasa del espacio
        marginVertical: 30,
    },
    artist: {
        backgroundColor: 'black',
        color: 'white',
        padding: 5,
        margin: 5,
        marginLeft: 35,
    },
    overviewContainer: {
        flex: 1,
    },
    overview: {
        fontSize: 20,
    }
});
