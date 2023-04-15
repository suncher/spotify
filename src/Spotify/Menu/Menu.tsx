import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {addSongToPlaylist} from "../../Slices/playlistsSlice";
import './Menu.scss'

const Menu = () => {
    const dispatch = useDispatch()
    const playlists = useSelector((state: State) => state.spotify.playlists.filter(({name}) => name !== 'Liked Songs'));
    const menu = useSelector((state: State) => state.spotify.Menu);

    return (<div
            className={'Menu'} style={{
            display: menu.visible ? 'block' : 'none',
        }}>
            <div className={'playlist'}>Add to Playlist</div>
            <ul>
                {playlists.map(({name}, index) => {
                    return (
                        <li onClick={() => {
                            dispatch(addSongToPlaylist([menu.song, name]))
                        }} key={index}>{name}</li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Menu;
