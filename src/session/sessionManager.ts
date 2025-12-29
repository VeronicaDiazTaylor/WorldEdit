import { Player } from '@minecraft/server';
import { Session } from './session';

const sessions = new Map<string, Session>();

export function callSession(player: Player): Session {
  let s = sessions.get(player.id);
  if (!s) {
    s = new Session(player);
    sessions.set(player.id, s);
  }
  
  return s;
}
