-- Deploy fithub:init to pg

BEGIN;

-- XXX Add DDLs here.

CREATE TYPE user_gender AS ENUM ('femme', 'homme', 'non-spécifié');
CREATE TYPE user_profile_visibility AS ENUM ('publique', 'privé');

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    nickname TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    gender user_gender DEFAULT 'non-spécifié',
    xp INT DEFAULT 0,
    profile_visibility user_profile_visibility DEFAULT 'publique',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- challenge --

CREATE TABLE challenge (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TYPE completed_challenge AS ENUM ('yes', 'no');

CREATE TABLE challenge_user (
    user_id INT REFERENCES "user"(id) NOT NULL,
    challenge_id INT REFERENCES challenge(id) NOT NULL ON DELETE CASCADE,
    completed completed_challenge DEFAULT 'no',
    date_assigned DATE DEFAULT (TO_DATE(TO_CHAR(NOW()), 'YYYY-MM-DD')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END challenge --

-- Product section --

CREATE TYPE product_availability AS ENUM ('disponible', 'indisponible', 'bientôt');

CREATE TABLE company (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE category_product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    availability product_availability DEFAULT 'disponible',
    category_product_id INT REFERENCES category_product(id) NOT NULL ON DELETE CASCADE,
    company_id INT REFERENCES company(id) NOT NULL ON DELETE CASCADE,
    delivery_company_id INT REFERENCES company(id) NOT NULL, -- Default ??? Us maybe ?
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

/*CREATE TABLE comment_product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    product_id INT REFERENCES product(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE comment_product_user (
    user_id INT REFERENCES "user"(id) NOT NULL ON DELETE CASCADE,
    comment_product_id INT REFERENCES comment_product(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE bought_product_user (
    user_id INT REFERENCES "user"(id) NOT NULL ON DELETE CASCADE,
    product_id INT REFERENCES product(id) NOT NULL ON DELETE CASCADE,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    phone TEXT NOT NULL,
    price FLOAT,
    quantity FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);
*/
-- END product section --

-- activity section --

CREATE TABLE category_activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    label TEXT NOT NULL UNIQUE,
    met FLOAT NOT NULL,
    category_activity_id INT REFERENCES category_activity(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE activity_user (
    user_id INT REFERENCES "user"(id) NOT NULL,
    activity_id INT REFERENCES activity(id) NOT NULL,
    calories INT NOT NULL,
    duration INT NOT NULL CHECK (duration > 1),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END activity section --

-- article section --

CREATE TABLE category_article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    upvote INT DEFAULT 0,
    category_article_id INT REFERENCES category_article(id) NOT NULL,
    user_id INT REFERENCES "user"(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE liked_article_user (
    user_id INT REFERENCES "user"(id) NOT NULL ON DELETE CASCADE,
    article_id INT REFERENCES article(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE comment_article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    article_id INT REFERENCES article(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE comment_article_user (
    comment_article_id INT REFERENCES comment_article(id) NOT NULL,
    user_id INT REFERENCES "user"(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END article --

COMMIT;
