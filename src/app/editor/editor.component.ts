import { Component, OnInit } from '@angular/core';
import { VersionHistoryService } from '../service/version-history.service';
import { EditorConfig, BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, FONT_SIZE_SELECT} from 'ngx-simple-text-editor';
import { Router } from '@angular/router';
import * as diff from 'diff';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit{
  constructor(private versionHistoryService : VersionHistoryService,
    private router: Router
) {}
  ngOnInit(): void {
    this.content = localStorage.getItem("editor-string") ?? "";
  }

versionHistory: { content: string, diff: diff.Change[], timestamp: string }[] = [];

  title = 'editor';
  content = '';
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, FONT_SIZE_SELECT],
  };
  showContent() {
     console.log(this.content);
     this.versionHistoryService.saveVersion(this.content);
     this.versionHistory = this.versionHistoryService.getVersionHistory();
     console.log(this.versionHistory);
     localStorage.setItem("editor-string", this.content);
  }
  showHistory() {

  }
  navigateToHistory() {

    this.router.navigate(['/history']);
  }
}
