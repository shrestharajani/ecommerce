import { Carousel } from 'antd';
import React from 'react';
import image1 from "../../images/wall2.jpg"
import image2 from "../../images/wall1.jpg"
import image3 from "../../images/vodka.jpg"
import image4 from "../../images/raksi.png"

export const Slider = () => (
    <Carousel autoplay>
        <div className='contentStyle'>
            <img src={image1} alt="not found" />
        </div>
        <div className='contentStyle'>
            <img src={image2} alt="notfound2" />
        </div>
        <div className='contentStyle' >
            <img src={image3} alt="not found3" />
        </div>
        <div className='contentStyle'>
            <img src={image4} alt="not found4" />
        </div>
    </Carousel>
);

