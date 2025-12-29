import { 
  CommandPermissionLevel,
  CustomCommandOrigin,
  CustomCommandResult,
  CustomCommandStatus,
  Player
} from '@minecraft/server';
import { BaseCommand } from './baseCommand';
import { WeditProperty } from '../utils/weditProperty';
import { callSession } from '../session/sessionManager';
import { PositionProcess } from '../process/positionProcess';

export class Position1Command extends BaseCommand {
  name: string = 'wedit:pos1';
  description: string = 'Set position 1';
  permissionLevel: CommandPermissionLevel = CommandPermissionLevel.GameDirectors;
  execute(origin: CustomCommandOrigin): CustomCommandResult | undefined {
    const sender = origin.sourceEntity;
    if (!(sender instanceof Player)) {
      return {
        message: 'Please use this command in game.',
        status: CustomCommandStatus.Failure
      };
    }

    callSession(sender).run(new PositionProcess(
      sender.dimension,
      sender.location,
      WeditProperty.POS_1,
      sender
    ), false);
  }
}

export class Position2Command extends BaseCommand {
  name: string = 'wedit:pos2';
  description: string = 'Set position 2';
  permissionLevel: CommandPermissionLevel = CommandPermissionLevel.GameDirectors;
  execute(origin: CustomCommandOrigin): CustomCommandResult | undefined {
    const sender = origin.sourceEntity;
    if (!(sender instanceof Player)) {
      return {
        message: 'Please use this command in game.',
        status: CustomCommandStatus.Failure
      };
    }

    callSession(sender).run(new PositionProcess(
      sender.dimension,
      sender.location,
      WeditProperty.POS_2,
      sender
    ), false);
  }
}
