import axios from "axios";
import { BASE_URL } from "../cmp/urlConfig/Url";

export function adminLog(data) {
    return axios.post(BASE_URL+'/api/admin/login', data)
}

export function adminCourseAdd(data) {
    return axios.post(BASE_URL+'/api/course/addCourse', data)
}

export function adminCourseUpdate(data) {
    return axios.post(BASE_URL+'/api/course/courseUpdate', data)
}

export function admincourseDetails(data) {
    return axios.post(BASE_URL+'/api/course/courseUpdate', data)
}

export function adminCourseAll(data) {
    return axios.post(BASE_URL+'/api/course/allcourse', data)
}

export function adminCourseDelate(data) {
    return axios.post(BASE_URL+'/api/course/courseDelete', data)
}
// Notice url services
export function adminNoticeAdd(data) {
    return axios.post(BASE_URL+'/api/notice/addNotice', data)
}

export function adminNoticeUpdate(data) {
    return axios.post(BASE_URL+'/api/notice/noticeUpdate', data)
}

export function adminNoticeDelete(data) {
    return axios.post(BASE_URL+'/api/notice/noticeDetails', data)
}

export function adminNoticeAll(data) {
    return axios.post(BASE_URL+'/api/notice/allNotice', data)
}

export function adminNoticeDelate(data) {
    return axios.post(BASE_URL+'/api/notice/noticeDelete', data)
}
// Admin Rateing
export function adminAllRate(data) {
    return axios.post(BASE_URL+'/api/review/allAdminReview', data)
}
// User Lists

export function adminAllUser(data) {
    return axios.post(BASE_URL+'/api/user/allUser', data)
}



