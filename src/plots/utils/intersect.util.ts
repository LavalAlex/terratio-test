import { CreateSideDto } from '../dto/side.dto';

// ** Function that the segments created by the points do not intersect each other, that they are not collinear, that they do not repeat points.

export const sidesIntersect = (sides: CreateSideDto[]) => {
  const n = sides.length;
  for (let i = 0; i < n; i++) {
    const a = { x: sides[i].x0, y: sides[i].y0 };
    const b = { x: sides[i].x1, y: sides[i].y1 };

    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;

      const c = { x: sides[j].x0, y: sides[j].y0 };
      const d = { x: sides[j].x1, y: sides[j].y1 };

      if (intersect(a, b, c, d)) return true;
    }
  }

  return false;
};

const onSegment = (
  p: { x: number; y: number },
  q: { x: number; y: number },
  r: { x: number; y: number },
) => {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  ) {
    return true;
  }
  return false;
};

const orientation = (
  p: { x: number; y: number },
  q: { x: number; y: number },
  r: { x: number; y: number },
) => {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0;
  return val > 0 ? 1 : 2;
};

const intersect = (
  p1: { x: number; y: number },
  q1: { x: number; y: number },
  p2: { x: number; y: number },
  q2: { x: number; y: number },
) => {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;

  return false;
};
