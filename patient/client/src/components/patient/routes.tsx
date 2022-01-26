import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";





const Page =React.lazy(()=>import('./Page'));

const PatientRoutes=(props:any)=>{ 

    return(
        <BrowserRouter basename="">
            <Routes>
            <Route path="patient" element={<Page {...props }/>} >
                {/* <Page {...props }/> */}
            </Route>
           </Routes> 
        </BrowserRouter>

        
    )
};
export default PatientRoutes;