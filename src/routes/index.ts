import { TARouter } from "./ta.route";
import { UserRouter } from "./user.route";
import { DosenRouter } from "./dosen.route";
import { Application, Router } from "express";

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
