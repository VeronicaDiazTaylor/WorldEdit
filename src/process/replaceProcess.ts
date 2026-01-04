import { BlockPermutation, Dimension, Player, Vector3 } from '@minecraft/server';
import { BaseProcess } from './baseProcess';
import { RepeatingTimer } from 'keystonemc';
import { BlockDetail } from '../utils/blockDetail';

export class ReplaceProcess extends BaseProcess {
  private positions: Vector3[];
  private before: BlockDetail;
  private after: BlockDetail;
  private index = 0;

  constructor(
    dimension: Dimension,
    positions: Vector3[],
    beforeBlockDetail: BlockDetail,
    afterBlockDetail: BlockDetail,
    player?: Player
  ) {
    super(dimension, player);

    this.positions = positions;
    this.before = beforeBlockDetail;
    this.after = afterBlockDetail;
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
      if (block.typeId != this.before.blockType.id) return;
      if (this.before.blockStates && !block.permutation.matches(this.before.blockType.id, this.before.blockStates)) return;

      const afterBlock = BlockPermutation.resolve(
        this.after.blockType.id,
        this.after.blockStates ?? before.getAllStates()
      );
      block.setPermutation(afterBlock);

      this.recordChange({ pos, before, after: afterBlock });

      if (!this.player) return;
      const p = this.changes.length / this.positions.length;
      if (this.player.onScreenDisplay.isValid) {
        this.player.onScreenDisplay.setActionBar(`§aProcessing: §f${Math.floor(p * 100)}%`);
      }
    }, { period: 1 });

    process.start();
  }
}
