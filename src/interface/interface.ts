export interface Playlist {
    name: string
    songs: Song[]
    gradient: string
    year: number | null

}

export interface Song {
    title: string,
    artist: string,
    genre: string,
    year: number,
    popularity: number,
}

export interface Menu {
    visible: boolean,

    song: Song
}


export interface PlayingSong {
    playlist: Playlist;
    song: Song;
}

export interface Spotify {
    playlists: Playlist[],
    topPlaylists: Playlist[]
    songs: Song[],
    playlistModal: boolean,
    Menu: Menu,
    playingSong: PlayingSong
}