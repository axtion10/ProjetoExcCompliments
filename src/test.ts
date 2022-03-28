import { CustomError } from 'ts-custom-error';

class ProjectError extends CustomError {
	public constructor(
		public code: number,
		message?: string,
	) {
		super(message)
	}
}