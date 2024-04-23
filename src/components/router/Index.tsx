import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../login/Login"
import AdminPortalIndex from "../index"

const IndexRouter = ()=> {


    return <>
    <BrowserRouter>
    <Routes>
    <Route path={'/'} element={<Login />}/> 
    <Route path={'/adminPage'} element={<AdminPortalIndex />}/> 
    </Routes>
    </BrowserRouter>
    </>
}

export default IndexRouter