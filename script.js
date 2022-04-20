const WIDTH = 480;
const HEIGHT = 360;

let draw = SVG('game').size(WIDTH, HEIGHT);
let background = draw.image('images/bcg2.png', WIDTH, HEIGHT);
let geralt = draw.image('images/G2.png', 60, 67).move(0, 220);
let fork = draw.image('images/WS3.png', 50, 62).move(WIDTH, 220);
let text = draw.text("0").move(400, 0).font({size: 40}).fill("white");

let changeY = 0;
let isJump = false;
let score = 0;
  
function update() {
  if (isJump) {
    geralt.dy(changeY);
    changeY += 0.5;
    if (geralt.y() >= 220) {
      isJump = false;
    }
  }
  
  let collision = geralt.x() + geralt.width() > fork.x() && geralt.x() < fork.x() + fork.width() && geralt.y() + geralt.height() > fork.y();

  if (collision) {
    // alert("Минус ведьмак");
    background.load("images/bcg3.jpg")
    clearInterval(update_id);
  }

  
  fork.dx(-4);
  if (fork.x() <= 0) {
    score += 1;
    text.text("" + score);
    fork.x(WIDTH);
  }
}


let update_id = setInterval(update, 10);

document.addEventListener("mousedown", function(event) {
  if (isJump == false) {
    changeY = -14;
    isJump = true;
  }
});
