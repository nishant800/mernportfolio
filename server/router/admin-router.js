const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router
  .route("/user/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/user/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

module.exports = router;