import userModel from "../Model/user.model.js";

export const adminOnly = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.RegisterAs !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.adminUser = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error checking admin authorization" });
  }
};
