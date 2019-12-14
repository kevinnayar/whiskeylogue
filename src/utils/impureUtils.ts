export function getRandomItemFromList(list: any[]): any {
  const index: number = Math.floor(Math.random() * list.length);
  return list[index];
}