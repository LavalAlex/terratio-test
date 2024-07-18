import { CreateSideDto } from '../dto/side.dto';

export const consecutive = (sides: CreateSideDto[]) => {
  for (let i = 0; i < sides.length - 1; i++) {
    const startPoint = { x: sides[i].x1, y: sides[i].y1 };
    const endPoint = { x: sides[i + 1].x0, y: sides[i + 1].y0 };

    if (startPoint.x !== endPoint.x || startPoint.y !== endPoint.y) {
      return false;
    }
  }
  const lastPoint = {
    x: sides[sides.length - 1].x1,
    y: sides[sides.length - 1].y1,
  };
  const firstPoint = { x: sides[0].x0, y: sides[0].y0 };

  if (lastPoint.x !== firstPoint.x || lastPoint.y !== firstPoint.y) {
    return false;
  }

  return true;
};
