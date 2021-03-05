import React, { Component } from 'react'

import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import {header} from '../axios/header'
import {API_URL_USER,API_URL_TODO,getAvatar,PROFILE_URL_DETAIL,getUserTodoUrl,getUserPhotoUrl,getUserCommentUrl} from '../constant'
import _ from 'lodash'
class AdminCustomers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrData: [],
            searchText: '',

            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: '',

            forwardingAddress: {
                name: '',
                phone: '',
                street_address: '',
                city: '',
                number_home: '',
            },

            id: '',
            pagination:'',
            totalPages:'',
            last:true,
            first:true,
            cPage:0,
            page:[]

        }
    }

    componentDidMount() {
        console.log(API_URL_USER)
        Axios.get(API_URL_USER)
            .then((response) => {
                console.log(response.data);
                const data = response.data;
                var fdata = [];
                fdata = response.data;
                for (let i=0; i<10;i++){
                    console.log(fdata.length)
                    fdata = fdata.concat(data)
                }
                console.log(typeof(fdata))
                // fdata= Array.from(fdata)
                this.setState({ arrData: fdata });
                this.setState({pagination: response.data.pageable})
                this.setState({totalPages: fdata.length/20})
                this.setState({last:response.data.last})
                this.setState({first:response.data.first})
                var page = _.range( fdata.length / 20 )
                console.log(response)
                this.setState({page:page})

            })
        // console.log(this.state.arrData);

    }

    isChange = (event) => {
        this.setState({ searchText: event.target.value });
    };

    show = (val) => {

        this.setState({
            forwardingAddress: {
                name: val.name,
                phone: val.phone,
                number_home: val.number_home,
                street_address: val.street_address,
                city: val.city
            }
        })
    }


    viewDetail = async (id) =>{
        const {arrData} = this.state
        var users_todo_count = 0;
        var users_comments_count = 0;
        var users_photos_count = 0;
        await Axios.get(getUserTodoUrl(id))
            .then((response) => {
                // console.log(response)
                 users_todo_count = response.data.length;
        });
        await Axios.get(getUserTodoUrl(id))
        .then((response) => {
            // console.log(response)
            users_comments_count = response.data.length;
        });
        await Axios.get(getUserTodoUrl(id))
        .then((response) => {
            // const data = response.data.length
            // console.log(data)
            users_photos_count = response.data.length
        });
        alert(
            `this user has:
            ${users_todo_count} todos,
            ${users_comments_count} comments 
            and ${users_photos_count} photos
            `
        )
    }

    rerender(page,reload){
        this.setState({cPage:page})
    }
    render() {

        const {forwardingAddress, arrData, role, totalPages,last,first,cPage,page} = this.state;
        var result = [];
        if (arrData.length >= totalPages*20)
        // console.log(typeof(arrData))
            for (let i = cPage*20; i< cPage*20+20;i++){
                console.log(cPage)
                if(arrData[i])
                result.push(arrData[i]);
            }
        // console.log(result);
        // arrData.forEach((item) => {
        //     let item1 = item.username;
        //     if (item1.indexOf(this.state.searchText) !== -1 || !this.state.searchText) {
        //         result.push(item);
        //     }
        // })
        

        const data = result.map((values, key) => {
            return (<tr key={key}>
                <td>{key + 1}</td>
                <td> <img src={getAvatar(values.avatar)} style={{ width: '80%' }} /> </td>
                <td>  {values.name} </td>
                <td>  <a target="blank" href={PROFILE_URL_DETAIL+values.id}>{values.username} </a></td>
                <td> {values.address.street},{values.address.suite},{values.address.city} </td>
                {/* <td>  <button onClick={() => this.show(values)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">Forwarding Address</button></td> */}
                <td> {values.phone}
                 </td>
                 <td>
                 <NavLink className="nav-link btn btn-warning" to={`/user/${values.id}`}> View
                     </NavLink>
                     {/* <button className="btn btn-warning" onClick={() => this.viewDetail(values.id)}>View</button> */}
                 </td>
            </tr>
            )
        })
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'left' }}>
                        Notes: Because of data only has 10 row, so I was  faked it by dupicate data 10 times
                    </h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                        <div id="dataTable_filter" className="row dataTables_filter">

                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="search" />
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                        <thead>
                                            <tr role="row">

                                                <th>Id</th>
                                                <th style={{ width: '100px' }}>Image</th>
                                                <th>name</th>
                                                <th>username</th>
                                                <th>address</th>
                                                {/* <th>created</th> */}
                                                <th>phone</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="modal fade" id="exampleModalLong1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Role</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form id="form-create-product">
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1">User's Role</label>
                                                            <input
                                                                name="role"
                                                                value={role}
                                                                className="form-control py-4 modal-product-input"
                                                                type="text"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.editRole()}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade modal-product" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="modal-body">
                                            <h4 className="modal-title" >Details</h4>

                                            <h4 className="modal-title" >Name: {forwardingAddress.name}</h4>
                                            <h4 className="modal-title" >Phone: {forwardingAddress.phone}</h4>
                                            <h4 className="modal-title" >Address: {forwardingAddress.number_home} {forwardingAddress.street_address}, {forwardingAddress.city}</h4>
                                        </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing {cPage*20+1} to {cPage*20+20 > arrData.length?arrData.length:cPage*20+20} of {arrData.length} entries</div></div>

                                <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                    <ul className="pagination">
                                        <li className={first?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                                         {page.map(index =>(
                                             <li onClick={()=>{this.rerender(index, true)}} className={index == cPage ?"paginate_button page-item active" :"paginate_button page-item"} > <a aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">{index + 1} </a> </li>
                                         ))}
                                        <li className={last?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a herf="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Last</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminCustomers;