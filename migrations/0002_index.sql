-- NOT APPLIED YET, and deliberately so.
--
-- Every index entry is an extra row write against D1's ~100k/day free tier, so
-- carrying this index from day one would cost a third of the event capacity to
-- speed up a query that runs a couple of times a day from tools/stats.py.
--
-- Apply it when the events table passes roughly 1M rows, at which point a daily
-- stats run starts costing a meaningful slice of the 5M/day read budget and the
-- index begins to pay for itself:
--
--   npx wrangler d1 execute lightphotos_analytics --remote --file migrations/0002_index.sql

CREATE INDEX IF NOT EXISTS idx_events_day_name ON events (day, name);
