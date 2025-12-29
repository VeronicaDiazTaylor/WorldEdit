import { BlockPermutation, BlockType, Dimension, Player, Vector3 } from '@minecraft/server';
import { BaseProcess } from './baseProcess';
import { RepeatingTimer } from 'keystonemc';

export class SetProcess extends BaseProcess {
  private positions: Vector3[];
  private target: BlockPermutation;
  private index = 0;

  constructor(
    dimension: Dimension,
    positions: Vector3[],
    blockType: BlockType,
    player?: Player
  ) {
    super(dimension, player);

    this.positions = positions;
    this.target = BlockPermutation.resolve(blockType.id);
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
      if (before === this.target) return;

      block.setPermutation(this.target);

      this.recordChange({ pos, before, after: this.target });

      if (!this.player) return;
      const p = this.changes.length / this.positions.length;
      if (this.player.onScreenDisplay.isValid) {
        this.player.onScreenDisplay.setActionBar(`§aProcessing: §f${Math.floor(p * 100)}%`);
      }
    }, { period: 1 });

    process.start();
  }
}
