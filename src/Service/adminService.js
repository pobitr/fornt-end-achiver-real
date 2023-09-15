import axios from "axios";
import { BASE_URL } from "../cmp/urlConfig/Url";

export function adminLog(data) {
    return axios.post(BASE_URL+'/api/admin/login', data)
}