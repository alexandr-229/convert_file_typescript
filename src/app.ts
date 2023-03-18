import { FfmpegExecuter } from "./commands/ffmpeg/ffmpeg.executer.js";
import { ConsoleLogger } from "./out/console-logger/console.logger.js";

export class App {
	async run() {
		new FfmpegExecuter(ConsoleLogger.getInstanse()).execute();
	}
}

const app = new App();
app.run();
