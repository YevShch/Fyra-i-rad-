import { describe, it, expect } from 'vitest';
import fs from 'fs';
import Player from '../classes/Player.js'; // Import the Player class

describe('Player', () => {

  // Test if the Player class initializes with name and color properties
  it('should have name and color properties', () => {
    const player = new Player('Alice', 'red');
    expect(player.name).toBe('Alice');
    expect(player.color).toBe('red');
  });

  // Test invalid name: symbols
  it('should throw an error if the name contains symbols', () => {
    expect(() => new Player('@lice', 'red')).toThrow('Invalid name');
  });

  // Test invalid name: numbers
  it('should throw an error if the name contains numbers', () => {
    expect(() => new Player('Alice123', 'red')).toThrow('Invalid name');
  });

  // Test invalid name: empty string
  it('should throw an error if the name is an empty string', () => {
    expect(() => new Player('', 'red')).toThrow('Invalid name');
  });

  // Test invalid name: object
  it('should throw an error if the name is an object', () => {
    expect(() => new Player({}, 'red')).toThrow('Invalid name');
  });
});
