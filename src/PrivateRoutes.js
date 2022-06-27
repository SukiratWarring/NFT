import { useMoralis } from "react-moralis";
import { Outlet,Navigate } from "react-router";

const PrivateRoutes=()=>{
    const{isAuthenticated}=useMoralis();
    console.log("PRIVATE ROUTES________________________________________________")
    console.log(isAuthenticated);
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/"/>
        
    )
}
export default PrivateRoutes;