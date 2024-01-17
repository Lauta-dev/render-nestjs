import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class IdAndGenerationValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { id, generation } = req.params;
    const returnIfIsNaN = (json: string | object) =>
      res.status(HttpStatus.BAD_REQUEST).json(json);

    // Verficar id
    if (id) {
      const idToNumber = Number(id);

      if (Number.isNaN(idToNumber)) {
        return returnIfIsNaN({
          message: "Id is NaN",
          originalValue: id,
          value: idToNumber,
        });
      }
      return next();
    }

    // Validar generation
    if (generation) {
      const generationToNumber = Number(generation);

      if (Number.isNaN(generationToNumber)) {
        return returnIfIsNaN({
          message: "Generation is NaN",
          originalValue: generation,
          value: generationToNumber,
        });
      }
      return next();
    }

    res.json("No se");
  }
}
