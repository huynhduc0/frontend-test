import Axios from 'axios';
import React, { Component,Link } from 'react'
import {header} from '../axios/header'
import {API_URL_TODO,getUserTodoUrl, GET_REPORT_POST, TODO_HANDLE,MAIN_URL_DETAIL,PROFILE_URL_DETAIL, getAvatar} from '../constant'
import { Fragment } from 'react';
import { notificationComponent } from '../utils/notification';
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton';
export default class AdminOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            searchText: '',
            done:false,
            undone:false,
            reportDetails:[],
            forwardingAddress: {
                name: '',
                phone: '',
                street_address: '',
                city: '',
                number_home: '',

                
            },
            pagination:'',
            totalPages:'',
            last:true,
            first:true,
            cPage:0,
            page:[],
            OrderDetails: []
        }
    }

    isChange = (event) => {
        this.setState({ searchText: event.target.value.toUpperCase() });
    };

    componentDidMount() {
        let { id } = this.props.match.params
        Axios.get(getUserTodoUrl(id))
            .then((response) => {
                if(response.data) {
                    console.log(response.data)
                    const data = response.data;
                    // fdata= Array.from(fdata)
                    this.setState({ arr: data });
                    this.setState({pagination: response.data.pageable})
                    this.setState({totalPages: data.length/10})
                    this.setState({last:response.data.last})
                    this.setState({first:response.data.first})
                    var page = _.range( data.length / 10 )
                    console.log(response)
                    this.setState({page:page})
                    this.setState({isLoading:false})
                    this.setState({arrLoading:Array(data.length).fill(1)})
                
                    // this.setState({ arr: data });    
                }

            })
    }

    displayOrderDetails = (arrayOrder) => {
        // let item = Object.values(arrayOrder)
        this.setState({
            OrderDetails: arrayOrder
        })

        console.log(arrayOrder);

    }



    displayForwardingAddr = (reportDetail) => {
        // console.log(addressDefault);
        this.setState({
            reportDetails: reportDetail,
        })
        // console.log(forwardingAddress);
    }
    checkCritr(crit, str){
        var flag = false
        crit.map((ct)=>{
            // console.log(ct.reportCriterias.criteriaName.toUpperCase().indexOf(str)
            if (ct.reportCriterias.criteriaName.toUpperCase().indexOf(str) != -1)
            flag = true;
        })
        return flag;
    }


    getArrayOrder = (array) => {
        let item = array.map((value, key) => {
            return (
                <tr>
                    <td>
                        {key + 1}
                    </td>
                    <td>
                        <img src={value.url} style={{ width: 80 }} />
                    </td>
                    <td>
                        {value.productName}
                    </td>
                    <td>
                        {value.count}
                    </td>
                    <td>
                        {value.price}
                    </td>
                </tr>
            )
        })
        return item;
    }
    handlePost(val){
        let { id } = this.props.match.params
        const { arr } = this.state
        console.log(val)
        val.completed = !val.completed
        Axios.put(TODO_HANDLE+"/"+val.id,val,{
            headers:header,
        }).then(async response => {
            const data = response.data;
            console.log(data);
            arr.map( (rp,i)=>{
                if(val.id == rp.id){
                    arr[i] = data
                }
            });
            this.setState({arr:arr})
            notificationComponent('success', "Update done")
        }).catch(err => {
            notificationComponent('error', err.response?err.response.message:err.status)
        });
    }
    rerender(page,reload){
        this.setState({isLoading:true})
        if(this.state.cPage == page) return;
        this.setState({cPage:page})
        this.setState({isLoading:false})

    }
    handleCheckBox(){
        const {done} = this.state
        this.setState({done:!done})
    }
    handleUCheckBox(){
        const {undone} = this.state
        this.setState({undone:!undone})
    }

    render() {
        const { arr,done,undone, search,reportDetails,totalPages,last,first,cPage,page,isLoading,arrLoading, OrderDetails } = this.state;
        // console.log(arr)
        var result = [];
        var fresult = []
        // if (arr.length >= totalPages*10)
        // // console.log(typeof(arrData))
        //     for (let i = cPage*10; i< cPage*10+10;i++){
        //         console.log(cPage)
        //         if(arr[i])
        //         result.push(arr[i]);
        // }
        // console.log(result)
        const che = done?(undone?"all":true):(undone?false:"all");
            console.log(che);
        arr.forEach((item) => {
            // console.log(item.title,this.state.searchText,item.title.indexOf(this.state.searchText))

            if ((item.completed !== che || che == 'all') && (item.title.toUpperCase().indexOf(this.state.searchText) !== -1 )) {
                console.log(item.completed)
                result.push(item);
            }
        })
        const vpage = _.range( result.length / 10 )
        // console.log(typeof(arrData))
        for (let i = cPage*10; i< cPage*10+10;i++){
                // console.log(cPage)
                if(result[i])
                fresult.push(result[i]);
        }
        const datas = fresult.map((values, key) => {
            // console.log(values);
            return (
                <tr key={key} >
                    <td >{isLoading?(<Skeleton />):key + 1}</td>
                    <td >{isLoading?(<Skeleton />):values.title}</td>
                    {/* <td >{isLoading?(<Skeleton />):(<a target="blank" href={PROFILE_URL_DETAIL+values.posts.author.id}>{values.posts.author.username}</a>)}</td> */}
                    {/* <td><Fragment><a target="blank" href={MAIN_URL_DETAIL+values.id}><img hidden={arrLoading[key] || isLoading} onLoad={()=>{const {arrLoading} = this.state;arrLoading[key] = 0;this.setState({ arrLoading: arrLoading });}} src={getAvatar(values.posts.medias[0].media_url)} style={{ width: 80 }} /></a>{arrLoading[key] || isLoading?(<Skeleton  width={80} height={80}/>):""}</Fragment></td> */}
                    {/* <td data-toggle="modal" data-target="#exampleModalLong" > */}
                        {/* {isLoading?(<Skeleton />):(<button className="btn btn-secondary" onClick={() => this.displayForwardingAddr(values.reportDetails)}>Details ({values.reportDetails.length}) </button>)} */}
                    {/* </td> */}
                    {/* <td> {isLoading?(<Skeleton />): (values.closed) ? (<span className="btn btn-default">Closed</span> ): (<span className="btn btn-warning">Unhandled</span>)} </td> */}
                    <td > {isLoading?(<Skeleton />):!values.completed?(<button  className="btn btn-success" onClick={() => this.handlePost(values)}>Done</button>):(<button  className="btn btn-sencondary" onClick={() => this.handlePost(values)}>Doing</button>)}</td>
                    {/* <td >{values.total}</td> */}
                    {/* <td ><button  className="btn btn-warning" onClick={() => this.delete(values.id)} >Delete</button></td> */}
                </tr>)
        });
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'left' }}>Report Datatables</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className=" col-sm-12 col-md-6">
                                    <div id="dataTable_filter" className="row dataTables_filter">
                                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="search" />
                                        
                                    </div>
                                    <h3> Done: <input type="checkbox" onChange={()=>this.handleCheckBox()} /></h3>
                                    <h3> Doing: <input type="checkbox" onChange={()=>this.handleUCheckBox()} /></h3>
                                </div>
                            </div>


                            <div className="modal fade modal-product" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="forwardingAddress">Report List</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {reportDetails.map((report, index) => (
                                                 <Fragment>
                                                <h4 className="modal-title" >{report.reportUser.username}: {report.reportCriterias.criteriaName}</h4>
                                                <hr/>
                                                </Fragment>
                                            ))}
                                          
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal fade modal-product bd-example-modal-lg" id="exampleModalLong1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle1" aria-hidden="true">
                                <div className="modal-dialog modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="forwardingAddress">Forwarding Address</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputCategory">Product</label>
                                                    <div>
                                                        <table>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Title</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            {/* {OrderDetails ? this.getArrayOrder(OrderDetails) : null} */}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                        <thead>
                                            <tr role="row">
                                                <th style={{ width: '100px' }} >No</th>
                                                <th style={{ width: '100px' }} >Post Title</th>
                                                <th style={{ width: '100px' }} >Action</th>
                                                {/* <th style={{ width: '100px' }} >#</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    {/* <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div> */}
                                    </div>

                                <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                    <ul className="pagination">
                                        <li className={first?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                                         {vpage.map(index =>(
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
