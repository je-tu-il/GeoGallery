import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseCaptureDate, readCoordinates } from '../src/utils/exif.ts';

test('reads a leap-day photo timestamp as local time', () => {
  assert.equal(parseCaptureDate('2024:02:29 12:35:10')?.getTime(), new Date(2024, 1, 29, 12, 35, 10).getTime());
});

test('impossible or unreadable EXIF dates cannot enter date filters', () => {
  assert.equal(parseCaptureDate('2023:02:29 12:35:10'), null);
  assert.equal(parseCaptureDate('2024:01:01 24:00:00'), null);
  assert.equal(parseCaptureDate('unknown'), null);
});

test('coordinates on the equator and prime meridian are retained', () => {
  assert.deepEqual(readCoordinates({ Latitude: 0, Longitude: 0 }), { lat: 0, lng: 0 });
});

test('invalid or incomplete coordinate pairs are excluded from the map', () => {
  for (const input of [{ Latitude: 91, Longitude: 4 }, { Latitude: 3 }, { Latitude: 3, Longitude: Infinity }]) {
    assert.deepEqual(readCoordinates(input), { lat: null, lng: null });
  }
});
