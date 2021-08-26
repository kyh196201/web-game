// 테트리스 조각 로직
class Piece {
  constructor(ctx) {
    this.color = '';
    this.shape = [];
    this.x = 0;
    this.y = 0;

    this.ctx = ctx;
    this.spawn();
  }

  spawn() {
    this.color = 'blue';
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ];

    // Starting position.
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;

    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(p) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }
}
