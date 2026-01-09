import { useAudioPlayer } from 'expo-audio';
import { useRef } from 'react';
import { sounds } from '../constants';


export function useAlertSound() {
    const playerRef = useRef(useAudioPlayer(sounds.alert, { downloadFirst: true }));

    const playSound = () => {
        const player = playerRef.current;
        player.seekTo(0);
        player.play();
    };

    return { playSound }
}
