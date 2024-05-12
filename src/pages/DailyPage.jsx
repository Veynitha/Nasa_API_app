import React, { useState, useEffect } from 'react';
import { getDailyPictureData } from '../services/ExternalAPIService';
import { formatDate } from '../utils/helper/FormatDate';
import { formatDayJsDate } from '../utils/helper/FormatDate';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function DailyPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [imageExplanation, setImageExplanation] = useState("");
    const [date, setDate] = useState(dayjs());

    const dailyDate = new Date();

    const setImageData = (data) => {
        setImageUrl(data.url);
        setImageTitle(data.title);
        setImageExplanation(data.explanation);
    };

    const fetchDailyData = async () => {
        const currentDate = formatDate(dailyDate);
        const requestData = await getDailyPictureData({ date: currentDate });
        if (!requestData) {
            const previousDate = new Date();
            previousDate.setDate(dailyDate.getDate() - 1);
            const formattedPreviousDate = formatDate(previousDate);
            const repeatRequestData = await getDailyPictureData({ date: formattedPreviousDate });
            if (repeatRequestData) {
                setImageData(repeatRequestData);
            } else {
                alert("Error Requesting Daily Data!");
            }
        } else {
            setImageData(requestData);
        }
    };

    const fetchAPODData = async (newDate) => {
        const requestData = await getDailyPictureData({ date: formatDayJsDate(newDate) });
        if (requestData) {
            setImageData(requestData);
        } else {
            alert("Error Requesting Daily Data!");
        }
    };

    const handleDateChange = (date) => {
        setDate(date);
        fetchAPODData(date);
    }

    useEffect(() => {
        fetchDailyData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dailyDate]);

    return (
        <div className='flex flex-col items-center justify-center mb-5'>
            <h1 className='text-5xl font-bold mb-10'>{imageTitle}</h1>
            <div className='mb-7'>
                <DatePicker
                    value={date}
                    onChange={handleDateChange}
                    format="YYYY/MM/DD"
                    renderInput={(params) => <input {...params} />}
                    className='bg-white p-1 rounded-md shadow-md mr-4'
                    maxDate={dayjs(new Date())}
                />
            </div>
            <div className="flex flex-col items-center"> {/* Wrapper div for the image and paragraph */}
                <img src={imageUrl} alt={imageTitle} style={{ width: "100%" }} />
                <p className='bg-gray-200 p-4 border shadow text-black rounded' style={{ width: "100%" }}>{imageExplanation}</p>
            </div>
        </div>
    );
}

export default DailyPage;
