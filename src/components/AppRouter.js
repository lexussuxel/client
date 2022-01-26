import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";



const AppRouter = () => {
    const {user} = useContext(Context)
    return (
            <Routes>
                {user.user.role === "ADMIN" &&
                    adminRoutes.map(({path, Component}) =>
                        <Route path={path} element={<Component />} />
                    )
                }
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route path={path} element={<Component />} />
                )}

                {publicRoutes.map(({path, Component}) =>
                    <Route path={path} element={<Component />} />
                )}
                <Route path="/*" element={<Navigate to="/" />}/>
                {/*{(authRoutes.concat(publicRoutes).includes(window.location.pathname))?*/}
                {/*    <Route path="/*" element={<Navigate to="/" />}/>:null}*/}

            </Routes>


    );
}

export default AppRouter;
