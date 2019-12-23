export function average(grades: number[]): number {
  const total: number = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

export function preciseRoundPercentage(value: number): string {
  if (value === 100) {
    return '100.00';
  }

  const split: string[] = value.toString().split('.');
  const prefix: string = split[0].length === 1 ? `0${split[0]}` : split[0];
  let suffix: string = split[1] || '00';
  suffix = suffix.length === 1 ? `${suffix}0` : `${suffix.substring(0, 2)}`;

  return `${prefix}.${suffix}`;
}

export function bytesToSize(bytes: number, decimals: number): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k: number = 1024;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
