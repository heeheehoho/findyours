import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../images/slide1.png';
import slide2 from '../images/slide2.png';
import slide3 from '../images/slide3.png';
import slide4 from '../images/slide4.png';

const Carousel = () => {
    // 옵션
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        className: 'slick-slider', // slick-slider 클래스 추가
        slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1,// 스크롤링할 슬라이드 수
        autoplay: true, // 자동 재생 설정
        autoplaySpeed: 3000 // 자동 재생 속도 (3초마다 슬라이드 전환)
        
    }

    return (
        <div className="carousel">
            <Slider { ...settings }>
                <div>
                <img src={slide1} alt="Slide 1" />
                </div>
                <div>
                <img src={slide2} alt="Slide 2" />
                </div>
                <div>
                <img src={slide3} alt="Slide 3" />
                </div>
                <div>
                <img src={slide4} alt="Slide 4" />
                </div>
            </Slider>
        </div>
    );
}
export default Carousel;