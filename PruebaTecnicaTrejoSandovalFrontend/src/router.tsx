import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import CreateAccount from "./views/auth/CreateAccount";
import UserLayout from "./layouts/UserLayout";
import UsersView from "./views/users/UsersView";
import NewUser from "./views/users/NewUser";



export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<CreateAccount/>}/>
                </Route>
                <Route element={<UserLayout/>}>
                    <Route path="/" element={<UsersView/>}/>
                    <Route path="/users/new" element={<NewUser/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}