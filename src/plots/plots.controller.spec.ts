import { Test, TestingModule } from '@nestjs/testing';

import { PlotsController } from './plots.controller';
import { LotsService } from './plots.service';

describe('LotsController', () => {
  let controller: PlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlotsController],
      providers: [LotsService],
    }).compile();

    controller = module.get<PlotsController>(PlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
