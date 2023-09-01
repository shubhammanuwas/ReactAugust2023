import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function Navbar(props) {
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} `}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.heading}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">{props.link}</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div className="d-flex">
                            <div className='bg-primary rounded mx-2' onClick={props.toggleMode} style={{height:'30px', width:'30px'}}></div>
                        </div>
                        <div className={`form-check  form-switch mx-3 text-${props.mode==='light' ? 'dark' : 'light'}`}>
                            <input className="form-check-input" type="checkbox"  onClick={props.toggleMode} id="flexSwitchCheckDefault"  />
                            <label className="form-check-label " htmlFor="flexSwitchCheckDefault">{props.mode}</label>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
    title: "Navbar",
    link: "Link"
}
