const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const solution = (input) => {
  // 첫 번째 줄을 읽어서 n, m 값 추출
  const [n, m] = input[0].split(' ').map(Number);

  // 나머지 줄을 2차원 배열로 변환
  const board = input.slice(1).map((line) => line.split(' ').map(Number));

  const vis = Array.from(Array(n), () => Array(m).fill(false));
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  function bfs(x, y) {
    const queue = [];
    queue.push([x, y]);
    vis[x][y] = true;
    let areaSize = 1; // 현재 그림의 넓이

    while (queue.length > 0) {
      const [curX, curY] = queue.shift();
      // console.log(`(${curX}, ${curY})`);

      for (let dir = 0; dir < 4; dir++) {
        const nx = curX + dx[dir];
        const ny = curY + dy[dir];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (vis[nx][ny] || board[nx][ny] !== 1) continue;

        vis[nx][ny] = true;
        queue.push([nx, ny]);
        areaSize++; // 넓이를 증가시킴
      }
    }
    return areaSize;
  }

  let pictureCount = 0; // 그림의 개수
  let maxAreaSize = 0; // 가장 큰 그림의 넓이

  // 모든 위치에서 BFS 실행
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 1 && !vis[i][j]) {
        pictureCount++; // 새로운 그림 발견
        const areaSize = bfs(i, j); // 해당 그림의 넓이 계산
        maxAreaSize = Math.max(maxAreaSize, areaSize); // 가장 큰 넓이 갱신
      }
    }
  }

  // 결과 출력
  console.log(pictureCount);
  console.log(maxAreaSize);
};

// 입력에 대해 solution 함수 호출
solution(input);
