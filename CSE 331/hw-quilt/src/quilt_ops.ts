import { NW, NE, SW, SE, Square, Row, rnil, rcons, rconcat, Quilt, qnil, qcons, qconcat } from './quilt';


/** Returns the same square but flipped vertically. */
export const sflip_vert = (s: Square): Square => {
  // NW -> SW
  if (s.corner === NW) {
    return {shape: s.shape, color: s.color, corner: SW};
  // NE -> SE
  } else if (s.corner === NE) {
    return {shape: s.shape, color: s.color, corner: SE};
  // SW -> NW
  } else if (s.corner === SW) {
    return {shape: s.shape, color: s.color, corner: NW};
  // SE -> NE
  } else {
    return {shape: s.shape, color: s.color, corner: NE};
  }
}

/** Returns the same row but flipped vertically. */
export const rflip_vert = (r: Row): Row => {
  if (r.kind === "rnil") {
    return r;
  // vertical flip each square in the row
  } else {
    return rcons(sflip_vert(r.hd), rflip_vert(r.tl));
  }
}

/** Returns the same quilt but flipped vertically. */
export const qflip_vert = (q: Quilt): Quilt => {
  if (q.kind === "qnil") {
    return q;
  // reverse order of rows and vertically flip each square in the row
  } else {
    return qconcat(qflip_vert(q.tl), qcons(rflip_vert(q.hd), qnil));
  }
}


/** Returns the same square but flipped horizontally. */
export const sflip_horz = (s: Square): Square => {
  // NW -> NE
  if (s.corner === NW) {
    return {shape: s.shape, color: s.color, corner: NE};
  // NE -> NW
  } else if (s.corner === NE) {
    return {shape: s.shape, color: s.color, corner: NW};
  // SW -> SE
  } else if (s.corner === SW) {
    return {shape: s.shape, color: s.color, corner: SE};
  // SE -> SW
  } else {
    return {shape: s.shape, color: s.color, corner: SW};
  }
}

/** Returns the same row but flipped horizontally. */
export const rflip_horz = (r: Row): Row => {
  if (r.kind === "rnil") {
    return r;
  // reverse order of squares and horizontally flip each square in the row
  } else {
    return rconcat(rflip_horz(r.tl), rcons(sflip_horz(r.hd), rnil));
  }
}

/** Returns the same quilt but flipped horizontally. */
export const qflip_horz = (q: Quilt): Quilt => {
  if (q.kind === "qnil") {
    return q;
  // horizontally flip each row in the quilt
  } else {
    return qcons(rflip_horz(q.hd), qflip_horz(q.tl));
  }
}


/**
 * Returns the result of sewing together q1 and q2 horizontally, i.e.,
 * concatenating each of their rows. Throws an exception if they are not the
 * same length.
 */
export const sew = (q1: Quilt, q2: Quilt): Quilt => {
  if (q1.kind === "qnil") {
    if (q2.kind === "qnil") {
      return qnil;
    } else {
      throw new Error("bad q2 argument: q1 has none rows but q2 has some");
    }
  } else {
    if (q2.kind === "qnil") {
      throw new Error("bad q1 argument: q2 has none rows but q1 has some");
    } else {
      return qcons(rconcat(q1.hd, q2.hd), sew(q1.tl, q2.tl));
    }
  }
};


/**
 * Returns the result of symmetrizing this quilt first vertically, by sewing it
 * together with its horizontally flipped version, and then horizontally, by
 * concatenating its rows with those of its vertically flipped version.
 */
export const symmetrize = (q: Quilt): Quilt => {
  const r = sew(q, qflip_horz(q));
  return qconcat(r, qflip_vert(r));
};