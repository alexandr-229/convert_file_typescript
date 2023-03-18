import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecuter } from "../../core/executer/command.executer.js";
import { FileService } from "../../core/files/file.service.js";
import { IStreamLogger } from "../../core/handlers/stram.logger.interface.js";
import { StreamHendler } from "../../core/handlers/stream.hendler.js";
import { PromptService } from "../../core/prompt/prompt.service.js";
import { FfmpegBuilder } from "./ffmpeg.builder.js";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types.js";

export class FfmpegExecuter extends CommandExecuter<IFfmpegInput> {
	private fileService: FileService = new FileService();
	private prompService: PromptService = new PromptService();

	constructor(logger: IStreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegInput> {
		const width = await this.prompService.input<number>("Width", "number");
		const height = await this.prompService.input<number>("Height", "number");
		const path = await this.prompService.input<string>("Path", "input");
		const name = await this.prompService.input<string>("Name", "input");
		return { width, height, path, name };
	}

	protected build({
		width,
		height,
		path,
		name
	}: IFfmpegInput): ICommandExecFfmpeg {
		const output = this.fileService.getFilePath(path, name, "mp4");
		const args = new FfmpegBuilder()
			.input(path)
			.setVideoSize(width, height)
			.output(output);
		return { command: "ffmpeg", args, output };
	}

	protected spawn({
		output,
		command,
		args
	}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFile(output);
		return spawn(command, args);
	}

	protected proccessStream(
		stream: ChildProcessWithoutNullStreams,
		logger: IStreamLogger
	): void {
		const handler = new StreamHendler(logger);
		handler.processOutput(stream);
	}
}
