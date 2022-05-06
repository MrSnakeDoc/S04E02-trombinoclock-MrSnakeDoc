import express from "express";
import { mainController } from "./controllers/mainController";
import { promoController } from "./controllers/promoController";
export const router = express.Router();

router.use(express.static("./src/public"));

// router.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()} ${req.ip}] ${req.originalUrl}`);
//   next();
// });
router.get("/", mainController.homePage);

router.get("/promos", promoController.promosList);
router.get("/promo/:id", promoController.promoPage);
router.get("/promo/:id/students", promoController.studentsPage);
router.get("/promo/:id/students/:student", promoController.studentPage);

router.use((req, res) => {
  res.status(404).render("404");
});
