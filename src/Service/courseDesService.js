import axios from "axios";
import { BASE_URL } from "../cmp/urlConfig/Url";

export function getDescData(data) {
    return axios.post(BASE_URL+'/api/course/courseDetails', data)
}
export function getDescRetData(data) {
    return axios.post(BASE_URL+'/api/review/allReview', data)
}
export function addDescRetData(data) {
    return axios.post(BASE_URL+'/api/review/addReview', data)
}