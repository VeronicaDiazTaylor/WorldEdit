import { BaseProcess } from './baseProcess';

export class ProcessHistory {
  private readonly maxSize = 10;

  private undoStack: BaseProcess[] = [];
  private redoStack: BaseProcess[] = [];

  push(process: BaseProcess) {
    this.undoStack.push(process);
    this.redoStack.length = 0;

    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
  }

  undo() {
    const process = this.undoStack.pop();
    if (!process) return false;

    process.undo();
    this.redoStack.push(process);
    return true;
  }

  redo() {
    const process = this.redoStack.pop();
    if (!process) return false;

    process.redo();
    this.undoStack.push(process);
    return true;
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  clear() {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
  }
}
