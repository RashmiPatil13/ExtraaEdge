// router.get("/leads", authMiddleware, async (req, res) => {
//   const leads = await Lead.find({ assignedTo: req.user.id });
//   res.json(leads);
// });

// router.put("/update-status/:id", authMiddleware, async (req, res) => {
//   const { status, remarks } = req.body;

//   await Lead.findByIdAndUpdate(req.params.id, {
//     status,
//     remarks,
//   });

//   res.json({ message: "Status updated" });
// });

import express from "express";
import Lead from "../models/Lead.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* GET ASSIGNED LEADS */
router.get(
  "/leads",
  authMiddleware,
  roleMiddleware("telecaller"),
  async (req, res) => {
    const leads = await Lead.find({ assignedTo: req.user.id });
    res.json(leads);
  }
);

/* UPDATE LEAD STATUS */
router.put(
  "/lead/:id",
  authMiddleware,
  roleMiddleware("telecaller"),
  async (req, res) => {
    const { status, remarks } = req.body;

    await Lead.findByIdAndUpdate(req.params.id, {
      status,
      remarks,
    });

    res.json({ message: "Lead updated" });
  }
);

export default router;
