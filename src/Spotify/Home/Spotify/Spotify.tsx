import React from "react";
import SideNavigationMenu from "../../SideNavigationMenu/sideNavigationMenu";
import {useDispatch, useSelector} from "react-redux";
import {
    addPlaylist,
    displayMenu,
    displayPlaylistModal,
} from "../../../Slices/playlistsSlice";
import PlaylistModal from "../../PlayListFeatures/PlaylistModal/PlaylistModal";
import {State} from "../../../store";
import {useParams} from "react-router-dom";
import Home from "../Home";
import Playlist from "../../PlayListFeatures/Playlist/Playlist";
import MusicPlayer from "../../Footer/Footer";
import './Spotify.scss'

const Spotify = () => {
    const dispatch = useDispatch()

    const MenuVisble = useSelector((state: State) => state.spotify.Menu.visible)

    const {playlistName} = useParams()

    const handleOnSavePlaylist = (name: string) => {
        dispatch(addPlaylist(name));
        handleOnClosePlaylist()
    };

    const handleOnNewPlaylist = () => {
        dispatch(displayPlaylistModal(true))
    };

    const handleOnClosePlaylist = () => {
        dispatch(displayPlaylistModal(false))
    };

    const removeMenu = () => {
        if (MenuVisble)
            dispatch(displayMenu({
                visible: false, song: {
                    title: '',
                    artist: '',
                    genre: '',
                    year: 0,
                    popularity: 0,
                }
            }))
    };
    return <div className='app' onClick={removeMenu}>
        <SideNavigationMenu
            onNewPlaylist={handleOnNewPlaylist}
        />

        <PlaylistModal
            onClosePlaylist={handleOnClosePlaylist}
            onSavePlaylist={handleOnSavePlaylist}
        />
        <div className='Spotify'>
            {playlistName ? (
                <Playlist playlistName={playlistName}/>
            ) : (
                <Home/>
            )}

        </div>
        <MusicPlayer/>


    </div>
}

export default Spotify;
