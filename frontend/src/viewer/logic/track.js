'use strict'; // code generated by pbf v3.2.0

// Fix ========================================

const Fix = (exports.Fix = {});

Fix.read = function(pbf, end) {
  return pbf.readFields(Fix._readField, { lat: 0, lon: 0, alt: 0, gndAlt: 0, ts: 0 }, end);
};
Fix._readField = function(tag, obj, pbf) {
  if (tag === 0) obj.lat = pbf.readSVarint();
  else if (tag === 1) obj.lon = pbf.readSVarint();
  else if (tag === 2) obj.alt = pbf.readSVarint();
  else if (tag === 3) obj.gndAlt = pbf.readSVarint();
  else if (tag === 4) obj.ts = pbf.readVarint();
};
Fix.write = function(obj, pbf) {
  if (obj.lat) pbf.writeSVarintField(0, obj.lat);
  if (obj.lon) pbf.writeSVarintField(1, obj.lon);
  if (obj.alt) pbf.writeSVarintField(2, obj.alt);
  if (obj.gndAlt) pbf.writeSVarintField(3, obj.gndAlt);
  if (obj.ts) pbf.writeVarintField(4, obj.ts);
};

// Track ========================================

const Track = (exports.Track = {});

Track.read = function(pbf, end) {
  return pbf.readFields(Track._readField, { pilot: '', fixes: [] }, end);
};
Track._readField = function(tag, obj, pbf) {
  if (tag === 0) obj.pilot = pbf.readString();
  else if (tag === 1) obj.fixes.push(Fix.read(pbf, pbf.readVarint() + pbf.pos));
};
Track.write = function(obj, pbf) {
  if (obj.pilot) pbf.writeStringField(0, obj.pilot);
  if (obj.fixes) for (let i = 0; i < obj.fixes.length; i++) pbf.writeMessage(1, Fix.write, obj.fixes[i]);
};

// Tracks ========================================

const Tracks = (exports.Tracks = {});

Tracks.read = function(pbf, end) {
  return pbf.readFields(Tracks._readField, { track: [] }, end);
};
Tracks._readField = function(tag, obj, pbf) {
  if (tag === 0) obj.track.push(Track.read(pbf, pbf.readVarint() + pbf.pos));
};
Tracks.write = function(obj, pbf) {
  if (obj.track) for (let i = 0; i < obj.track.length; i++) pbf.writeMessage(0, Track.write, obj.track[i]);
};
