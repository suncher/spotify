import React from 'react';
import {Link} from "react-router-dom";
import {Playlist} from "../../../interface/interface";
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import './TopPlaylistCard.scss'

interface TopFiftyPlaylistCardProps {
    playlist: Playlist;
}

const PlaylistCard = ({playlist}: TopFiftyPlaylistCardProps) => {
    return (
        <Link to={`/playlist/${playlist.name}${playlist.year}`} className="top-playlist-link">
          <Card
            hoverable
            className="top-playlist-card"
            cover={
              <div
                className="top-playlist-cover"
                style={{
                  background: `${playlist.gradient} `,
                }}
              >
                {playlist.name} {playlist.year}
              </div>
            }
          >
            <Meta title="TOP 50" description={playlist.year} />
          </Card>
        </Link>
      );
};

export default PlaylistCard;
