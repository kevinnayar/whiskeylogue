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

export function slugify(value: string): string {
  let str: string = value;
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  const from = 'ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}

export function getRegExEmail() {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

export function getRegExPassword() {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
}

export function transitionStyles(style: string, easing: string) {
  return `cursor: pointer; transition: ${style} 0.3s ${easing};`;
}



