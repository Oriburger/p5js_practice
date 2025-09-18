function setup() {
  // WebGL 모드로 3D 캔버스 생성
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(10, 10, 20); // 어두운 남색 배경
  
  // 마우스 위치에 따라 조명 위치 변경
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, locX, locY, 100);
  
  // 프레임 수에 따라 상자를 부드럽게 회전
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
  noStroke(); // 테두리 없음
  specularMaterial(250); // 반짝이는 재질 설정
  box(150); // 한 변의 길이가 150인 상자 그리기
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}