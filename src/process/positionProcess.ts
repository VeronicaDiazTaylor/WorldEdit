import { Dimension, Player, Vector3 } from '@minecraft/server';
import { BaseProcess } from './baseProcess';
import { WeditProperty } from '../utils/weditProperty';
import { getPositionsInBox } from '../utils/coordsUtils';

export class PositionProcess extends BaseProcess {
  private location: Vector3;
  private property: string;

  constructor(
    dimension: Dimension,
    location: Vector3,
    property: string,
    player?: Player
  ) {
    super(dimension, player);

    this.location = location;
    this.property = property;
  }

  override execute() {
    if (!this.player) return;

    const location = this.location;
    this.player.setDynamicProperty(this.property, location);

    let blocks = getPositionsInBox(location, location).length;

    const pos1 = this.player.getDynamicProperty(WeditProperty.POS_1) as Vector3 | undefined;
    const pos2 = this.player.getDynamicProperty(WeditProperty.POS_2) as Vector3 | undefined;
    if (pos1 && pos2) blocks = getPositionsInBox(pos1, pos2).length;

    const posTypeText = `position ${this.property === WeditProperty.POS_1 ? '1' : '2'}`;
    const posText = `${Math.floor(location.x)}, ${Math.floor(location.y)}, ${Math.floor(location.z)}`;
    const countText = `(${blocks} blocks)`;

    this.player.sendMessage(`Set ${posTypeText} at ${posText} ${countText}`);
  }
}
