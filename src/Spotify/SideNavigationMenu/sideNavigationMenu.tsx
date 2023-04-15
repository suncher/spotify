import React from "react";
import './SideNavigationMenu.scss';
import '../../app.css'
import {Layout, Menu} from "antd";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {
    Link, useParams,
} from "react-router-dom";
import '../../app.css'

interface SideNavigationMenuInterface {
    onNewPlaylist(): void;
}

const SideNavigationMenu = ({onNewPlaylist}: SideNavigationMenuInterface) => {
    const playlists = useSelector((state: State) =>
  state.spotify.playlists.filter((playlist: { name: string }) => playlist.name !== "Liked Songs")
);

    const url = useParams();
    let selectedKey: string;
    if (url.playlistName === undefined) {
        selectedKey = "";
    } else {
        selectedKey = url.playlistName;
    }

    const displayModal = (key: string) => {
        if (key === 'playlist') {
            onNewPlaylist()
        }
    }

    const menuItems = [
        {
            key: "",
            icon: <div className='MainSquareDesign'>
                <img src={'/assets/home.png'} alt={'homeLogo'}/>
            </div>,
            label: <Link to={"/"}>Home</Link>,
            style: {marginBottom: "15px", height: '50px'},
        },
        {
            key: "playlist",
            icon: <div className='MainSquareDesign Playlist'>
                <img src={'/assets/add.png'} alt={'CreatePlaylist'}/>
            </div>,
            label: 'Create Playlist',
            style: {marginBottom: "5px", height: '50px'},
        },
        {
            key: "Liked Songs",
            icon: <div className='MainSquareDesign LikedSongs'>
                <img src='/assets/likeMinify.png' alt={"Heart"}/>
            </div>,
            label: <Link to="/playlist/Liked Songs">Liked Songs</Link>,
            style: {height: '50px', marginBottom: '15px'},
        },
    ];

    const playlistItems = playlists.map(({name}) => ({
        key: name,
        label: <Link to={`/playlist/${name}`}>{name}</Link>,
        style: {height: '50px'},
    }));

    return <div className='SideNavigationMenu'>
        <Layout>
            <div className='logo'>
                <img src='/assets/spotify.png' alt={'Logo'}/>
            </div>
            <Menu
                className='NavigationMenu'
                mode="inline"
                onClick={(e) =>
                    displayModal(e.key)}
                items={menuItems}
                selectedKeys={[selectedKey]}
            />
            <Menu
                
                mode="inline"
                items={playlistItems}
                selectedKeys={[selectedKey]}
            />
        </Layout>
    </div>
}

export default SideNavigationMenu;
