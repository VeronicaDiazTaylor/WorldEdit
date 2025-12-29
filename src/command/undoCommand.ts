import { 
  CommandPermissionLevel,
  CustomCommandOrigin,
  CustomCommandResult,
  CustomCommandStatus,
  Player
} from '@minecraft/server';
import { BaseCommand } from './baseCommand';
import { callSession } from '../session/sessionManager';

export class UndoCommand extends BaseCommand {
  name: string = 'wedit:undo';
  description: string = 'Undoes the last action (from history)';
  permissionLevel: CommandPermissionLevel = CommandPermissionLevel.GameDirectors;
  execute(origin: CustomCommandOrigin): CustomCommandResult | undefined {
    const sender = origin.sourceEntity;
    if (!(sender instanceof Player)) {
      return {
        message: 'Please use this command in game.',
        status: CustomCommandStatus.Failure
      };
    }

    const session = callSession(sender);
    if (!session.history.canUndo()) {
      return {
        message: 'There are no process in your history.',
        status: CustomCommandStatus.Failure
      };
    }

    session.history.undo();
  }
}
