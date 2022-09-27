import TrackList from "./TrackList";

export default class FavoritesTracksList extends TrackList {
    title(){
        return "Favorites Tracks";
    }

    async getTracks(){
        //return this.apiClient.getFavoritesTracks()
        return this.apiClient.getTracks()

        //tengo que crear en SingFyClient una funcion que me saque las que quiero
    }
}