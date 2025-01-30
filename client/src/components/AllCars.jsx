import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import loadingif from './loading.gif';
const AllCars = () => {
    const [cars, setCars] = useState([]);
    const [carImages, setCarImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");  // State for the search keyword
    const navigate = useNavigate();  // Create the navigate function

    useEffect(() => {
        console.log("token", localStorage.getItem('authToken'));
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    params: { keyword: searchKeyword }  // Pass the search keyword as a query parameter
                });
                setCars(response.data);
                fetchCarImages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCarImages = async (carsData) => {
            const imagesData = {};
            for (let car of carsData) {
                const carImagesForCar = await Promise.all(
                    car.images.map(async (imageId) => {
                        try {
                            const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-image/${imageId}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('authToken')
                                },
                                responseType: 'blob'
                            });
                            return URL.createObjectURL(imageResponse.data);
                        } catch (err) {
                            console.error(`Error fetching image ${imageId}:`, err);
                            return null;
                        }
                    })
                );
                imagesData[car._id] = carImagesForCar.filter((url) => url !== null);
            }
            setCarImages(imagesData);
        };

        fetchCars();
    }, [searchKeyword]);


    if (loading) return <>
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <img src={loadingif} style={{ height: '100px', width: '100px' }} alt="" />
        </div>
    </>;

    const handleCarClick = (carId) => {
        navigate(`/product/${carId}`, {
            state: { carId }
        });
    };

    return (
        <div>


            {/* Search input */}
            <div className="d-flex justify-content-between flex-wrap mb-3">
                <h3 className='text-decoration-underline'>All Cars</h3>
                <div className="">
                    <i class="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Search for cars, descripiton, tags"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)} // Update search keyword on input change
                        style={{ padding: '8px', border: 'none', outline: 'none', width: '300px' }}
                        className="border-bottom border-dark"

                    />
                </div>

            </div>

            <div className="car-list">
                {cars.length === 0 ? (
                    <h2>No cars found</h2>
                ) : (
                    cars.map((car) => (
                        <div
                            key={car._id}
                            className="car-card"
                            style={{
                                marginBottom: '20px',
                                backgroundColor: 'transparent',
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                border: 'none',
                                cursor: 'pointer',// Add cursor to indicate clickability
                                width: '300px',
                            }}
                        >
                            <div className="car-images">
                                <Carousel showThumbs={false} dynamicHeight={false} showStatus={true}>
                                    {carImages[car._id]?.map((imageUrl, index) => (
                                        <div key={index} style={{ minHeight: '100px' }}>
                                            <img
                                                src={imageUrl}
                                                alt={index + 1}
                                                style={{ width: '100%', height: '200px', borderRadius: '5px', objectFit: 'cover' }}
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            <div className=''>
                                <h5 className='mt-2'>{car.title}</h5>
                                <p className=" btn btn-dark mt-2 " style={{ fontSize: '14px' }} onClick={() => handleCarClick(car._id)} >view more</p>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div >
    );
};

export default AllCars;
