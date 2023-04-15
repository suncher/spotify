import {createSlice} from '@reduxjs/toolkit';
import data from '../static/data.json'
import {Playlist, Menu, PlayingSong, Song} from "../interface/interface";
import generateRandomGradient from '../utils/generateRandomGradient';


const topPlaylist = () => {
    let topPlaylist = [];
        const songs = data;
        for (let i = 2010; i < 2020; i++) {
            const playlist: Playlist = {
                name: "TOP 50",
                songs: [],
                gradient: generateRandomGradient(),
                year: i
            };

            let result = songs.filter(songs => songs.year === i)
            result.sort((a, b) => b.popularity - a.popularity);
            playlist.songs = result.slice(0, 50);
            topPlaylist.push(playlist)
        }
        return topPlaylist
}

export const playlistsSlice = createSlice({
    name: 'spotify',
    initialState: {
        topPlaylists: topPlaylist(),
        playlists: [{
            name: 'Liked Songs',
            songs: [],
            gradient: 'linear-gradient(135deg, #4000F4 0%, #603AED 22.48%, #7C6EE6 46.93%, #979FE1 65.71%, #A2B3DE 77.68%, #ADC8DC 88.93%, #C0ECD7 100%)',
            year: null
        }],
        playlistModal: false,
        songs: data,
        Menu: {
            visible: false, song: {
                title: '',
                artist: '',
                genre: '',
                year: 0,
                popularity: 0,
            },
        },
        playingSong: {
            playlist: {
                name: '',
                songs: [],
                gradient: generateRandomGradient(),
                year: null
            },
            song: {
                title: 'Pas de musique',
                artist: '',
                genre: '',
                year: 0,
                popularity: 0
            }
        }
    },
    reducers: {
        addPlaylist: (state: { playlists: Playlist[] }, action: { payload: string }) => {
            state.playlists.push({
                name: action.payload,
                songs: [],
                gradient: generateRandomGradient(),
                year: null
            });
        },
        displayPlaylistModal: (state: { playlistModal: true | false }, action: { payload: true | false }) => {
            state.playlistModal = action.payload
        },
        displayMenu: (state: { Menu: Menu }, action: { payload: Menu }) => {
            state.Menu = action.payload
        },
        addSongToPlaylist: (state: { playlists: Playlist[] }, action: { payload: [Song, string] }) => {
            const playlist = state.playlists.find(playlist => playlist.name === action.payload[1]);
            if (playlist) {
                playlist.songs.push(action.payload[0]);
            }
        },
        removeSongFromPlaylist: (state: { playlists: Playlist[] }, action: { payload: [Song, string] }) => {
            const playlist = state.playlists.find(playlist => playlist.name === action.payload[1]);
            if (playlist) {
                playlist.songs = playlist.songs.filter(song => song.title !== action.payload[0].title);
            }
        },
        changePlayingSong: (state: { playingSong: PlayingSong }, action: { payload: [Song, Playlist] }) => {
            state.playingSong.song = action.payload[0];
            state.playingSong.playlist = action.payload[1];
        },
    },
});


export const {
    addPlaylist,
    displayPlaylistModal,
    displayMenu,
    addSongToPlaylist,
    removeSongFromPlaylist,
    changePlayingSong
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
