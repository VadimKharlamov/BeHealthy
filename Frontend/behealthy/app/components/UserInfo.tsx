'use client'
import { Button } from "antd";


export default function UserInfo() {
    
    return <div className="userInfo"> 
    <div>
        Name: <span className="userName"> bib</span>
    </div>
    <div style={{padding: "30px 0 30px"}}>
        Email: <span className="userEmail"> eeemail</span>
    </div>
    <div>
        <Button> Click me </Button>
    </div>
    </div>
}