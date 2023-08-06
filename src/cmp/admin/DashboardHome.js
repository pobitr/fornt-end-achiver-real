import React from 'react'
import { getName } from '../../Service/common'

export default function DashboadHome() {
  return (
    <>
    <div className='animate' style={{textAlign:'center',marginTop:'30px'}}>
    <h1>WELLCOME TO DASHBOARD</h1>
  </div>
  <hr/>
  <div className='animate2' style={{textAlign:'center'}}>
    <h1 style={{textTransform:'uppercase'}}>{getName().response.user}</h1>
  </div>
  </>
    
  )
}