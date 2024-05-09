import { Injectable } from '@angular/core';
import * as diff from 'diff';

@Injectable({
  providedIn: 'root'
})
export class VersionHistoryService {
  private versionHistory: { content: string, diff: diff.Change[], timestamp: string }[] = [];

  constructor() { }

  saveVersion(content: string) {
    const timestamp = new Date().toLocaleString();
    const lastVersionContent = this.versionHistory.length > 0 ? this.versionHistory[this.versionHistory.length - 1].content : '';
    const diffResult = diff.diffLines(lastVersionContent, content);
    const diffChanges = diffResult.map(part => {
      if (part.added) {
        return `<ins>${part.value}</ins>`;
      } else if (part.removed) {
        return `<del>${part.value}</del>`;
      } else {
        return part.value;
      }
    }) as any;
    this.versionHistory.push({ content: content, diff: diffChanges, timestamp: timestamp });
  }

  getVersionHistory() {
    return this.versionHistory;
  }
}
