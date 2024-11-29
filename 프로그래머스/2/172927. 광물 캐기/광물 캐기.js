function solution(picks, minerals) {
  const fatigueTable = [
    [1, 1, 1],    // 다이아몬드 곡괭이
    [5, 1, 1],    // 철 곡괭이
    [25, 5, 1],   // 돌 곡괭이
  ];

  let minFatigue = Infinity; // 최소 피로도 초기화

  // 광물을 5개씩 묶기
  const chunks = [];
  for (let i = 0; i < minerals.length; i += 5) {
    chunks.push(minerals.slice(i, i + 5));
  }
     
  console.log(chunks);

  // 피로도 계산 함수
  function calculateFatigue(pick, chunk) {
    const count = [0, 0, 0]; // [diamond, iron, stone] 개수
    chunk.forEach((mineral) => {
      if (mineral === "diamond") count[0]++;
      else if (mineral === "iron") count[1]++;
      else count[2]++;
    });

    // 선택한 곡괭이로 계산한 피로도
    return count[0] * fatigueTable[pick][0] +
           count[1] * fatigueTable[pick][1] +
           count[2] * fatigueTable[pick][2];
  }

  // DFS 함수
  function dfs(index, picks, totalFatigue) {
    // 종료 조건: 모든 광물을 캤거나, 곡괭이를 다 사용했을 때
    if (index === chunks.length || picks.every((pick) => pick === 0)) {
      minFatigue = Math.min(minFatigue, totalFatigue); // 최소 피로도 갱신
      return;
    }

    // 가지치기: 현재 피로도가 이미 최소 피로도를 초과하면 중단
    if (totalFatigue >= minFatigue) return;

    // 각 곡괭이를 사용해 탐색
    for (let i = 0; i < 3; i++) {
      if (picks[i] > 0) { // 사용할 수 있는 곡괭이만 선택
        const currentFatigue = calculateFatigue(i, chunks[index]);
        picks[i]--; // 곡괭이 사용
        dfs(index + 1, picks, totalFatigue + currentFatigue);
        picks[i]++; // 백트래킹 (곡괭이 복구)
      }
    }
  }

  // DFS 탐색 시작
  dfs(0, picks, 0);

  return minFatigue;
}
