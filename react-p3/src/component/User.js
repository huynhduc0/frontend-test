import React, { Component } from 'react'

import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import {header} from '../axios/header'
import {API_URL_USER,API_URL_TODO,getAvatar,PROFILE_URL_DETAIL,getUserTodoUrl,getUserPhotoUrl,getUserCommentUrl} from '../constant'
import _ from 'lodash'
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{
                address:{}
            },
            users_todo_count:'',
            users_comments_count:'',
            users_photos_count :''
        }
    }
    async componentDidMount(){
        let { id } = this.props.match.params
        console.log(id)
        var user = {}
        await Axios.get(API_URL_USER+"/"+id)
        .then((response) => {
            console.log(response.data);
            user = response.data;
            this.setState({user:user})
        })
        const {arrData} = this.state
        var users_todo_count = 0;
        var users_comments_count = 0;
        var users_photos_count = 0;
        await Axios.get(getUserTodoUrl(id))
            .then((response) => {
                // console.log(response)
                 users_todo_count = response.data.length;
        });
        await Axios.get(getUserCommentUrl(user.name))
        .then((response) => {
            // console.log(response)
            users_comments_count = response.data.length;
        });
        await Axios.get(getUserPhotoUrl(id))
        .then((response) => {
            // const data = response.data.length
            // console.log(data)
            users_photos_count = response.data.length
        });
        this.setState({users_comments_count:users_comments_count});
        this.setState({users_todo_count:users_todo_count})
        this.setState({users_photos_count:users_photos_count});
    }
    render() {
        const {user,users_comments_count,users_todo_count,users_photos_count} = this.state
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">User: {user.name}</h1>
                    <h1 className="h3 mb-0 text-gray-800">Username: {user.username}</h1>
                    <h1 className="h3 mb-0 text-gray-800">Address:{user.address.street},{user.address.suite},{user.address.city}</h1>
                
                      
                </div>
                {/* Content Row */}
                <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Num of Comments</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{users_comments_count}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Earnings (Monthly) Card Example */}
                  
                    <div className="col-xl-3 col-md-6 mb-4">
                    <NavLink className="nav-link " to={`/user/${this.props.match.params.id}/photos`}>
                    
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Num of Albums</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{users_photos_count}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </NavLink>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                    <NavLink className="nav-link " to={`/user/${this.props.match.params.id}/todos`}>
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Num of Todo</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{users_todo_count}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </NavLink>
                    </div>
                   </div>
                   </div>
        )
    }
}
