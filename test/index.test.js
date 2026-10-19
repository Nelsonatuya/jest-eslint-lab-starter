const { afterEach, beforeEach, expect, test } = require('@jest/globals');
const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T03:04:05.000Z'));
});

afterEach(() => {
    jest.useRealTimers();
});

test('capitalizeWords capitalizes the first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
});

test('capitalizeWords handles an empty string', () => {
    expect(capitalizeWords('')).toBe('');
});

test('capitalizeWords capitalizes words separated by special characters', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
});

test('capitalizeWords handles a single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
});

test('filterActiveUsers returns only users marked active', () => {
    const users = [
        { id: 1, name: 'Alice', active: true },
        { id: 2, name: 'Bob', active: false },
        { id: 3, name: 'Charlie', active: true },
    ];

    expect(filterActiveUsers(users)).toEqual([users[0], users[2]]);
});

test('filterActiveUsers handles an empty array', () => {
    expect(filterActiveUsers([])).toEqual([]);
});

test('logAction includes the action, username, and timestamp', () => {
    expect(logAction('login', 'Alice')).toBe(
        'User Alice performed login at 2024-01-02T03:04:05.000Z',
    );
});

test('logAction uses fallback labels for missing inputs', () => {
    expect(logAction(undefined, 'Alice')).toBe(
        'User Alice performed unknown action at 2024-01-02T03:04:05.000Z',
    );
    expect(logAction('login')).toBe(
        'User unknown user performed login at 2024-01-02T03:04:05.000Z',
    );
});

test('logAction uses fallback labels for empty strings', () => {
    expect(logAction('', '')).toBe(
        'User unknown user performed unknown action at 2024-01-02T03:04:05.000Z',
    );
});
