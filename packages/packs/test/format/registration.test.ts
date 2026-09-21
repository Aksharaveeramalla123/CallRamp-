import { describe, expect, it } from 'vitest';
import { formatRegistration } from '../../src/format/registration.js';

describe('formatRegistration', () => {
  it('groups a UK plate the way it is written', () => {
    expect(formatRegistration('ab12cde')).toBe('AB12 CDE');
  });

  it('copes with spaces already in it', () => {
    expect(formatRegistration('AB 12 CDE')).toBe('AB12 CDE');
  });

  it('normalises lowercase input', () => {
    expect(formatRegistration('ab 12 cde')).toBe('AB12 CDE');
  });

  it('removes multiple spaces', () => {
    expect(formatRegistration(' AB   12   CDE ')).toBe('AB12 CDE');
  });
});