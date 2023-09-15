import axios from "axios";
import { BASE_URL } from "../cmp/urlConfig/Url";

export function userSignup(data) {
    return axios.post(BASE_URL+'/api/user/addUser', data)
}
export function userLog(data) {
    return axios.post(BASE_URL+'/api/user/userLogin', data)
}