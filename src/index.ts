/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomCommandOrigin, StartupEvent, system } from '@minecraft/server';
import { Position1Command, Position2Command } from './command/positionCommand';
import { SetCommand } from './command/setCommand';
import { ReplaceCommand } from './command/replaceCommand';
import { UndoCommand } from './command/undoCommand';
import { RedoCommand } from './command/redoCommand';
import './listener';

system.beforeEvents.startup.subscribe((event: StartupEvent) => {
  const registry = event.customCommandRegistry;

  const commands = [
    new Position1Command(),
    new Position2Command(),
    new UndoCommand(),
    new RedoCommand(),
    new SetCommand(),
    new ReplaceCommand()
  ];

  for (const command of commands) {
    registry.registerCommand(
      command,
      (origin: CustomCommandOrigin, ...args: any[]) => command.execute(origin, args)
    );
  }
});
