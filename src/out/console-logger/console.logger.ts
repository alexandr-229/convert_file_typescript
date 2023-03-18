import { IStreamLogger } from "../../core/handlers/stram.logger.interface.js";

export class ConsoleLogger implements IStreamLogger {
	private static logger: ConsoleLogger;

	public static getInstanse() {
		if (!ConsoleLogger.logger) {
			ConsoleLogger.logger = new ConsoleLogger();
		}
		return ConsoleLogger.logger;
	}

	log(...args: any[]): void {
		console.log(...args);
	}
	error(...args: any[]): void {
		console.error(...args);
	}
	end(): void {
		console.log("Ready");
	}
}
