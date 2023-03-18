export class FfmpegBuilder {
	private inputPath: string;
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set("-c:v", "libx264");
	}

	input(inputPath: string): this {
		this.inputPath = inputPath;
		return this;
	}

	setVideoSize(width: number, height: number): this {
		this.options.set("-s", `${width}x${height}`);
		return this;
	}

	output(outputPaht: string): string[] {
		if (!this.inputPath) {
			throw new Error("You must set input path");
		}
		const args: string[] = ["-i", this.inputPath];
		this.options.forEach((value: string, key: string) => {
			args.push(key, value);
		});
		args.push(outputPaht);
		return args;
	}
}
