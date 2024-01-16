import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class GenerationValidationMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: () => void) {
		const generationParam = req.params.generation;
		const generation = Number(generationParam);

		if (Number.isNaN(generation)) {
			res.status(HttpStatus.BAD_REQUEST).json({
				message: "El valor dado no es un valor númerico",
				value: generationParam,
			});
			return;
		}

		next();
	}
}
