const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema, updateSchema } = require("../../shcemas/contacts");

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(updateSchema), ctrl.updateById);

module.exports = router;
