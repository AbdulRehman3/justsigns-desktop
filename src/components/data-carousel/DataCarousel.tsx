
import { useEffect, useRef, useState } from "react";
import Sidebar from "../sidebar";
import Carousel, { Settings as SlickSettings } from "react-slick";
import { Slide } from "../../types/slide.interface";
import styles from "./DataCarousel.module.css";
import { CarouselSlide } from "./CarouselSlide";

interface DataCarouselProps {
    slides: Slide[]
}

let timeOutRef: NodeJS.Timeout | undefined;

const DataCarousel = ({ slides }: DataCarouselProps) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const carousel = useRef<Carousel>(null);

    const onSlideChange = (nextSlide: number) => {
        const slide = slides[nextSlide];
        setActiveSlide(nextSlide);
        clearTimeout(timeOutRef);
        timeOutRef = undefined;
        if (slide.type !== "video") {
            timeOutRef = setTimeout(() => {
                changeSlide();
            }, slide.data_timing * 1000);
        }
    }

    const changeSlide = () => {
        carousel.current?.slickNext();
    }

    useEffect(() => {
        onSlideChange(0);
        return () => {
            clearTimeout(timeOutRef);
        }
    }, []);

    const carouselSettings: SlickSettings = {
        arrows: false,
        speed: 500,
        draggable: false,
        touchMove: false,
        afterChange: onSlideChange
    }

    return (
        <div>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Carousel
                    {...carouselSettings}
                    ref={carousel}
                >
                    {slides.map((slide, index) => (
                        <CarouselSlide
                            key={index}
                            item={slide}
                            index={index}
                            activeSlideIndex={activeSlide}
                            changeSlide={changeSlide}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default DataCarousel;