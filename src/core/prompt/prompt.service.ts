import inquirer from "inquirer";
import { PromptType } from "./prompt.types.js";

export class PromptService {
	public async input<T>(message: string, type: PromptType): Promise<T> {
		const { result } = await inquirer.prompt<{ result: T }>([
			{
				type,
				name: "result",
				message
			}
		]);
		return result;
	}
}
