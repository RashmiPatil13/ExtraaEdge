import User from "../models/User.js";
import Lead from "../models/Lead.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalManagers = await User.countDocuments({ role: "manager" });
    const totalTelecallers = await User.countDocuments({ role: "telecaller" });
    const totalConversions = await Lead.countDocuments({
      status: "Converted",
    });

    const leadsByDate = await Lead.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalLeads,
      totalManagers,
      totalTelecallers,
      totalConversions,
      leadsByDate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
