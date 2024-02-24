import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    let [searchTerm, setSearchTerm] = useState("");

    function buttonSubmit(event) {
        event.preventDefault();
        props.changeSearchBar(searchTerm);
    }

    function changeTerm(event) {
        setSearchTerm(event.target.value);
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#">YourMemories</Link>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Gallery</Link>
                            </li>
                            {props.user == "undefined" || props.user.status == "loggedout" && <a className="nav-link" href="http://localhost:3001/signin">Login</a>}
                            {props.user.status == "loggedin" &&  
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create" href="#">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3001/signout">Logout</a>
                                </li>
                            </>}
                        </ul>
                        <form className="d-flex" role="search" onSubmit={buttonSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={changeTerm} value={searchTerm}/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )

}