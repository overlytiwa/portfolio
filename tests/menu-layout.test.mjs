import test from 'node:test';
import assert from 'node:assert/strict';
import { menuLayout, menuTilePosition, clampMenuOffset, revealMenuTile, snapMenuOffset } from '../src/menuLayout.ts';

for (const viewport of [390, 650, 651, 1280, 1920, 2560]) {
  for (const count of [4, 5]) {
    test(`${viewport}px / ${count} menu tiles can reach both ends and every focused card`, () => {
      const layout = menuLayout(viewport, count);
      const contentWidth = layout.gutter * 2 + layout.cardWidth + (count - 1) * layout.step;
      assert.equal(layout.minOffset < 0, contentWidth > viewport, 'scroll whenever the cards exceed the viewport');
      const first = menuTilePosition(0, 0, layout);
      assert.ok(Math.abs(first.x + viewport * (1 - first.scale) / 2 - layout.gutter) < 0.001, 'scaled first tile starts at gutter');
      const last = menuTilePosition(count - 1, layout.minOffset, layout);
      const lastRight = last.x + viewport * (1 - last.scale) / 2 + layout.cardWidth;
      assert.ok(lastRight <= viewport - layout.gutter + 0.001, 'last card is fully reachable');
      if (layout.minOffset < 0) assert.ok(Math.abs(lastRight - (viewport - layout.gutter)) < 0.001, 'overflow ends at the gutter');
      assert.equal(clampMenuOffset(-1e6, layout), layout.minOffset);
      assert.equal(clampMenuOffset(1e6, layout), 0);
      assert.equal(snapMenuOffset(layout.minOffset, layout), layout.minOffset, 'release at the end must not snap back');
      let offset = 0;
      for (const index of [...Array(count).keys(), ...[...Array(count).keys()].reverse()]) {
        offset = revealMenuTile(index, offset, layout);
        const left = layout.gutter + index * layout.step + offset;
        assert.ok(left >= layout.gutter - 0.001);
        assert.ok(left + layout.cardWidth <= viewport - layout.gutter + 0.001);
      }
      for (let value = layout.minOffset; value <= 0; value += 17) {
        const snapped = snapMenuOffset(value, layout);
        assert.ok(snapped >= layout.minOffset && snapped <= 0, 'snap stays bounded');
      }
    });
  }
}
