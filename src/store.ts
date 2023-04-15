import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './Slices/playlistsSlice';
import { Spotify } from './interface/interface';

export interface State {
    spotify: Spotify;
}

export default configureStore({
    reducer: {
        spotify: playlistsReducer,
    },
});
