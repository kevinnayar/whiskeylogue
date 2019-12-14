export function joinListAsPhrase(list: string[], oxfordComma: boolean): string {
  if (list.length === 0) {
    return '';
  }
  if (list.length === 1) {
    return list[0];
  }
  if (list.length === 2) {
    return `${list[0]} and ${list[1]}`;
  }
  const toPenultimate: string[] = list.filter((_v: string, i: number) => i !== list.length - 1);
  return `${toPenultimate.join(', ')}${oxfordComma ? ',' : ''} and ${list[list.length - 1]}`;
}

export function getMatchingResults(text: string, list: string[], limit: void | number): string[] {
  if (text.length === 0) {
    return [];
  }
  const regex: RegExp = new RegExp(text.split('').join('\\w*').replace(/\W/, ''), 'i');
  const results: string[] = list.filter((term: string) => {
    return term.match(regex);
  });
  if (limit) {
    return results.slice(0, limit);
  }
  return results;
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

export function getRegExEmail() {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

export function getRegExPassword() {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
}


