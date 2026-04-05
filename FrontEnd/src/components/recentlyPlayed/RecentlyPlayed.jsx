import "./recentlyPlayed.css"
import { useState, useEffect } from 'react'
import api from '../../api.js'
import Mix from '../mix/Mix'
import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';




function RecentlyPlayed() {

    const [mixes, setMixes] = useState([]);
    const [current, setCurrent] = useState(null);
    useEffect(() => {
        async function fetchMixes() {
            const res = await api.get('/recently-played');
            console.log(res);
            setMixes(res.data);
        }
        fetchMixes();
    }, []);


    return (
        <>
            <h3 className = "recently title">Recently Played</h3>
            <Swiper
                // install Swiper modules
                className = "leksous-swiper"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {
                    mixes?.map(mix => {
                        return (
                            <SwiperSlide>
                                <Mix mix={mix} />
                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>
            
        </>
    )
}

export default RecentlyPlayed