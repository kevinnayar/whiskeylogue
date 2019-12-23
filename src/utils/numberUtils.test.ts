import { average, preciseRoundPercentage, bytesToSize } from './numberUtils';

describe('/src/utils/numberUtils', () => {
  test('average', () => {
    expect(average([5, 5])).toEqual(5);
    expect(average([-5, 5])).toEqual(0);
    expect(average([3, 6, 9])).toEqual(6);
    expect(average([433.33, 266.67, 300])).toEqual(333.3333333333333);
  });

  test('preciseRoundPercentage', () => {    
    expect(preciseRoundPercentage(0)).toEqual('00.00');
    expect(preciseRoundPercentage(0.9999)).toEqual('00.99');
    expect(preciseRoundPercentage(1)).toEqual('01.00');
    expect(preciseRoundPercentage(1.5)).toEqual('01.50');
    expect(preciseRoundPercentage(1.55)).toEqual('01.55');
    expect(preciseRoundPercentage(1.5555)).toEqual('01.55');

    expect(preciseRoundPercentage(9.9999)).toEqual('09.99');
    expect(preciseRoundPercentage(10)).toEqual('10.00');
    expect(preciseRoundPercentage(10.1111)).toEqual('10.11');

    expect(preciseRoundPercentage(99.1199)).toEqual('99.11');
    expect(preciseRoundPercentage(99.9999)).toEqual('99.99');
    expect(preciseRoundPercentage(100)).toEqual('100.00');
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
