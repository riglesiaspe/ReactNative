import TrackList from "./TrackList";

export default class UpcomingTracksList extends TrackList {
    title(){
        return "Upcoming Tracks";
    }

    async getTracks(){
        //return this.apiClient.getUpcomingTracks()
        return this.apiClient.getTracks()

        //tengo que crear en SingFyClient una funcion que me saque las que quiero
    }
}