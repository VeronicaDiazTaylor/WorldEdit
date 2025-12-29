import { Dimension, Player, BlockPermutation, Vector3 } from '@minecraft/server';
import { RepeatingTimer } from 'keystonemc';

export interface BlockChangeRecord {
  pos: Vector3;
  before: BlockPermutation;
  after: BlockPermutation;
}

export abstract class BaseProcess {
  protected dimension: Dimension;
  protected player?: Player;

  protected changes: BlockChangeRecord[] = [];

  constructor(dimension: Dimension, player?: Player) {
    this.dimension = dimension;
    this.player = player;
  }

  abstract execute(): void;

  undo() {
    let i = this.changes.length - 1;

    const undo = new RepeatingTimer(() => {
      if (i < 0) return undo.cancel();

      const c = this.changes[i--];
      if (!c) return undo.cancel();

      this.dimension.getBlock(c.pos)?.setPermutation(c.before);
    }, { period: 1 });

    undo.start();
  }

  redo() {
    let i = 0;

    const redo = new RepeatingTimer(() => {
      if (i < 0) return redo.cancel();

      const c = this.changes[i++];
      if (!c) return redo.cancel();

      this.dimension.getBlock(c.pos)?.setPermutation(c.after);
    }, { period: 1 });

    redo.start();
  }

  protected recordChange(record: BlockChangeRecord) {
    this.changes.push(record);
  }
}
