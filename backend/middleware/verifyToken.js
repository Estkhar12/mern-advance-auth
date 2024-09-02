import jwt, { decode } from "jsonwebtoken";

export const verify_token = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized,  token not provided!" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized,Invalid token " });

    res.userId = decode.userId;
    next();
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ success: false, message: error.message });
  }
};
