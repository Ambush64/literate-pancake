import React, { useEffect, useState } from 'react';

const History = () => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const savedImages = JSON.parse(localStorage.getItem('dogHistory')) || [];
        setHistoryData(savedImages);
    }, []);

    const clearHistory = () => {
        localStorage.removeItem('dogHistory');
        setHistoryData([]);
    };

    return (
        <div className="container mt-4">
            <h1>History</h1>
            {historyData.length === 0 ? (
                <p>Your history is empty.</p>
            ) : (
                <div>
                    <button className="btn btn-danger mb-3" onClick={clearHistory}>
                        Clear History
                    </button>
                    <div className="row">
                        {historyData.map((item, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card">
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt={`Dog ${index + 1}`}
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">Dog {index + 1}</h5>
                                        <p className="card-text">Price: ${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
