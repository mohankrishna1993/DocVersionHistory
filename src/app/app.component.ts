import { Component } from '@angular/core';
import {EditorConfig, BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON} from 'ngx-simple-text-editor';
import { VersionHistoryService } from './service/version-history.service';
import * as diff from 'diff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private versionHistoryService : VersionHistoryService) {

  }
  versionHistory: { content: string, diff: diff.Change[], timestamp: string }[] = [];

  title = 'editor';
  content = '';
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON],
  };
  showContent() {
     console.log(this.content);
     this.versionHistoryService.saveVersion(this.content);
     this.versionHistory = this.versionHistoryService.getVersionHistory();
     console.log(this.versionHistory);
  }


}
