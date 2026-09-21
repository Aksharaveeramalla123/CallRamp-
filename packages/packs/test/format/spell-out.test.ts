import { describe, expect, it } from 'vitest';
import { spellOut } from '../../src/format/spell-out.js';

describe('spellOut', () => {
  it('spells letters using the NATO phonetic alphabet', () => {
    expect(spellOut('ABC')).toBe(
      'A for alpha, B for bravo, C for charlie',
    );
  });

  it('spells numbers as words', () => {
    expect(spellOut('12')).toBe('one, two');
  });

  it('handles a registration', () => {
    expect(spellOut('AB12 CDE')).toBe(
      'A for alpha, B for bravo, one, two, C for charlie, D for delta, E for echo',
    );
  });

  it('is case insensitive', () => {
    expect(spellOut('ab12')).toBe(
      'A for alpha, B for bravo, one, two',
    );
  });
});