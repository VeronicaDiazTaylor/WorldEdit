import { BlockPermutation, BlockType, Dimension, Player, Vector3 } from '@minecraft/server';
import { BaseProcess } from './baseProcess';
import { RepeatingTimer } from 'keystonemc';

export class ReplaceProcess extends BaseProcess {
  private positions: Vector3[];
  private before: BlockPermutation;
  private after: BlockPermutation;
  private index = 0;

  constructor(
    dimension: Dimension,
    positions: Vector3[],
    beforeBlockType: BlockType,
    afterBlockType: BlockType,
    player?: Player
  ) {
    super(dimension, player);

    this.positions = positions;
    this.before = BlockPermutation.resolve(beforeBlockType.id);
    this.after = BlockPermutation.resolve(afterBlockType.id);
  }

  override execute() {
    this.index = 0;
    this.changes.length = 0;

    const process = new RepeatingTimer(() => {
      if (this.index >= this.positions.length) {
        return process.cancel();
      }

      const pos = this.positions[this.index++];
      const block = this.dimension.getBlock(pos);
      if (!block) return;

      const before = block.permutation;
      if (before !== this.before) return;
      if (before === this.after) return;

      block.setPermutation(this.after);

      this.recordChange({ pos, before, after: this.after });

      if (!this.player) return;
      const p = this.changes.length / this.positions.length;
      if (this.player.onScreenDisplay.isValid) {
        this.player.onScreenDisplay.setActionBar(`§aProcessing: §f${Math.floor(p * 100)}%`);
      }
    }, { period: 1 });

    process.start();
  }
}
