import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand font-weight-bold" to="/">
                Dog App
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link font-weight-bold" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link font-weight-bold" to="/history">
                            History
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link font-weight-bold" to="/cart">
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav