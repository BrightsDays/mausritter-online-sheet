import rollDices from '../../src/helpers/rollDices'

describe('Dice rolls', () => {
  test('return numbers no more than facets', () => {
    let rollsNumber = 100
    let maxResult = 1

    do {
      const newRoll = rollDices(1, 6)

      maxResult = maxResult < newRoll
        ? newRoll
        : maxResult

      rollsNumber = rollsNumber - 1
    } while (rollsNumber > 0)
    
    expect(maxResult).toBeLessThanOrEqual(6)
  })

  test('return only positive values', () => {
    let rollsNumber = 100
    let minResult = 1

    do {
      const newRoll = rollDices(1, 6)

      minResult = minResult > newRoll
        ? newRoll
        : minResult

      rollsNumber = rollsNumber - 1
    } while (rollsNumber > 0)
    
    expect(minResult).toBeGreaterThan(0)
  })

  test('use configured number of dices', () => {
    const arr = Array(100).fill(1).map((n, i) => n + i)

    arr.forEach(round => {
      expect(rollDices(round, 1)).toBe(round)
    })
  })

  test('can return all numbers', () => {
    let rollNumbers = 100
    const arr = [1, 2, 3, 4, 5, 6]

    do {
      arr.splice(arr.indexOf(rollDices(1, 6)), 1)
      rollNumbers = rollNumbers - 1
    } while (rollNumbers > 0)

    expect(arr.length).toBe(0)
  })
})