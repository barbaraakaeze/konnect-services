CREATE table services (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  versions INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT pkey_services PRIMARY KEY ( id )
);
