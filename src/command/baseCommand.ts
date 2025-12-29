import { CommandPermissionLevel, CustomCommand, CustomCommandOrigin, CustomCommandParameter, CustomCommandResult } from '@minecraft/server';

export abstract class BaseCommand implements CustomCommand {
  abstract name: string;
  abstract description: string;
  abstract permissionLevel: CommandPermissionLevel;
  cheatsRequired?: boolean | undefined = false;
  mandatoryParameters?: CustomCommandParameter[] | undefined = undefined;
  optionalParameters?: CustomCommandParameter[] | undefined = undefined;
  
  abstract execute(origin: CustomCommandOrigin, ...args: unknown[]): CustomCommandResult | undefined;
}
