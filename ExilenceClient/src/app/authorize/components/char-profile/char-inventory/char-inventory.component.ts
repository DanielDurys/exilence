import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from '../../../../shared/interfaces/item.interface';
import { PartyService } from '../../../../shared/providers/party.service';

@Component({
  selector: 'app-char-inventory',
  templateUrl: './char-inventory.component.html',
  styleUrls: ['./char-inventory.component.scss']
})
export class CharInventoryComponent implements OnInit, OnDestroy {
  @Input() items: Item[];
  // default to main-inventory
  @Input() inventoryId = 'MainInventory';
  @Input() width = 12;
  @Input() height = 5;
  @Input() topMargin = 0;
  grid = [];
  sessionIdProvided: boolean;
  private selectedPlayerSub: Subscription;
  constructor(private partyService: PartyService) {
    this.grid = Array(this.width * this.height).fill(0);

    this.selectedPlayerSub = this.partyService.selectedPlayer.subscribe(res => {
      if (res !== undefined) {
        this.sessionIdProvided = res.sessionIdProvided;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.selectedPlayerSub !== undefined) {
      this.selectedPlayerSub.unsubscribe();
    }
  }
}
