import axios from "axios";
import express from "express";

const authUrl = process.env.AUTH_URL;

export async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  return axios
    .post(`${authUrl}/token/verify-token`, {
      accessToken: token,
    })
    .then((response) => {
      if (response.status === 200) {
        next();
      } else {
        return res.status(401).send({ message: "Token verification failed!" });
      }
    })
    .catch((error) => {
      return res.status(401).send({ message: "Token verification failed!" });
    });
}
