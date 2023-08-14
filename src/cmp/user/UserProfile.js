import React from 'react';
import user from "../images/userprofile.svg";


export default function UserProfile() {
    return (
        <>
        
            <div className='bg-secondary-subtle d-flex justify-content-center align-items-center text-danger ' style={{ height: "10vh" }}>
                {/* Give username */}
                <h1>Welcome Username</h1>
            </div>

            <div className='d-flex mt-3  justify-content-center align-items-center m-auto' style={{ width: "70vw" }}>
                <div className="" style={{ width: "20%" }}>
                    <img className="border rounded-circle" src={user} style={{ width: "100%" }} />
                </div>
                <div className=' text-center mx-5 my-5'>
                    <h2 className='text-primary'>Username</h2>
                    <p style={{ fontSize: "1.3rem" }}>Usermail</p>
                    <p style={{ fontSize: "1.3rem" }}>UserNumber</p>
                </div>
            </div>

            <div className=' text-center mt-5 m-auto' style={{width:"70vw"}}>
                <h1 className='text-danger'> Enrolled Courses </h1>
                <table className="table table-striped table-hover table-borderless mt-3">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">SL.NO</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Course Duration</th>
                            <th scope="col">Enrolled On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>HTML</td>
                            <td>1 Month</td>
                            <td>2 July</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>PHP</td>
                            <td>3 Month</td>
                            <td>20 July</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>HTML</td>
                            <td>1 Month</td>
                            <td>2 July</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
