export const countTotalVotes = array =>
  array.reduce((acc, curr) => acc + Number(curr), 0);
