import { useAudioPlayer } from 'expo-audio';
import { useRef } from 'react';

export function useAlertSound() {
    const playerRef = useRef(useAudioPlayer(require('../assets/sounds/alert.mp3'), { downloadFirst: true }));

    const playSound = () => {
        const player = playerRef.current;
        player.seekTo(0);
        player.play();
    };

    return { playSound }
}
