import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { CompanyController } from "./controllers/CompanyController";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";

const routes = Router();

routes.post("/user", new UserController().create);
routes.get("/user", new UserController().listUsers);
routes.post("/user/:userId/company", new CompanyController().create);

routes.get("/company", new CompanyController().listCompanies);
routes.post("/companies/:companyId/product", new ProductController().create);
routes.get(
  "/companies/:companyId/products",
  new ProductController().listProductsPerCompany
);

routes.get("/products", new ProductController().listAllProducts);

routes.post("/order/:userId/:productId", new OrderController().create);
routes.put("/order/:orderId/:quantity", new OrderController().update);
routes.get("/order", new OrderController().listOrders);

export default routes;
