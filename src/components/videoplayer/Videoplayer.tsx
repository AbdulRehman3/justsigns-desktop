import { createRef, useEffect, useState } from 'react';

import styles from "./Videoplayer.module.css"

interface VideoPlayerProps {
    url: string,
    isSlidActive: boolean;
    onVideoEnd: () => void;
}

const VideoPlayer = ({ url, isSlidActive, onVideoEnd }: VideoPlayerProps) => {
    const [paused, setPaused] = useState(true);
    const ref = createRef<HTMLVideoElement>();

    const onEnd = () => {
        setTimeout(() => {
            onVideoEnd();
        }, 1000);
    }

    useEffect(() => {
        if (isSlidActive) {
            ref.current?.play()
        } else {
            ref.current?.pause();
        }
    }, [isSlidActive]);

    return (
        <div>
            <video
                className={styles.video}
                ref={ref}
                controls={false}
                autoPlay={!paused}
                onEnded={onEnd}
            >
                <source src={url} />
            </video>
        </div>
    )
}

export default VideoPlayer;