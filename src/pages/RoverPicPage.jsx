import React, { useState, useEffect } from 'react';
import { getRoverPictureData, getRoverManifest } from '../services/ExternalAPIService';
import { Pagination } from '@mui/material';
import ImageLister from '../components/ImageLister/ImageLister';
import { CuriosityCameras, OpportunityCameras, SpiritCameras, Rovers } from '../utils/constants/Dropdown';
import BasicSelect from '../components/Dropdown/BasicSelect';

const RoverPicPage = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [camera, setCamera] = useState('');
    const [rover, setRover] = useState('Curiosity');
    const [camInfo, setCamInfo] = useState([]);
    const [minSol, setMinSol] = useState(1);
    const [maxSol, setMaxSol] = useState(1);
    const [sol, setSol] = useState(1);
    const [error, setError] = useState(false);
    const [solError, setSolError] = useState('');

    const fetchPhotos = async () => {
        try {
            const response = await getRoverPictureData({ sol: sol, page: page, camera: camera, rover: rover });
            if (response.photos.length === 0) {
                alert('No photos found');
            }
            setPhotos(response.photos);
        } catch (error) {
            console.error(error);
            alert('Error fetching photos');
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleCameraChange = (selectedCamera) => {
        setCamera(selectedCamera);
    };

    const handleCameraSelection = async () => {
        fetchPhotos();
    };

    const handleSolChange = (event) => {
        const newSol = parseInt(event.target.value);
        if (!isNaN(newSol) && newSol >= minSol && newSol <= maxSol) {
            setSol(newSol);
            setError(false);
            setSolError('');
        } else {
            setError(true);
            setSolError('The maximum Sol date is ' + maxSol);
        }
    };

    useEffect(() => {
        const fetchManifestData = async () => {
            try {
                const response = await getRoverManifest(rover);
                setMaxSol(response.photo_manifest.max_sol);
            } catch (error) {
                console.error(error);
            }
        };
        fetchManifestData();
    }, [rover]);

    useEffect(() => {
        setCamInfo(CuriosityCameras);
        fetchPhotos();
    }, [page]);

    return (
        <div className="px-4 py-8 flex flex-col h-screen">
            <h1 className="text-3xl font-bold mb-4">Mars Rover Photos</h1>
            <div className='w-2/4 mb-2 flex flex-row items-center'>
                <label htmlFor="sol" className="mr-2 font-semibold">Sol Date:</label>
                <input 
                    type="number" 
                    id="sol" 
                    value={sol} 
                    onChange={handleSolChange} 
                    min={minSol} 
                    max={maxSol} 
                    className={`p-1 rounded-md shadow-md ${error ? 'border-red-500' : 'border-gray-300'} ${error ? 'text-red-500' : 'text-black'}`}
                    style={{width: '80px'}}
                />
                {error && <span className="text-sm text-red-500 ml-2">{solError}</span>}
            </div>
            <div className='flex flex-row'>
                <div className='w-1/4 mb-2 mr-5 rounded'>
                    <BasicSelect itemsData={camInfo} onChange={handleCameraChange} title={'Cameras'} initValue={camera} />
                </div>
                <div className='w-1/4 mb-2 rounded flex'>
                    <button onClick={handleCameraSelection} className='bg-blue-500 text-white p-2 rounded-md w-24'>Find</button>
                </div>
            </div>
            <div className="flex-grow block overflow-y-auto">
                <ImageLister
                    itemData={photos}
                    width={'auto'}
                    height={'auto'}
                    variant="quilted"
                    cols={3}
                    rowHeight={'auto'}
                />
            </div>
            <div className="mt-4 self-end rounded-full">
                <Pagination count={10} page={page} onChange={handlePageChange} className='bg-white'/>
            </div>
        </div>
    );    
};

export default RoverPicPage;
