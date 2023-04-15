import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import './PlaylistModal.scss';
import { useNavigate } from 'react-router-dom';

interface PlaylistModalInterface {
    onClosePlaylist: () => void;
    onSavePlaylist: (name: string) => void;
}

const PlaylistModal: React.FC<PlaylistModalInterface> = ({ onClosePlaylist, onSavePlaylist }) => {
    const navigate = useNavigate();

    const displayModal = useSelector((state: State) => state.spotify?.playlistModal);
    const playlist = useSelector((state: State) => state.spotify?.playlists);

    const [newPlaylistName, setNewPlaylistName] = useState('');

    const playlistExists = useMemo(() => Object.values(playlist).some((item) => item.name === newPlaylistName), [playlist, newPlaylistName]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlaylistName(e.target.value);
    };

    const handleOnSave = () => {
        if (newPlaylistName) {
            if (!playlistExists) {
                onSavePlaylist(newPlaylistName);
            }
            navigate(`/playlist/${newPlaylistName}`);
            setNewPlaylistName('');
            onClosePlaylist();
        }
    };

    return (
        <>

            <Modal open={displayModal} footer={null} width={290} onCancel={onClosePlaylist}>
                
                    <div className="ModalContainer">
                        <div className="ModalTitle">Create playlist</div>
                        <div className="ModalBody">
                            <Input value={newPlaylistName} onChange={handleOnChange} className="ModalInput" />
                            <Button onClick={handleOnSave} className="ModalButton" >
                                Create
                            </Button>
                        </div>
                    </div>
                
            </Modal>
        </>
    );
};

export default PlaylistModal;
