export default function chunkArray<T>(items: T[], numCols: number): T[][] {
  if (numCols <= 0) return [items];
  const columns: T[][] = Array.from({ length: numCols }, () => []);
  items.forEach((item, index) => {
    columns[index % numCols].push(item);
  });
  return columns;
}
