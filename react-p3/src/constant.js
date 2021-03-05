// const SERVER_URL = "http://congchuabuoito.southeastasia.cloudapp.azure.com/"
// const SERVER_URL = "http://localhost:8080/"
const SERVER_URL = "https://jsonplaceholder.typicode.com/"
export const API_URL_USER = SERVER_URL + "users"
export const API_URL_TODO = SERVER_URL + "todos"
export const API_URL_CMT = SERVER_URL + "comments"
export const API_URL_ALBUMN = SERVER_URL + "albums"
export const TODO_HANDLE = SERVER_URL+"todos"


export const LOGIN_URL = SERVER_URL+"login"
export const GET_USER = SERVER_URL+"admin/user"
export const GET_REPORT_POST = SERVER_URL+"admin/report/post"
export const GET_POST = SERVER_URL+"admin/post"
export const POST_HANDLE = SERVER_URL+"admin/post/handle"

export const MAIN_URL_DETAIL = "http://congchuabuoito.southeastasia.cloudapp.azure.com:6969/details.html?id="
export const PROFILE_URL_DETAIL = "http://congchuabuoito.southeastasia.cloudapp.azure.com:6969/profile.html?id="
export function getAvatar(url){
    return url?(url.startsWith("http")?url:SERVER_URL+"img/"+url):null
}
export function getUserTodoUrl(id){
    return API_URL_USER+"/"+id+"/todos"
}
export function getUserPhotoUrl(id){
    return API_URL_ALBUMN+"?userId="+id
}
export function getUserCommentUrl(name){
    return API_URL_CMT+"?name="+name
}
export function getPhotoByAlbumn(id){
    return API_URL_ALBUMN+"/"+id+"/photos"
}