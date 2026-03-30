import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import { resolveCount, VisitorCounter } from './Widgets';

// --- In-memory storage mock ---
function makeStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
}

let localStorageMock = makeStorageMock();
let sessionStorageMock = makeStorageMock();

beforeEach(() => {
  localStorageMock = makeStorageMock();
  sessionStorageMock = makeStorageMock();
  vi.stubGlobal('localStorage', localStorageMock);
  vi.stubGlobal('sessionStorage', sessionStorageMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// --- Unit tests for resolveCount ---
describe('resolveCount', () => {
  it('returns 1 for null', () => expect(resolveCount(null)).toBe(1));
  it('returns 1 for empty string', () => expect(resolveCount('')).toBe(1));
  it('returns 1 for non-numeric string', () => expect(resolveCount('abc')).toBe(1));
  it('returns 5 for "5"', () => expect(resolveCount('5')).toBe(5));
  it('returns 0 for "0"', () => expect(resolveCount('0')).toBe(0));
});

// --- Property 4: localStorage round-trip ---
// Feature: visitor-guestbook, Property 4: localStorage round-trip
describe('Property 4: localStorage round-trip', () => {
  it('resolveCount(String(n)) === n for any positive integer', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1_000_000 }), (n) => {
        return resolveCount(String(n)) === n;
      })
    );
  });

  it('non-numeric values always resolve to 1', () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.constant(null), fc.constant(''), fc.string().filter(s => isNaN(parseInt(s, 10)))),
        (raw) => resolveCount(raw) === 1
      )
    );
  });
});

// --- Property 1: rendered count matches stored count ---
// Feature: visitor-guestbook, Property 1: rendered count matches stored count
describe('Property 1: rendered count matches stored count', () => {
  it('displays the stored count when session flag is set', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1_000_000 }), (n) => {
        localStorageMock.setItem('visitorCount', String(n));
        sessionStorageMock.setItem('visited', '1');

        const { container } = render(<VisitorCounter />);
        const text = container.textContent ?? '';
        const result = text.includes(String(n));

        cleanup();
        localStorageMock.clear();
        sessionStorageMock.clear();

        return result;
      })
    );
  });
});

// --- Property 2: first-session increment ---
// Feature: visitor-guestbook, Property 2: first-session increment
describe('Property 2: first-session increment', () => {
  it('increments localStorage count on first mount', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 999_999 }), (n) => {
        localStorageMock.setItem('visitorCount', String(n));
        // no session flag set

        render(<VisitorCounter />);

        const stored = localStorageMock.getItem('visitorCount');
        const result = stored === String(n + 1);

        cleanup();
        localStorageMock.clear();
        sessionStorageMock.clear();

        return result;
      })
    );
  });
});

// --- Property 3: session idempotence ---
// Feature: visitor-guestbook, Property 3: session idempotence
describe('Property 3: session idempotence', () => {
  it('does not increment count on re-mounts within same session', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1_000_000 }),
        fc.integer({ min: 1, max: 10 }),
        (n, remounts) => {
          sessionStorageMock.setItem('visited', '1');
          localStorageMock.setItem('visitorCount', String(n));

          for (let i = 0; i < remounts; i++) {
            render(<VisitorCounter />);
            cleanup();
          }

          const stored = localStorageMock.getItem('visitorCount');
          const result = stored === String(n);

          localStorageMock.clear();
          sessionStorageMock.clear();

          return result;
        }
      )
    );
  });
});

// --- Property 5: widget structural invariant ---
// Feature: visitor-guestbook, Property 5: widget structural invariant
describe('Property 5: widget structural invariant', () => {
  it('root has widget-git-feed and glass classes, with header and content children', () => {
    localStorageMock.setItem('visitorCount', '42');
    sessionStorageMock.setItem('visited', '1');

    const { container } = render(<VisitorCounter />);
    const root = container.firstElementChild as HTMLElement;

    expect(root).not.toBeNull();
    expect(root.classList.contains('widget-git-feed')).toBe(true);
    expect(root.classList.contains('glass')).toBe(true);
    expect(root.querySelector('.widget-header')).not.toBeNull();
    expect(root.querySelector('.widget-content')).not.toBeNull();
  });
});
