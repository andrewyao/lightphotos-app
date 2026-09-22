-- Event store for the first-party analytics pipeline (functions/api/e.js).
--
-- One row per event rather than pre-aggregated counters: raw rows mean a new
-- breakdown is a new SELECT instead of a schema migration, and aggregating on
-- write would save nothing on the quota that actually binds here (row writes).
--
-- Deliberately no secondary indexes. D1 bills every index entry as its own row
-- write, so each index would cut the ~100k writes/day free tier by a third for
-- no benefit at this size -- a full scan over a small table is cheap, and reads
-- are a separate 5M/day budget that tools/stats.py barely touches. Add one when
-- the table passes ~1M rows; see 0002_index.sql.
--
-- Nothing identifying is stored. There is deliberately no ip or user_agent
-- column: both are inputs to visitor_hash and are discarded after hashing.

CREATE TABLE IF NOT EXISTS events (
  id            INTEGER PRIMARY KEY,   -- rowid alias, so no extra index write
  ts            INTEGER NOT NULL,      -- unix seconds, UTC
  day           TEXT    NOT NULL,      -- 'YYYY-MM-DD' UTC, so grouping never parses a date
  name          TEXT    NOT NULL,      -- allowlisted event name
  path          TEXT,                  -- page path only, query string stripped
  visitor_hash  TEXT    NOT NULL,      -- salted daily hash; unrelated across days by design
  referrer_host TEXT,                  -- host only, never a full URL, never our own host
  country       TEXT,                  -- two-letter code from request.cf
  props         TEXT                   -- JSON object, allowlisted keys, capped
);

-- One random salt per UTC day, generated on first use and deleted after two
-- days. This is what makes an old visitor_hash permanently unreversible: once
-- the day's salt is gone, nobody -- including whoever holds this database --
-- can recompute it from a guessed IP. A long-lived secret key would leave every
-- past day recomputable forever.
CREATE TABLE IF NOT EXISTS salts (
  day  TEXT PRIMARY KEY,
  salt TEXT NOT NULL
);
