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
dmp = new DiffMatchPatch();

  constructor(private versionHistoryService : VersionHistoryService) {}
  ngOnInit(): void {
        this.versionHistory = this.versionHistoryService.getVersionHistory();
        console.log(this.versionHistory);
  }

//   calculateDifferences(currentVersion: string, previousVersion: string | undefined): string {
//    // Split HTML content into separate tags and text
//    const currentParts = currentVersion.split(/(<[^>]*>)/);
//    const previousParts = previousVersion?.split(/(<[^>]*>)/) ?? [];

//    // Generate patches for text parts
//    const textPatches = this.dmp.patch_make(currentParts.filter(part => !part.startsWith('<')).join(''), previousParts.filter(part => !part.startsWith('<')).join(''));

//    // Apply patches to text parts
//    const newTextParts = this.dmp.patch_apply(textPatches, previousParts.filter(part => !part.startsWith('<')).join(''));

//    // Combine patched text parts with original HTML tags
//    let result = '';
//    for (let i = 0; i < previousParts.length; i++) {
//      if (previousParts[i].startsWith('<')) {
//        // Append HTML tag
//        result += previousParts[i];
//      } else {
//        // Append patched text with appropriate styling
//        const diff = this.dmp.diff_main(previousParts[i], newTextParts[0][i]);
//        this.dmp.diff_cleanupSemantic(diff);
//        diff.forEach(([type, text]) => {
//          if (type === 0) {
//            // Unchanged text
//            result += text;
//          } else if (type === -1) {
//            // Deleted text
//            result += `<span class="deleted-content">${text}</span>`;
//          } else if (type === 1) {
//            // Added text
//            result += `<span class="added-content">${text}</span>`;
//          }
//        });
//      }
//    }
//    return result;
//  }

calculateDifferences(currentVersion: string, previousVersion: string | undefined): string {
 
  const diffs = this.dmp.diff_main(previousVersion ?? "", currentVersion);
  this.dmp.diff_cleanupSemantic(diffs);


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

