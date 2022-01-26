import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
} from "react-router-dom";


import PatientRoutes from "./patient/routes";
const Routes=(props:any)=>{ 

    return(
<Suspense fallback='carregando...'>
<PatientRoutes/>
</Suspense>
        
        
    )
};
export default Routes;