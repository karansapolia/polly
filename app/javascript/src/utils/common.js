export const countTotalVotes = array =>
  array.reduce((acc, curr) => acc + curr, 0);
