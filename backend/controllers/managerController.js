import Lead from "../models/Lead.js";

export const getPerformance = async (req, res) => {
  try {
    const performance = await Lead.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          total: { $sum: 1 },
          converted: {
            $sum: {
              $cond: [{ $eq: ["$status", "converted"] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
