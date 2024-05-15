import { Component, OnInit } from '@angular/core';
import { PlayTable } from '../models/play-table';
import { PlayTableService } from '../services/play-table.service';
import { SingleFieldStatus } from '../models/single-field-status';
import { SingleMove } from '../models/single-move';
import { PlayTableForCreation } from '../models/play-table-for-creation';
import { PlaySide } from '../models/play-side';
import { SingleField } from '../models/single-field';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent {

  constructor(private playTableService: PlayTableService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  playTable!: PlayTable;
  edgeSize = 3;
  cpuSide = PlaySide.circle;
  winningRowSize = 3
  singleFieldStatus = SingleFieldStatus;
  isGameSet = false;
  isEnded = false;
  winningRow: SingleField[] = [];
  playTableIdForLoad?: number;

  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Close")
  }

  onClick(position: number) {
    const singleMove: SingleMove = {
      playTableId: this.playTable.playTableId,
      singleFieldPosition: position,
      singleFieldStatus: SingleFieldStatus.blank
    }
    if (this.playTable.cpuSide === PlaySide.circle) {
      singleMove.singleFieldStatus = SingleFieldStatus.cross;
    }
    else {
      singleMove.singleFieldStatus = SingleFieldStatus.circle;
    }
    this.playTableService.makeMove(singleMove).subscribe(r => {
      if (r.length != this.playTable.winningRowSize) {
        this.playTable.singleFields = r
      }
      else {
        for (let singleField of r) {
          this.playTable.singleFields[singleField.position] = singleField;
          this.playTable.singleFields[singleMove.singleFieldPosition].status = singleMove.singleFieldStatus;
        };
        this.isEnded = true;
        this.winningRow = r;
      }
    })
  };

  startNewGame() {
    const playTableForCreation: PlayTableForCreation = {
      edgeSize: this.edgeSize,
      cpuSide: this.cpuSide,
      winningRowSize: this.winningRowSize
    };
    this.playTableService.createTable(playTableForCreation).subscribe(r => {
      this.playTable = r;
      this.edgeSize = Math.sqrt(r.singleFields.length);
      this.isGameSet = true;
    });
  }

  loadGame() {
    this.playTableService.getPlayTable(this.playTableIdForLoad!).subscribe({
      next: r => { this.playTable = r, this.edgeSize = Math.sqrt(r.singleFields.length), this.isGameSet = true },
      error: err => this.openSnackBar("Game not found")
    })
  }

  playAgain() {
    this.isGameSet = false;
    this.isEnded = false;
    this.winningRow = [];
  }
}