export function menuLayout(viewport: number, count: number) {
  const mobile = viewport <= 650;
  const scale = mobile ? 0.6 : 0.75;
  const gutter = mobile ? 8 : 16;
  const cardWidth = mobile ? viewport * scale : Math.min(560, viewport * 0.42);
  const step = cardWidth + (mobile ? viewport * 0.08 : 24);
  const minOffset = Math.min(0, viewport - (gutter * 2 + cardWidth + (count - 1) * step));
  return { viewport, scale, gutter, cardWidth, step, minOffset };
}

type MenuLayout = ReturnType<typeof menuLayout>;

export function clampMenuOffset(offset: number, layout: MenuLayout) {
  return Math.max(layout.minOffset, Math.min(0, offset));
}

export function revealMenuTile(index: number, offset: number, layout: MenuLayout) {
  const left = layout.gutter + index * layout.step + offset;
  const right = left + layout.cardWidth;
  if (left < layout.gutter) offset += layout.gutter - left;
  else if (right > layout.viewport - layout.gutter) offset -= right - layout.viewport + layout.gutter;
  return clampMenuOffset(offset, layout);
}

export function snapMenuOffset(offset: number, layout: MenuLayout) {
  const candidates = [0, layout.minOffset, clampMenuOffset(Math.round(offset / layout.step) * layout.step, layout)];
  return candidates.reduce((closest, candidate) => Math.abs(candidate - offset) < Math.abs(closest - offset) ? candidate : closest);
}

export function menuTilePosition(index: number, offset: number, layout: MenuLayout) {
  // GSAP scales around the viewport centre; compensate to align the visible card with the gutter.
  const widthPercent = layout.cardWidth / (layout.viewport * layout.scale) * 100;
  return {
    x: layout.gutter + index * layout.step + offset - layout.viewport * (1 - layout.scale) / 2,
    scale: layout.scale,
    clipPath: `inset(0 ${100 - widthPercent}% 0 0)`,
    '--menu-card-width': `${widthPercent}%`,
  };
}
