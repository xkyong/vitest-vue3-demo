import { describe, expect, it } from 'vitest'
import { sum, factorial } from '../src/common/utils/math'

/**
 * 1.math.test.ts就是一个测试脚本，测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块
 *   通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.[jt]s（表示测试）或者.spec.[jt]s（表示规格）。
 *   比如，math.ts的测试脚本名字就是math.test.ts。
 * 2.describe块称为"测试套件"（test suite），表示一组相关的测试。
 *   它是一个函数，第一个参数是测试套件的名称（"math calculator"），第二个参数是一个实际执行的函数
 * 3.it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。
 *   它也是一个函数，第一个参数是测试用例的名称（"sum"），第二个参数是一个实际执行的函数
 *   vitest中，it 函数是 test 函数的别名
 * 4.所有的测试用例（it块）都应该含有一句或多句的断言（expect）。它是编写测试用例的关键
 * 5.基本上，expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等
 * 6.如果expect断言不成立，就会抛出一个错误。事实上，只要不抛出错误，测试用例就算通过。
*/
describe('math calculator', () => {
  it('sum', () => {
    expect(sum(10)).toBe(55)
  })

  it('factorial', () => {
    expect(factorial(2)).toBe(2)

    expect(factorial(5)).toBe(120)

    // error case
    // expect(factorial(6)).toBe(120)
  })
})
