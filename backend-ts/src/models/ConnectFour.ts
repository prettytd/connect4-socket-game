import { Color } from '../types/ConnectFour';

const width = 7;
const height = 6;

export class ConnectFour {
  private currentColor: Color = Color.Blue;
  private board: Color[][] = []; // order is [left -> right][bottom -> top]
  private players: Color[] = [];

  constructor() {
    this.reset();
  }

  private switchColor(): Color {
    this.currentColor = this.currentColor === Color.Blue ? Color.Red : Color.Blue;
    return this.currentColor;
  }

  getCurrentColor(): Color {
    return this.currentColor;
  }

  reset(): void {
    this.board = [];
    for (let i = 0; i < width; i++) {
      this.board.push([]);
    }
    this.currentColor = this.players[0] || Color.Blue;
  }

  addBallToColumn(col: number): {
    addedPosition: { row: number; col: number };
    addedColor: Color;
    currentColor: Color;
  } {
    // todo: limit height

    // add ball to map
    this.board[col].push(this.currentColor);

    // the position new ball is added
    const addedPosition = {
      row: height - this.board[col].length,
      col,
    };
    const addedColor = this.currentColor;

    return {
      addedPosition,
      addedColor,
      currentColor: this.switchColor(),
    };
  }

  addPlayer(): Color | null {
    if (this.players.length === 2) {
      return null;
    }

    let player: Color;

    if (!this.players.length) {
      player = Color.Blue;
    } else {
      player = this.players[0] === Color.Blue ? Color.Red : Color.Blue;
    }

    this.players.push(player);
    this.displayPlayers();

    return player;
  }

  removePlayer(color: Color) {
    const idx = this.players.indexOf(color);
    if (idx === -1) {
      return;
    }
    this.players.splice(idx, 1);
    this.displayPlayers();
  }

  displayPlayers() {
    console.log('players', this.players);
  }
}

export default new ConnectFour();
