import axios from "axios";
import { BASE_URL } from "../cmp/urlConfig/Url";

export function getAllNotice(data) {
    return axios.post(BASE_URL+'/api/notice/allNotice', data)
}

export function getAllCourse(data) {
    return axios.post(BASE_URL+'/api/course/allcourse', data)
}