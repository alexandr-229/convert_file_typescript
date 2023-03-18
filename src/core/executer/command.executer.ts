import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "../handlers/stram.logger.interface.js";
import { ICommandExec } from "./command.types.js";

export abstract class CommandExecuter<Input> {
	constructor(private logger: IStreamLogger) {}

	public async execute() {
		const input = await this.prompt();
		const command = this.build(input);
		const stream = this.spawn(command);
		this.proccessStream(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>;
	protected abstract build(input: Input): ICommandExec;
	protected abstract spawn(
		command: ICommandExec
	): ChildProcessWithoutNullStreams;
	protected abstract proccessStream(
		stream: ChildProcessWithoutNullStreams,
		logger: IStreamLogger
	): void;
}
