import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('userID');
        
        // Redirect to login page
        navigate('/login');
    };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">MyApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add New
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/clients">New Client Entry</a></li>
                                    <li><a className="dropdown-item" href="/addjudge">New Jugde Entry</a></li>
                                    <li><a className="dropdown-item" href="/addcasetype">New Case Type Entry</a></li>
                                    <li><a className="dropdown-item" href="/addclienttype">New Client Type Entry</a></li>
                                    
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Search
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/SearchByDate">Date Wise Search</a></li>
                                    <li><a className="dropdown-item" href="/SearchByJudge">Search Judge Wise</a></li>
                                    <li><a className="dropdown-item" href="/SearchCaseByMonthYear">Month & Year </a></li>
                                    <li><a className="dropdown-item" href="/clientslist">Client Profiles</a></li>
                                    <li><a className="dropdown-item" href="#">New Client Type Entry</a></li>
                                    
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Update
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/clienttypelist">Update Client Entry</a></li>
                                    <li><a className="dropdown-item" href="/judgelist">Update Jugde Entry</a></li>
                                    <li><a className="dropdown-item" href="/casetypelist">Update Case Type Entry</a></li>
                                    <li><a className="dropdown-item" href="#">Date Update</a></li>
                                    
                                    
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Payments
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/Addpayments">Add Payments</a></li>
                                    {/* <li><a className="dropdown-item" href="/judgelist">Update Jugde Entry</a></li>
                                    <li><a className="dropdown-item" href="/casetypelist">Update Case Type Entry</a></li>
                                    <li><a className="dropdown-item" href="#">Date Update</a></li> */}
                                    
                                    
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    
    </>
  )
}

export default Navbar