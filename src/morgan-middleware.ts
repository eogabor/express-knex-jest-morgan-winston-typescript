import chalk from "chalk";
import morgan from "morgan";
import jwt from "jsonwebtoken";

const requestColorCodeDic = {
  GET: "#34ace0",
  POST: "#2ed573",
  PUT: "#fca130",
  DELETE: "#ff5252",
};

morgan.token("req-body", function getId(req: any) {
  return JSON.stringify(req.body) === "{}" ? "" : JSON.stringify(req.body);
});
morgan.token("aqua-username", function getId(req: any) {
  let jwtToken = jwt.decode(req.headers["x-access-token"] as string) as any;
  let username = jwtToken ? jwtToken.username : "no-token";
  return username;
});

export function getMorganMiddleWare(stream: any) {
  return morgan(
    function (tokens, req, res) {
      return [
        chalk.hex("#FFFF33")(tokens["remote-addr"](req, res)),
        "-",
        chalk.hex("#FFFF33")(tokens["aqua-username"](req, res)),
        chalk
          .hex((requestColorCodeDic as any)[req.method || "GET"])
          .bold(tokens.method(req, res)),
        chalk
          .hex((requestColorCodeDic as any)[req.method || "GET"])
          .bold(tokens.url(req, res)),
        chalk
          .hex(res.statusCode == 200 ? "#39FF14" : "#FF3131")
          .bold(tokens.status(req, res)),
        chalk.hex("#FFFF33")(tokens["response-time"](req, res)),
        chalk.gray(tokens["req-body"](req, res)),
      ].join(" ");
    },
    {
      stream,
    }
  );
}
