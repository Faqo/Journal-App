import { Routes, Route, Navigate } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckout } from "../hooks";

export const AppRouter = () => {

  const status = useCheckout();

  if (status==='checking') {
    return <CheckingAuth />
  }

  return (
    <>
        <Routes>
          {
            (status === 'authenticated')
            ?<Route path='/*' element={<JournalRoutes />} />
            :<Route path='/auth/*' element={<AuthRoutes />} />
             
          }

          <Route path="/*" element={<Navigate to='/auth/login'/>} />

            {/* Login y registro */}
            {/*  <Route path='/auth/*' element={<AuthRoutes />} /> */}
            
            {/* JournalApp */}
            {/* <Route path='/*' element={<JournalRoutes />} /> */}

        </Routes>
    </>
  )
}