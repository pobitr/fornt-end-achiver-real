import Loader from "../cmp/Loader";

export function showLoader() {
    return <Loader/>
    
    
}

export function getName(){
    const admin = JSON.parse(localStorage.getItem("admin-info"))
    return admin;
}