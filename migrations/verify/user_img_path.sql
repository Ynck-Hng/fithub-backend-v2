-- Verify fithub:user_img_path on pg

BEGIN;

-- XXX Add verifications here.
SELECT "image_path" FROM "user" WHERE false;

ROLLBACK;
