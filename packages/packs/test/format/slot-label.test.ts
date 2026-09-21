import { describe, expect, it } from 'vitest';
import { formatSlotLabel } from '../../src/format/slot-label.js';

const options = {
  locale: 'en-GB' as const,
  timeZone: 'Europe/London',
};

describe('formatSlotLabel', () => {
  it('formats a slot later today', () => {
    expect(
      formatSlotLabel(
        '2027-03-04T14:00:00Z',
        '2027-03-04T09:00:00Z',
        options,
      ),
    ).toBe('this afternoon at 2');
  });

  it('formats tomorrow', () => {
    expect(
      formatSlotLabel(
        '2027-03-05T10:30:00Z',
        '2027-03-04T09:00:00Z',
        options,
      ),
    ).toBe('tomorrow at half 11');
  });

  it('formats a later weekday', () => {
    expect(
      formatSlotLabel(
        '2027-03-07T09:00:00Z',
        '2027-03-04T09:00:00Z',
        options,
      ),
    ).toBe('Sunday morning at 9');
  });

  it('formats a date more than a week away', () => {
    expect(
      formatSlotLabel(
        '2027-03-18T11:00:00Z',
        '2027-03-04T09:00:00Z',
        options,
      ),
    ).toBe('Thursday the 18th at 11');
  });

  it('formats midnight', () => {
    expect(
      formatSlotLabel(
        '2027-03-05T00:00:00Z',
        '2027-03-04T09:00:00Z',
        options,
      ),
    ).toBe('tomorrow at 12');
  });

  it('formats an exact hour', () => {
    expect(
      formatSlotLabel(
        '2027-03-04T09:00:00Z',
        '2027-03-04T08:00:00Z',
        options,
      ),
    ).toBe('this morning at 9');
  });

  it('formats a slot ten minutes from now', () => {
    expect(
      formatSlotLabel(
        '2027-03-04T09:10:00Z',
        '2027-03-04T09:00:00Z',
        options,
      ),
    ).toBe('this morning at 9:10');
  });
});