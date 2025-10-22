import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decession = await aj.protect(req, {
      requested: 1, // each request consumes 1 token
    });

    console.log(decession);

    if (decession.isDenied()) {
      if (decession.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Rate limit exceeded: Please try again later",
        });
      } else if (decession.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated requests not allowed",
        });
      } else {
        return res.status(403).json({
          error: "Forbidden",
          message: "Access deneied by security policy",
        });
      }
    }

    if (
      decession.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({
        error: "spoofed both detected",
        message: "malicious bot activity detected",
      });
    }

    next();
  } catch (error) {
    console.log("error:", error);
    next();
  }
};
