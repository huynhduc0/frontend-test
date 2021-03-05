import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";
import '../page/admin.css';

import Header from '../component/Header';
import Home from '../component/User';
import Sidebar from '../component/Sidebar';
import AdminCustomers from '../page/AdminCustomers';
import AdminCategories from '../page/AdminCategories';
import AdminOrders from '../page/AdminOrders';
import Albumn from '../page/Albumn';

export default class Direction extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <Route path="/" component={Sidebar}/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                    <Route path="/all" component={AdminCustomers} />
                        <div className="container-fluid" id="layoutSidenav_content">
                            <Route path="/user/:id" component={Home} />
                            <Route path="/user/:id/todos" component={AdminOrders} />
                            <Route path="/user/:id/photos" component={Albumn} />
                            <Route path="/user/:id/comments" component={Home} />
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}


