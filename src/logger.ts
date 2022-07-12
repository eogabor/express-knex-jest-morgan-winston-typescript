import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export function initLogger() {
  //create normal logger
  const fileTransport: DailyRotateFile = new DailyRotateFile({
    level: "http",
    filename: `${process.env.LOG_FILE_PREFIX}_%DATE%.log`,
    dirname: "./logs",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: winston.format.combine(
      winston.format.timestamp({ format: timezoned }),
      winston.format.align(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    handleExceptions: true,
  });

  const consoleTransport = new winston.transports.Console({
    level: "http",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: timezoned }),
      winston.format.align(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    handleExceptions: true,
  });

  const logger = winston.createLogger({
    level: "http",
    transports: [consoleTransport, fileTransport],
  });

  const stream = {
    write: (message: any) => logger.http(message),
  };

  return { logger, stream };
}

const timezoned = () => {
  return new Date().toLocaleString("HU", {
    timeZone: "Europe/Budapest",
  });
};
