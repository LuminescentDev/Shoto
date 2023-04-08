import { Client } from "discord.js";
import { createLogger, format, transports } from "winston";
const rn = new Date();
const logDate = `${minTwoDigits(rn.getMonth() + 1)}-${minTwoDigits(rn.getDate())}-${rn.getFullYear()}`;
function minTwoDigits(n: number) { return (n < 10 ? '0' : '') + n;}
export default (client: Client) => {

    global.logger = createLogger({
        format: format.combine(
            format.errors({ stack: true }),
            format.colorize(),
            format.timestamp(),
			format.printf(log => `[${log.timestamp.split("T")[1].split(".")[0]} ${log.level}]: ${log.message}`),
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: `./logs/${logDate}.log` })
        ],
        rejectionHandlers: [
            new transports.Console({ level: "error" }),
            new transports.File({ filename: `./logs/${logDate}.log`, level: "error" })
        ]
    });
    logger.info('logger initialized')

    client.on('shardDisconnect', () => {logger.info('bot disconnected')})
    client.on('shardReconnecting', () => {logger.info('bot reconnecting')})
    client.on('warn', (info) => {logger.warn(info)})
    client.on('error', (error) => {logger.error(error)})
}