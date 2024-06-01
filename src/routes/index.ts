import { Application, Router } from "express";
import { DosenRouter } from "./dosen.route";
import { UserRouter } from "./user.route";
import { TARouter } from "./ta.route";

const _routes: Array<[string, Router]> = [
  ["/api/dosen", DosenRouter],
  ["/api/ta", TARouter],
  ["/api/auth", UserRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
