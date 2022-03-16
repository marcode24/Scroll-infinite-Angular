import { Component, HostListener, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/character.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: [ './infinite-scroll.component.css' ]
})
export class InfiniteScrollComponent implements OnInit {
  public showGoUpButton: boolean;
  public loading: boolean = true;

  private finishCount = 50;
  private count: number;

  public charactersTemp: ICharacter[] = [];
  public characters: ICharacter[] = [];

  private showScrollHeight = 400;
  private hideScrollHeight = 200;

  constructor(private apiService: ApiService) {
    this.count = 9;
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.getCharacters();
  }


  getCharacters() {
    this.apiService.getCharacters().subscribe((resp: ICharacter[]) => { // 50 CHARACTERS
      resp.forEach((character, index) => {
        if(index < this.count){
          this.characters.push(character)
        }
      });
      resp.splice(0, this.count);
      this.charactersTemp = resp;
      this.loading = false;
    });
  }

  onScroll() {
    if(this.count < this.finishCount) {
      this.count += 5;
      const removedCharacters = this.charactersTemp.splice(0, this.count);
      this.characters.push(...removedCharacters);
    }
  }

  scrollTop() {
    document.body.scrollTop = 0; // this is for Safari
    document.documentElement.scrollTop = 0; // for other one
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }
}
