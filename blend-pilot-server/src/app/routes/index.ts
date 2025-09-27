import { IRouter, Router } from "express";
import { userRoutes } from "./../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { blogRoutes } from "../modules/blog/blog.route"; // New import
import { contactRoutes } from "./../modules/contact/contact.route"; // New import

const router = Router();

const modiulRoutes: { path: string; route: IRouter }[] = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
  {
    path: "/contact",
    route: contactRoutes,
  },
];

modiulRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
