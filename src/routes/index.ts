import { currentuser } from "./current-user";
import { signinRoute } from "./signin";
import { signoutRoutes } from "./signout";
import { signupRoutes } from "./signup";

export const routes = (app: any) => {
  app.use("/api/users", currentuser);
  app.use("/api/users", signinRoute);
  app.use("/api/users", signupRoutes);
  app.use("/api/users", signoutRoutes);
}