import './moreOfWhatYouLike.css'
import { useState, useEffect } from 'react'

import Mix from '../mix/Mix'
import api from '../../api.js'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react'

function MoreOfWhatYouLike() {
    const [mixes, setMixes] = useState([]);
    const [current, setCurrent] = useState(null);
    useEffect(() => {
        async function fetchMixes() {
            const res = await api.get('/more-of-what-you-like');
            console.log(res);
            setMixes(res.data);
        }
        fetchMixes();
    }, []);
    useEffect(() => {
        console.log(mixes);

    }, [mixes])

    return (
        <>
            <h3 className="more-of-what-you-like title">More Of What You Like</h3>
            <Swiper
                // install Swiper modules
                className="leksous-swiper"
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

export default MoreOfWhatYouLike