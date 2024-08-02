'use client'
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosError } from "axios";

// Определение типа для props компонента QRCodeGenerator
interface QRCodeGeneratorProps {
    authToken: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ authToken }) => {
    return <QRCode size={300} value={authToken} />;
};

const generateToken = async (token: string): Promise<void> => {
    try {
        await axios.post('http://localhost:3500/api/token/generate-token', { token });
    } catch (e) {
        const error = e as AxiosError;
        console.error(error);
    }
};

export const QRCodeComponent: React.FC = () => {
    const [authToken] = useState<string>(uuidv4());
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const sendValidate = async (): Promise<void> => {
        try {
            await axios.post('http://localhost:3500/api/token/authenticate', { token: authToken });
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        }
    };

    const checkToken = async (): Promise<void> => {
        try {
            const { data } = await axios.post('http://localhost:3500/api/token/check', { token: authToken });

            if (data.success) {
                setShowSuccess(true);
            }
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        }
    };

    useEffect(() => {
        generateToken(authToken);
    }, [authToken]); // Добавляем authToken как зависимость

    useEffect(() => {
        let id: ReturnType<typeof setInterval>;
        if (!showSuccess) {
            id = setInterval(checkToken, 500);
        }
        return () => {
            if (id) clearInterval(id);
        };
    }, [showSuccess]);

    return (
        <div className="flex flex-col items-center justify-center gap-[10px] text-white">
            {showSuccess ? (
                <div>Вы успешно зашли в систему</div>
            ) : (
                <>
                    <h1>Авторизация через QR-код</h1>
                    <QRCodeGenerator authToken={authToken} />
                    <button onClick={sendValidate}>send</button>
                </>
            )}
        </div>
    );
};
