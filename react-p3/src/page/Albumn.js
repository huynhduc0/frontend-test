import Axios from 'axios';
import React, { Component,Link } from 'react'
import {header} from '../axios/header'
import {API_URL_ALBUMN,getUserPhotoUrl,getPhotoByAlbumn, GET_REPORT_POST, TODO_HANDLE,MAIN_URL_DETAIL,PROFILE_URL_DETAIL, getAvatar} from '../constant'
import { Fragment } from 'react';
import { notificationComponent } from '../utils/notification';
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton';
export default class Albumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [
                {
                    image:[],
                    arrLoading:[]
                }
            ],
            isLoading: true,
            arrLoading:[]
        }
    }

    async componentDidMount() {
        let { id } = this.props.match.params
        var data = [];
       await Axios.get(getUserPhotoUrl(id))
            .then((response) => {
                if(response.data) {
                    console.log(response.data)
                    const data = response.data;
                    // fdata= Array.from(fdata)
                    this.setState({ arr: data });
                    this.setState({isLoading:false})
                    this.setState({arrLoading:Array(data.length).fill(1)})
                    data.map((albumn, key)=>{
                        console.log(albumn.id);
                        Axios.get(getPhotoByAlbumn(id))
                        .then((response) => {
                            if(response.data) {
                                console.log(response.data)
                                data[key].image = response.data
                                data[key].isLoading = false;
                                data[key].arrLoading = Array(data[key].image.length).fill(1)}
                                this.setState({ arr: data });
                                // this.setState({arrLoading:Array(data.length).fill(1)})
                            // }
                        });
                    })
                
                    // this.setState({ arr: data });    
                }

            });
        // const {arr } = this.state
    }


    render() {
        const { arr,isLoading,arrLoading} = this.state;
        // arr.forEach((item) => {
        //     // // console.log(item.title,this.state.searchText,item.title.indexOf(this.state.searchText))

        //     // if ((item.completed !== che || che == 'all') && (item.title.toUpperCase().indexOf(this.state.searchText) !== -1 )) {
        //     //     console.log(item.completed)
        //     //     result.push(item);
        //     // }
        // }
        const datas = arr.map((values, key) => {
            console.log(values);
            return (
                <tr key={key} >
                    <p>{isLoading?(<Skeleton />):key + 1 +". "+ values.title}</p>
                    {/* <td >{isLoading?(<Skeleton />):values.title}</td> */}
                    {/* <td >{isLoading?(<Skeleton />):(<a target="blank" href={PROFILE_URL_DETAIL+values.posts.author.id}>{values.posts.author.username}</a>)}</td> */}
                    {values.image?
                        values.image.map((image,k)=>{
                            return(
                                <Fragment>
                                    <img hidden={arr[key].arrLoading[k]|| isLoading} onLoad={()=>{arr[key].arrLoading[k] = 0; 
                                    this.setState({ arr: arr });}} src={image.thumbnailUrl} style={{ width: 80, height:80}} />
                                    {arr[key].arrLoading[k]|| isLoading?(<Skeleton  width={80} height={80}/>):""}
                                </Fragment>
                            )
                        })
                        :''
                    }
                  
                    {/* <td data-toggle="modal" data-target="#exampleModalLong" > */}
                        {/* {isLoading?(<Skeleton />):(<button className="btn btn-secondary" onClick={() => this.displayForwardingAddr(values.reportDetails)}>Details ({values.reportDetails.length}) </button>)} */}
                    {/* </td> */}
                    {/* <td> {isLoading?(<Skeleton />): (values.closed) ? (<span className="btn btn-default">Closed</span> ): (<span className="btn btn-warning">Unhandled</span>)} </td> */}
                    {/* <td > {isLoading?(<Skeleton />):!values.completed?(<button  className="btn btn-success" onClick={() => this.handlePost(values)}>Done</button>):(<button  className="btn btn-sencondary" onClick={() => this.handlePost(values)}>Doing</button>)}</td> */}
                    {/* <td >{values.total}</td> */}
                    {/* <td ><button  className="btn btn-warning" onClick={() => this.delete(values.id)} >Delete</button></td> */}
                </tr>)
        });
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'left' }}>Albums</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className=" col-sm-12 col-md-6">
                                    <div id="dataTable_filter" className="row dataTables_filter">
                                        {/* <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="search" /> */}
                                        
                                    </div>
                                    {/* <h3> Done: <input type="checkbox" onChange={()=>this.handleCheckBox()} /></h3>
                                    <h3> Doing: <input type="checkbox" onChange={()=>this.handleUCheckBox()} /></h3> */}
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
                                {datas}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
