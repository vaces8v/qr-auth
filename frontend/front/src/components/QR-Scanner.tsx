'use client'
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


const QRCodeGenerator = ({ authToken }: {authToken}) => {
    return <QRCode size={300} value={authToken} />;
};

const generateToken = async (token) => {
    try {
        await axios.post('http://localhost:3500/api/token/generate-token', {
            token
        });
    } catch (e) {
    }
};

export const QRCodeComponent = () => {
    const [authToken] = useState<string>(uuidv4());
    const [showSucces, setShowSucces] = useState(false)

    const sendValidate = async () => {
        try {
            await axios.post('http://localhost:3500/api/token/authenticate', {
                token: authToken
            })
        } catch (e) {}
    }

    const checkToken = async () => {
        try {

          const {data} = await axios.post('http://localhost:3500/api/token/check', {
                token: authToken
            })

            if(data.success) {
                setShowSucces(true)
            }

        } catch (e) {}
    }

    useEffect(() => {
        generateToken(authToken);
    }, []);

    useEffect(() => {
        let id;
        if (!showSucces) {
            id = setInterval(checkToken, 500);
        }
        return () => clearInterval(id);
    }, [showSucces]);

    return (
        <div className="flex flex-col items-center justify-center gap-[10px] text-white">
            {
                showSucces
                    ?
                    <div>Вы успешно зашли в систему</div>
                    :
                    <>
                        <h1>Авторизация через QR-код</h1>
                        <QRCodeGenerator authToken={authToken}/>
                        <button onClick={sendValidate}>send</button>
                    </>
            }

        </div>
    );
};
