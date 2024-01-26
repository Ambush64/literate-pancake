import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [dogHistory, setDogHistory] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('dogCart')) || [];
        const storedHistory = JSON.parse(localStorage.getItem('dogHistory')) || [];
        setCart(storedCart);
        setDogHistory(storedHistory);
    }, []);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const clearCart = () => {
        localStorage.removeItem('dogCart');
        setCart([]);
        setSelectedDog(null);
    };

    const handleSelectChange = (e) => {
        const selectedPrice = parseFloat(e.target.value);
        const selectedDogFromHistory = dogHistory.find((item) => parseFloat(item.price) === selectedPrice);
        const selectedDogFromCart = cart.find((item) => parseFloat(item.price) === selectedPrice);
        setSelectedDog(selectedDogFromCart || selectedDogFromHistory);
    };

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('dogCart')) || [];
        const updatedCart = [...existingCart, selectedDog];
        localStorage.setItem('dogCart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    return (
        <div className="container mt-4">
            <h1>Cart</h1>
            <button className="btn btn-danger mb-3" onClick={clearCart}>
                Clear Cart
            </button>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="dogSelector" className="form-label">
                        Select Dog by Price:
                    </label>
                    <select
                        id="dogSelector"
                        className="form-select"
                        onChange={handleSelectChange}
                        value={selectedDog ? selectedDog.price : ''}
                    >
                        <option value="" disabled>
                            Select Price
                        </option>
                        {dogHistory.map((item, index) => (
                            <option key={index} value={parseFloat(item.price)}>
                                ${item.price}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedDog && (
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <img
                                src={selectedDog.image}
                                className="card-img-top"
                                alt={`Dog`}
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Dog</h5>
                                <p className="card-text">Price: ${selectedDog.price}</p>
                                <button className="btn btn-success" onClick={addToCart}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="col-md-12 mt-3">
                        <h3>Current Dogs in Cart:</h3>
                        <div className="row">
                            {cart.map((item, index) => (
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
                <div className="col-md-12">
                    <hr />
                    <p>Total: ${calculateTotal()}</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
