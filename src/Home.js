import React, { useState } from 'react';

const Home = ({ dogImage, fetchDogImage, addToCart }) => {
    const [loading, setLoading] = useState(false);

    const handleFetchImage = async () => {
        setLoading(true);
        const price = getRandomPrice();
        await fetchDogImage(price);
        setLoading(false);
    };

    const getRandomPrice = () => {
        return (Math.random() * (50 - 1) + 1).toFixed(2);
    };

    return (
        <div className="container mt-4">
            <h1>Home</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <p>Loading...</p>
                    ) : dogImage ? (
                        <>
                            <div
                                className="img-container"
                                style={{
                                    height: '300px',
                                    width: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={dogImage}
                                    alt="Random Dog"
                                    className="img-fluid rounded"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <button className="btn btn-success mt-3" onClick={addToCart}>
                                Add to Cart
                            </button>
                        </>
                    ) : (
                        <p>Click "Fetch New Image" to see a dog</p>
                    )}
                    <button className="btn btn-primary mt-3" onClick={handleFetchImage}>
                        {loading ? 'Fetching...' : 'Fetch New Image'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
