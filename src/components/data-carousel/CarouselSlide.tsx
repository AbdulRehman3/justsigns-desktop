import { Slide } from "../../types/slide.interface";
import Videoplayer from "../videoplayer";
import styles from "./DataCarousel.module.css";

interface CarouselSlideProps {
    item: Slide;
    index: number;
    activeSlideIndex: number;
    changeSlide: () => void;
}

export const CarouselSlide = ({ item, index, activeSlideIndex, changeSlide }: CarouselSlideProps) => {
    return (
        <div key={index}>
            {item.type === "image" ? (
                <img className={styles.slide} src={item.url} />
            ) :
                item.type === "video" ?
                    (<Videoplayer url={item.url} isSlidActive={index === activeSlideIndex} onVideoEnd={changeSlide} />
                    ) : (<p className={styles.noSupported}>Slide content type not supported yet.</p>)
            }
        </div>
    )
}