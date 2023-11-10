export function convertToGbFromPetabytes(value: number): number {
  const gigabytes = value * 1e9; // 1 petabyte = 1e9 gigabytes
  return parseFloat(gigabytes.toFixed(2));
}
