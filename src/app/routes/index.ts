import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRouter } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route : userRoutes
    },
    {
        path: '/auth',
        route : AuthRouter
    }
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})