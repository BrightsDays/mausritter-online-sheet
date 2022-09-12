export default (dices: number, facets: number, remove?: string): number => {
    let result = [];

    for (let i = 0; i < dices; i++) {
        const roll = Math.floor( Math.random() * facets ) + 1
        result.push(roll)
    }

    if (remove === 'min') result.sort().shift()
    if (remove === 'max') result.sort().pop()
    
    return result.reduce((a, b) => a + b, 0)
}
