import { Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import ContextualMenu from "../../Menu/Menu";
import {
    changePlayingSong,
    displayMenu,
} from "../../../Slices/playlistsSlice";
import Like from "../../LikeFeature/Like";
import './Playlist.scss';
import { useParams } from "react-router-dom";
import { Song } from "../../../interface/interface";


export interface PlaylistInterface {
    playlistName: string;
}

const Playlist = ({ playlistName }: PlaylistInterface) => {
    const { Option } = Select;

    const [newSearch, setNewSearch] = useState<string>('');
  

    const url = useParams()

    useEffect(() => {
        setNewSearch('')
      
    }, [url]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSearch(e.target.value);
    };

  

    const dispatch = useDispatch()
    const capitalizeFirstChar = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const playlistYear = playlistName.slice(6)
    const playlist = useSelector((state: State) => {
        if (playlistName.slice(0, 6) === 'TOP 50') {
            return state.spotify.topPlaylists.filter(({ year }) => year === parseInt(playlistYear))
        } else {
            return state.spotify.playlists.filter(({ name }) => name === playlistName)
        }
    })

    const getSongs = () => {
        let filteredSongs = newSearch ? playlist[0].songs.filter((song) => {
            return Object.entries(song).some(([key, value]) => {
                if (typeof value === 'number') {
                    if (key === 'duration') {
                        const duration = `${Math.floor(value / 60)}:${value % 60 < 10 ? '0' : ''}${value % 60}`;
                        return duration.includes(newSearch);
                    } else {
                        return value.toString().includes(newSearch);
                    }
                } else if (typeof value === 'string') {
                    return value.toLowerCase().includes(newSearch.toLowerCase());
                }
                return false;
            });
        }) : playlist[0].songs;
    
       
        return filteredSongs;
    };
    

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (item: any, record: Song, index: number) => <div>{index + 1}</div>,
            className: 'index'
        },
        {
            title: '',
            dataIndex: 'Like',
            key: 'Like',
            render: (item: any, record: Song) => <Like song={record} />,
            className: 'Like'
        },
        {
            title: 'Title',
            dataIndex: ['title', 'artist'],
            key: 'title',
            render: (text: string, row: any) => <p>{row['title']} - {row["artist"]}</p>,
            className: 'title'
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'Year',
            className: 'year'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            render: (text: string, row: any) => <p>{capitalizeFirstChar(row['genre'])}</p>,
            className: 'genre'
        },
        {
            title: 'Popularity',
            dataIndex: 'popularity',
            key: 'popularity',
            className: 'popularity'
        },
    ];

    return (<div>
        <div className='Banner'
            style={{ background: `${playlist[0].gradient} ` }}>
            <div className='BannerBox'
                style={{ background: `${playlist[0].gradient} `, }}>
                {playlist[0].name === 'Liked Songs' ?
                    <img src='/assets/Like.png' alt={'BigLike'} />
                    : playlist[0].name === 'TOP 50' ? playlist[0].name + ' ' + playlist[0].year : ''}
            </div>
            <div className={'BannerTitle'}>
                {playlist[0].name}
            </div>
        </div>
        <div className='OptionsContainer'>
            <div className='inputContainer' >
                <Input className='placeHolder'  prefix={<img src='/assets/magnifyGlass.png' alt='glass' />} 
                  placeholder="Artists, songs, or podcasts" value={newSearch} onChange={handleOnChange} />
            </div>
            <div>
                <Select placeholder="Custom order"
                    className='Options'>
                    <Option key='title'>Title</Option>
                    <Option key='year'>Year</Option>
                    <Option key='genre'>Genre</Option>
                    <Option key='popularity'>Popularity</Option>
                </Select>
            </div>
        </div>
        <Table dataSource={getSongs()} columns={columns} pagination={false}
            className={'Table'}
            rowKey={(record) => `${record.artist}-${record.title}}`}
            onRow={(record) => {
                return {
                    onClick: () => {
                        dispatch(changePlayingSong([record, playlist[0]]))
                    },
                    onContextMenu: (event) => {
                        event.preventDefault();
                        dispatch(displayMenu({
                            visible: true,
                            song: record
                        }))
                    },
                };
            }}
        />
        <ContextualMenu />
    </div>
    );
};

export default Playlist;
