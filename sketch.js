let particles = [];
const numParticles = 100; // 파티클 개수 (너무 많으면 성능 저하 가능)

// 연결선이 생기는 최대 거리
const maxDist = 120; 
// 마우스와 연결되는 최대 거리
const mouseDist = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 파티클 생성
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // 배경을 어두운 남색으로 설정
  background(10, 10, 30);
  
  // 모든 파티클에 대해 반복
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    particles[i].checkEdges();
    
    // 다른 파티클과의 연결선 그리기
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      if (d < maxDist) {
        // 거리에 따라 선의 투명도 조절
        let alpha = map(d, 0, maxDist, 255, 0);
        stroke(255, alpha * 0.4); // 선 색상 및 투명도
        strokeWeight(1);
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
    
    // 마우스와의 연결선 그리기
    let dMouse = dist(particles[i].pos.x, particles[i].pos.y, mouseX, mouseY);
    if (dMouse < mouseDist) {
        let alpha = map(dMouse, 0, mouseDist, 255, 0);
        stroke(169, 194, 255, alpha * 0.8); // 포인트 색상으로 강조
        strokeWeight(1.5); // 마우스 연결선은 조금 더 굵게
        line(particles[i].pos.x, particles[i].pos.y, mouseX, mouseY);
    }
  }
}

// 창 크기가 변경될 때 캔버스 크기도 조절
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Particle 클래스
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(2, 5);
  }
  
  // 위치 업데이트
  update() {
    this.pos.add(this.vel);
  }
  
  // 파티클 그리기
  draw() {
    noStroke();
    fill(255, 150); // 파티클 색상 및 투명도
    circle(this.pos.x, this.pos.y, this.size);
  }
  
  // 화면 경계 체크 (밖으로 나가면 반대편에서 등장)
  checkEdges() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }
}
