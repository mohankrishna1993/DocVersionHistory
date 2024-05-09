import { Component, OnInit } from '@angular/core';
import { VersionHistoryService } from '../service/version-history.service';
import * as diff from 'diff';
import * as DiffMatchPatch from 'diff-match-patch';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  versionHistory: { content: string, diff: diff.Change[], timestamp: string }[] = [];
  content = '';
  selectedIndex = 0;
  dmp = new DiffMatchPatch();

  constructor(private versionHistoryService : VersionHistoryService) {}
  ngOnInit(): void {
        this.versionHistory = this.versionHistoryService.getVersionHistory().reverse();
        console.log(this.versionHistory);
  }

  showItem(i: number) {
    console.log(i);
    this.selectedIndex = i;
  }


calculateDifferences(currentVersion: string, previousVersion: string | undefined): string {

  const diffs = this.dmp.diff_main(previousVersion ?? "", currentVersion);
  this.dmp.diff_cleanupSemantic(diffs);
  console.log(diffs);

  let result = '';
  diffs.forEach(([operation, text]) => {
    if (operation === -1) {
      // Removed content
      result += `<del>${text}</del>`;
    } else if (operation === 1) {
      // Added content
      result += `<ins>${text}</ins>`;
    } else {
      // Unchanged content
      result += text;
    }
  });

  return result;
}
  }

