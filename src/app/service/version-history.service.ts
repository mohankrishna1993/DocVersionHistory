import { Injectable, OnInit } from '@angular/core';
import * as diff from 'diff';

@Injectable({
  providedIn: 'root'
})
export class VersionHistoryService implements OnInit{
  private versionHistory: { content: string, timestamp: string }[] = [];

  constructor() {}

  ngOnInit() {
   this.versionHistory = JSON.parse(localStorage.getItem("editor-history") ?? "");
  }


  saveVersion(content: string) {
    const timestamp = new Date().toLocaleString();
    this.versionHistory.push({ content: content, timestamp: timestamp });
    localStorage.setItem("editor-history", JSON.stringify(this.versionHistory));
  }

  getVersionHistory() {
    return JSON.parse(localStorage.getItem("editor-history") ?? "");;
  }
}
