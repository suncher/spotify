import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {addSongToPlaylist, removeSongFromPlaylist} from "../../Slices/playlistsSlice";
import './Like.css'

interface Song {
    title: string,
    artist: string,
    genre: string,
    year: number,
    popularity: number,
}

export interface LikeInterface {
    song: Song;
}

const Like = ({song}: LikeInterface) => {
    const likedSongs = useSelector((state: State) => state.spotify.playlists[0]);
    const dispatch = useDispatch()
    const checkIfLicked = (song: Song) => {
        return likedSongs.songs.includes(song);
    }
    return (<div>
        {!checkIfLicked(song) ?
            <img src='/assets/dislike.png' alt='UnlikedLike' className='UnlikedLike' onClick={(event) => {
                event.stopPropagation()
                dispatch(addSongToPlaylist([song, "Liked Songs"]))
            }}/> : <img src='/assets/LikedHeart.png' alt='LikedLike' onClick={(event) => {
                event.stopPropagation()
                dispatch(removeSongFromPlaylist([song, "Liked Songs"]))
            }}/>}
    </div>)
}

export default Like
