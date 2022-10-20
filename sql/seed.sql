-- This is a seed file to give you some data. No guarantee it's been kept up to date.
-- But it's better than nothing till we implement some more robust seeding of fake data for working with

-- Basic Services
-- INSERT INTO "public"."services" ("id", "service_id", "name", "created_at", "updated_at") VALUES
-- ('f68386c2-c8bf-4efb-a5ec-816667d1f963', '69803c90-0608-4156-95f9-7745aa1b1b57', 'Collect Monday', '2022-06-11 01:49:03.111597', '2022-06-11 01:49:03.111597');
-- INSERT INTO "public"."services" ("id", "service_id", "name", "created_at", "updated_at") VALUES
-- ('f23486c2-c8bf-4efb-a5ec-816667d1f963', '69803c90-0608-4156-95f9-7745aa1b1b57', 'FX Rates International', '2022-06-13 01:43:03.111597', '2022-06-12 02:47:03.111597');

INSERT INTO "public"."services" ("id", "name", "description", "versions", "created_at", "updated_at") VALUES
('f23486c2-c8bf-4efb-a5ec-816667d1f963', 'FX Rates International', 'Sample Data', 1, '2022-06-13 01:43:03.111597', '2022-06-12 02:47:03.111597');
