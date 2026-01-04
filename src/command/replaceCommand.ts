/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  CommandPermissionLevel,
  CustomCommandOrigin,
  CustomCommandParameter,
  CustomCommandParamType,
  CustomCommandResult,
  CustomCommandStatus,
  Player, 
  Vector3
} from '@minecraft/server';
import { BaseCommand } from './baseCommand';
import { WeditProperty } from '../utils/weditProperty';
import { callSession } from '../session/sessionManager';
import { getPositionsInBox } from '../utils/coordsUtils';
import { ReplaceProcess } from '../process/replaceProcess';
import { getBlockDetail } from '../utils/blockDetail';

export class ReplaceCommand extends BaseCommand {
  name: string = 'wedit:replace';
  description: string = '	Replace all blocks in the selection with another.';
  permissionLevel: CommandPermissionLevel = CommandPermissionLevel.GameDirectors;
  mandatoryParameters?: CustomCommandParameter[] = [
    { name: 'beforeType', type: CustomCommandParamType.BlockType },
    { name: 'afterType', type: CustomCommandParamType.BlockType }
  ];
  optionalParameters?: CustomCommandParameter[] = [
    { name: 'beforeState', type: CustomCommandParamType.String },
    { name: 'afterState', type: CustomCommandParamType.String }
  ];
  execute(origin: CustomCommandOrigin, ...args: any[]): CustomCommandResult | undefined {
    const sender = origin.sourceEntity;
    if (!(sender instanceof Player)) {
      return {
        message: 'Please use this command in game.',
        status: CustomCommandStatus.Failure
      };
    }

    const pos1 = sender.getDynamicProperty(WeditProperty.POS_1) as Vector3 | undefined;
    const pos2 = sender.getDynamicProperty(WeditProperty.POS_2) as Vector3 | undefined;
    if (!pos1 || !pos2) {
      return {
        message: 'You must set the positions before by using /pos1 or /pos2.',
        status: CustomCommandStatus.Failure
      };
    }

    const process = new ReplaceProcess(
      sender.dimension,
      getPositionsInBox(pos1, pos2),
      getBlockDetail(args[0][0], args[0][2]),
      getBlockDetail(args[0][1], args[0][3]),
      sender
    );
    
    const session = callSession(sender);
    session.run(process);

    session.history.push(process);
  }
}
