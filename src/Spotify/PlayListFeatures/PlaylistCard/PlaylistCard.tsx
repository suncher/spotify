import React from 'react';
import {Link} from "react-router-dom";
import {Playlist} from "../../../interface/interface";
import './PlaylistCard.scss'
interface PlaylistCardInterface {
    playlist: Playlist;
}

const PlaylistCard = ({playlist}: PlaylistCardInterface) => {
    return (
        <div className={'Container'}>
            <Link to={`/playlist/${playlist.name}`} className={'Link'}>
                <div className={'Card'}>
                    <div className={'CardLogo'} >
                        {
                            playlist.name === "Liked Songs" ? <img src={'assets/likeMinify.png'} alt={'like'}/> : ""
                        }
                    </div>
                    <div className={'CardTitle'}>
                        {playlist.name}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PlaylistCard;
