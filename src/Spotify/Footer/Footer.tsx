import React from 'react';
import { useSelector } from "react-redux";
import { State } from "../../store";


import './Footer.scss';

const MusicPlayer = () => {
    const playingSong = useSelector((state: State) => state.spotify.playingSong);
    const { title, artist } = playingSong.song;

    const randomImageUrl = "/assets/randomMusic.png";
    const previousImageUrl = "/assets/previous.png";
    const playImageUrl = "/assets/play.png";
    const nextImageUrl = "/assets/previous.png";
    const repeatImageUrl = "/assets/repeat.png";
    const rightOptionsImageUrl = "/assets/options.png";

    return (
        <div className='Container'>
            <div className='MusicContainer'>
                <div className='MusicImage'
                    style={{ background: `${playingSong.playlist.gradient}` }} />
                <div className='MusicInfo'>
                    <div className='MusicTitle'>{title}</div>
                    <div className='Artist'>{artist}</div>
                    
                </div>
            </div>
            <div className='MusicButtonContainer'>
                <div className='MusicButton'>
                    <img className='choseRandomMusicButton' src={randomImageUrl} alt='aleatoire' />
                    <img src={previousImageUrl} className='PreviousButton' alt='previous' />
                    <img src={playImageUrl} className='PlayButton' alt='play' />
                    <img src={nextImageUrl} className='NextButton' alt='next' />
                    <img src={repeatImageUrl} className='RepeatButton' alt='repeat' />
                </div>
                <div className='MusicButton'>
                    <div className='MusicBar' />           
                </div>
            </div>
            <div className='RightOptions'>
                <img src={rightOptionsImageUrl} alt='rightOptions' />
            </div>
        </div>
    );
};

export default MusicPlayer;
