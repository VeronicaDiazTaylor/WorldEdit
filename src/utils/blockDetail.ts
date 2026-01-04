/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockPermutation, BlockType } from '@minecraft/server';

export type BlockDetail = {
  blockType: BlockType,
  blockStates?: Record<string, string | number | boolean> | undefined
}

/**
 * BlockDetail
 * @param blockTypeStr 
 * @param blockStatesStr 
 * @returns {BlockDetail}
 */
export function getBlockDetail(blockTypeStr: any, blockStatesStr: any): BlockDetail {
    const baseBlock = BlockPermutation.resolve((blockTypeStr as BlockType).id);
    
    if (!blockStatesStr) return { blockType: blockTypeStr as BlockType };
    
    const blockStates: Record<string, string | number | boolean> = {};
    for (const blockStateStr of blockStatesStr.split(',')) {
      if (!blockStateStr.includes('=')) continue;

      const state = blockStateStr.split('=');
      const key = state[0] ?? undefined;

      if (key in baseBlock.getAllStates()) {
        let value: any;
        try {
          value = JSON.parse(state[1]);
        } catch {
          value = (state[1] as string);
        }

        if (value) blockStates[key] = value;
      }
    }

    return { blockType: blockTypeStr as BlockType, blockStates: blockStates };
  }
