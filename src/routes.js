import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    AUTH_ROUTE, COLLECTION_CREATE_ROUTE,
    COLLECTIONS_ROUTE, CREATE_ITEM_ROUTE,
    HOMEPAGE_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE
} from "./util/constants";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import Auth from "./pages/Auth";
import Collection from "./pages/Collection";
import CreateCollection from "./pages/CreateCollection";
import CreateItem from "./pages/CreateItem";


export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }

]

export const authRoutes = [


]

export const publicRoutes = [
    {
        path: COLLECTION_CREATE_ROUTE,
        Component: CreateCollection
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },

    {
        path: HOMEPAGE_ROUTE,
        Component: HomePage

    },
    {
        path: AUTH_ROUTE,
        Component: Auth

    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: COLLECTIONS_ROUTE + "/:id",
        Component: Collection
    },
    {
        path: CREATE_ITEM_ROUTE,
        Component: CreateItem
    }
]