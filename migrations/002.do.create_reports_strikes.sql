CREATE TABLE report_strikes (
  report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE NOT NULL,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE NOT NULL,
  unique(report_id, member_id)
);