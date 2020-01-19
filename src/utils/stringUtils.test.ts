import {
  joinListAsPhrase,
  getMatchingResults,
  slugify,
  transitionStyles,
} from './stringUtils';

describe('/src/utils/stringUtils', () => {
  test('joinListAsPhrase', () => {
    const baseList: string[] = ['tom', 'dick', 'harry'];
    const baseResult: string = 'tom, dick and harry';
    const baseResultOxford: string = 'tom, dick, and harry';

    expect(joinListAsPhrase(baseList, false)).toEqual(baseResult);
    expect(joinListAsPhrase(baseList, true)).toEqual(baseResultOxford);
    expect(joinListAsPhrase([], false)).toEqual('');
    expect(joinListAsPhrase([baseList[0]], false)).toEqual('tom');
    expect(joinListAsPhrase([baseList[0]], true)).toEqual('tom');
    expect(joinListAsPhrase([baseList[0], baseList[1]], false)).toEqual('tom and dick');
    expect(joinListAsPhrase([baseList[0], baseList[1]], true)).toEqual('tom and dick');
  });

  test('getMatchingResults', () => {
    expect(getMatchingResults('f', ['foo', 'bar', 'baz'])).toEqual(['foo']);
    expect(getMatchingResults('fo', ['foo', 'bar', 'baz'])).toEqual(['foo']);
    expect(getMatchingResults('foo', ['foo', 'bar', 'baz'])).toEqual(['foo']);
    expect(getMatchingResults('foo', ['foo', 'food', 'bar', 'baz'])).toEqual(['foo', 'food']);
    expect(getMatchingResults('b', ['foo', 'food', 'bar', 'baz'])).toEqual(['bar', 'baz']);
    expect(getMatchingResults('ba', ['foo', 'food', 'bar', 'baz'])).toEqual(['bar', 'baz']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz'])).toEqual(['bar']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz', 'a bar'])).toEqual(['bar', 'a bar']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz', 'a bar', 'bart'])).toEqual(['bar', 'a bar', 'bart']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz', 'a bar', 'bart', 'abart'])).toEqual(['bar', 'a bar', 'bart', 'abart']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz', 'a bar', 'bart', 'abart'], 1)).toEqual(['bar']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz', 'a bar', 'bart', 'abart'], 2)).toEqual(['bar', 'a bar']);
    expect(getMatchingResults('bar', ['foo', 'food', 'bar', 'baz', 'bart', 'abart', 'a bar'], 2)).toEqual(['bar', 'bart']);
  });

  test('slugify', () => {
    expect(slugify('This Is Some Random Text')).toEqual('this-is-some-random-text');
    expect(slugify('this_is_some_random_text')).toEqual('this-is-some-random-text');
    expect(slugify('ABC   123')).toEqual('abc-123');
    expect(slugify('ãàáäâèéëêìíïîòóöôùúüûñç·/_,:;')).toEqual('aaaaaeeeeiiiioooouuuunc-');
    expect(slugify('ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÔÕÖÑÙÚÜÛ')).toEqual('aaaaaeeeeiiiiooooonuuuu');
  });

  test('transitionStyles', () => {
    const styleA: string = `cursor: pointer; transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);`;
    expect(transitionStyles(true, 'opacity', 'cubic-bezier(0.4, 0.0, 0.2, 1)')).toEqual(styleA);

    const styleB: string = `transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);`;
    expect(transitionStyles(false, 'opacity', 'cubic-bezier(0.4, 0.0, 0.2, 1)')).toEqual(styleB);
  });
});
