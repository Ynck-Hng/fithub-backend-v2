-- Revert fithub:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE comment_article_user,
comment_article,
liked_article_user,
article,
category_article,
activity_user,
activity,
category_activity,
--bought_product_user,
--comment_product_user,
--comment_product,
product,
category_product,
company,
challenge_user,
challenge,
"user";

DROP TYPE product_availability,
user_profile_visibility,
user_gender,
completed_challenge;

COMMIT;
