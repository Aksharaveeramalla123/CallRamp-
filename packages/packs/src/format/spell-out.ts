const phoneticAlphabet: Record<string, string> = {
    A: 'alpha',
    B: 'bravo',
    C: 'charlie',
    D: 'delta',
    E: 'echo',
    F: 'foxtrot',
    G: 'golf',
    H: 'hotel',
    I: 'india',
    J: 'juliett',
    K: 'kilo',
    L: 'lima',
    M: 'mike',
    N: 'november',
    O: 'oscar',
    P: 'papa',
    Q: 'quebec',
    R: 'romeo',
    S: 'sierra',
    T: 'tango',
    U: 'uniform',
    V: 'victor',
    W: 'whiskey',
    X: 'x-ray',
    Y: 'yankee',
    Z: 'zulu',
  };
  
  const numbers: Record<string, string> = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
  };
  
  export function spellOut(text: string): string {
    return text
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim()
      .split('')
      .map((character) => {
        if (character === ' ') {
          return null;
        }
  
        if (phoneticAlphabet[character]) {
          return `${character} for ${phoneticAlphabet[character]}`;
        }
  
        if (numbers[character]) {
          return numbers[character];
        }
  
        return character;
      })
      .filter((part): part is string => part !== null)
      .join(', ');
  }