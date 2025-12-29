import { EventManager } from 'keystonemc';
import { WeditProperty } from './utils/weditProperty';
import { callSession } from './session/sessionManager';
import { PositionProcess } from './process/positionProcess';

EventManager.registerAfter('playerSpawn', {
  handler(event) {
    if (!event.initialSpawn) return;

    const player = event.player;
    player.setDynamicProperty(WeditProperty.POS_1);
    player.setDynamicProperty(WeditProperty.POS_2);
  },
});

EventManager.registerBefore('playerBreakBlock', {
  handler(event) {
    const item = event.itemStack;
    
    if (!item) return;
    if (item.typeId !== 'minecraft:wooden_axe') return;
    
    const player = event.player;
    const location = event.block.location;

    event.cancel = true;

    callSession(player).run(new PositionProcess(
      player.dimension,
      location,
      !player.isSneaking ? WeditProperty.POS_1 : WeditProperty.POS_2,
      player
    ), false);
  },
});
