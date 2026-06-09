function solveKnapsack(tasks, capacity) {
  const n = tasks.length;

  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const duration = tasks[i - 1].Duration;
    const impact = tasks[i - 1].Impact;

    for (let w = 0; w <= capacity; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], impact + dp[i - 1][w - duration]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  const selectedTasks = [];

  let w = capacity;

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedTasks.push(tasks[i - 1]);
      w -= tasks[i - 1].Duration;
    }
  }

  const totalDuration = selectedTasks.reduce(
    (sum, task) => sum + task.Duration,
    0,
  );

  return {
    totalImpact: dp[n][capacity],
    totalDuration,
    selectedTasks,
  };
}

export { solveKnapsack };
