import {
  joinListAsPhrase,
  bytesToSize,
} from './baseUtils';

describe('/src/utils/baseUtils', () => {
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

  test('bytesToSize', () => {
    expect(bytesToSize(10, 2)).toEqual('10 Bytes');
    expect(bytesToSize(100, 2)).toEqual('100 Bytes');
    expect(bytesToSize(1000, 2)).toEqual('1000 Bytes');
    expect(bytesToSize(1024, 2)).toEqual('1 KB');
    expect(bytesToSize(10000, 2)).toEqual('9.77 KB');
    expect(bytesToSize(100000, 2)).toEqual('97.66 KB');
    expect(bytesToSize(1000000, 2)).toEqual('976.56 KB');
    expect(bytesToSize(1024000, 2)).toEqual('1000 KB');
    expect(bytesToSize(1048576, 2)).toEqual('1 MB');
    expect(bytesToSize(1073741824, 2)).toEqual('1 GB');
  });
});
