let shapes = []; // 도형들을 저장할 배열
let numShapes = 30; // 초기 도형의 개수

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // 각도 단위를 도로 설정
  
  // 초기 도형 생성
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape());
  }
}

function draw() {
  background(0, 0, 20, 50); // 투명도를 가진 어두운 배경 (잔상 효과)
  
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
    shapes[i].checkEdges();
  }
  
  // 마우스 클릭 시 새로운 도형 생성
  if (mouseIsPressed && frameCount % 5 === 0) { // 너무 많이 생성되지 않도록 조절
    shapes.push(new Shape(mouseX, mouseY));
    if (shapes.length > 50) { // 배열 크기 제한
      shapes.splice(0, 1);
    }
  }
}

// 창 크기 조절 시 캔버스도 조절
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Shape 클래스 정의
class Shape {
  constructor(x = random(width), y = random(height)) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2); // x축 속도
    this.vy = random(-2, 2); // y축 속도
    this.size = random(20, 80); // 도형 크기
    this.type = floor(random(3)); // 0: 원, 1: 사각형, 2: 삼각형
    this.rotation = random(360); // 초기 회전 각도
    this.rotationSpeed = random(-1, 1); // 회전 속도
    this.color = color(random(255), random(255), random(255), 150); // 투명한 무작위 색상
    this.lifespan = 255; // 도형의 수명
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.lifespan -= 0.5; // 시간이 지남에 따라 수명 감소
    this.color.setAlpha(this.lifespan); // 수명에 따라 투명도 조절
  }
  
  display() {
    push(); // 현재 변환 상태 저장
    translate(this.x, this.y); // 도형을 그릴 위치로 이동
    rotate(this.rotation); // 도형 회전
    
    noStroke();
    fill(this.color);
    
    switch (this.type) {
      case 0: // 원
        ellipse(0, 0, this.size);
        break;
      case 1: // 사각형
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        break;
      case 2: // 삼각형
        triangle(0, -this.size / 2, -this.size / 2, this.size / 2, this.size / 2, this.size / 2);
        break;
    }
    pop(); // 저장된 변환 상태 복원
  }
  
  checkEdges() {
    // 화면 밖으로 나가면 반대편에서 나타나도록 처리
    if (this.x > width + this.size / 2) this.x = -this.size / 2;
    if (this.x < -this.size / 2) this.x = width + this.size / 2;
    if (this.y > height + this.size / 2) this.y = -this.size / 2;
    if (this.y < -this.size / 2) this.y = height + this.size / 2;
  }
}