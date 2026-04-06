import './djsShouldFollow.css'
import { useState, useEffect } from 'react'

import DjShouldFollow from '../djShouldFollow/DjShouldFollow'
import api from '../../api.js'
import WaitingApi from "../waitingApi/WaitingApi"
import React from 'react'

function DjsShouldFollow() {

    const [djs, setDjs] = useState()
    const [apiState, setApiState] = useState('idle')

    useEffect(() => {
        async function fetchDjs() {
            setApiState('loading')
            try {
                const res = await api.get('/djs-should-follow');
                console.log(res);
                setDjs(res.data);
                setApiState('success')

            } catch (error) {
                setApiState('loading')
            }
        }
        fetchDjs();
    }, [setApiState]);




    return (
        <div className="djs-should-follow">
            <div className="top-section">
                <h5 className="title">Djs Should Follow</h5>
                <p className="others">Show Others</p>
            </div>
            {
                apiState === "loading" && (
                    <WaitingApi />
                )
            }
            {
                apiState === "success" && (
                    <div className="djs">
                        {djs?.map((djInfo, i) => {
                            return <DjShouldFollow key={i} djInfo={djInfo} />
                        })}
                    </div>
                )
            }


        </div>
    )
}

export default DjsShouldFollow