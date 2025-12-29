import { Player, Dimension } from '@minecraft/server';
import { BaseProcess } from '../process/baseProcess';
import { ProcessHistory } from '../process/history';

export class Session {
  readonly player: Player;
  readonly dimension: Dimension;
  readonly history = new ProcessHistory();

  constructor(player: Player) {
    this.player = player;
    this.dimension = player.dimension;
  }

  /**
   * 処理開始
   * @param process
   * @param pushToHistory 
   */
  run(process: BaseProcess, pushToHistory: boolean = true) {
    process.execute();
    if (pushToHistory) this.history.push(process);
  }
}
