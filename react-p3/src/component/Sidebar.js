import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


export default class Sidebar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{background: '#000'}}>
                {/* Sidebar - Brand */}
                {/* <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin" >
                    <div className="sidebar-brand-icon rotate-n-15">
                    <i class="fa fa-camera" aria-hidden="true"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3"><sup>TODO</sup></div>
                </NavLink>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                 {/* Nav Item - Dashboard */}
                 {/* <li className="nav-item active">
                    <NavLink className="nav-link" to="/">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <span>..</span></NavLink>
                </li>  */}


                <hr className="sidebar-divider" />
                {/* Heading
                <div className="sidebar-heading">
                    ACTIVITIES
                    </div> */}
                {/* Nav Item - Pages Collapse Menu */}


                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/admin-orders">
                    <i className="fa fa-flag" aria-hidden="true"></i>
                        <span>List of Todos</span></NavLink>
                </li> */}

                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/admin-products">
                    <i className="fa fa-coffee" aria-hidden="true"></i>
                        <span>Manage products</span></NavLink>
                </li> */}

                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/admin-categories">
                    <i className="fa fa-coffee" aria-hidden="true"></i>
                        <span>List of Photos</span></NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/all">
                    <i className="fa fa-user" aria-hidden="true"></i>
                        <span>List of users</span></NavLink>
                </li>

                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/admin-booking">
                    <i className="fa fa-coffee" aria-hidden="true"></i>
                        <span>Manage booking</span></NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/admin-contact">
                    <i className="fa fa-coffee" aria-hidden="true"></i>
                        <span>Manage contact</span></NavLink>
                </li> */}

                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" />
                </div>
            </ul>
        )
    }
}
