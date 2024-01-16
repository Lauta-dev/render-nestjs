import { GenerationValidationMiddleware } from './generation-validation.middleware';

describe('GenerationValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new GenerationValidationMiddleware()).toBeDefined();
  });
});
