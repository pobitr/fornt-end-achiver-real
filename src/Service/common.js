import Loader from "../cmp/Loader";

export function showLoader() {
    return <Loader/>
    
    
}

export function getName(){
    const admin = JSON.parse(localStorage.getItem("admin-info"))
    return admin;
}
export function getUserName(){
    const user = JSON.parse(localStorage.getItem("user-info"))
    return user;
}