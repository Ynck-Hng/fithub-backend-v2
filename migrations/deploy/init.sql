-- Deploy fithub:init to pg

BEGIN;

-- XXX Add DDLs here.

CREATE TYPE IF NOT EXISTS user_gender AS ENUM ('femme', 'homme', 'non-spécifié');
CREATE TYPE IF NOT EXISTS user_profile_visibility AS ENUM ('publique', 'privé');

CREATE TABLE IF NOT EXISTS "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    nickname TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT DEFAULT NULL UNIQUE,
    login_streak INTEGER DEFAULT 0,
    email TEXT NOT NULL UNIQUE,
    gender user_gender DEFAULT 'non-spécifié',
    xp INT DEFAULT 0,
    profile_visibility user_profile_visibility DEFAULT 'publique',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- challenge --

CREATE TABLE IF NOT EXISTS challenge (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TYPE IF NOT EXISTS completed_challenge AS ENUM ('yes', 'no');

CREATE TABLE IF NOT EXISTS challenge_user (
    user_id INT REFERENCES "user"(id) NOT NULL,
    challenge_id INT REFERENCES challenge(id) ON DELETE CASCADE NOT NULL,
    completed completed_challenge DEFAULT 'no',
    date_assigned TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM-DD'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END challenge --

-- Product section --

CREATE TYPE IF NOT EXISTS product_availability AS ENUM ('disponible', 'indisponible', 'bientôt');

CREATE TABLE IF NOT EXISTS company (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS category_product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    availability product_availability DEFAULT 'disponible',
    category_product_id INT REFERENCES category_product(id) ON DELETE CASCADE NOT NULL,
    company_id INT REFERENCES company(id) ON DELETE CASCADE NOT NULL,
    delivery_company_id INT REFERENCES company(id) NOT NULL, -- Default ??? Us maybe ?
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

/*CREATE TABLE IF NOT EXISTS comment_product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    product_id INT REFERENCES product(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS comment_product_user (
    user_id INT REFERENCES "user"(id) NOT NULL ON DELETE CASCADE,
    comment_product_id INT REFERENCES comment_product(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS bought_product_user (
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

CREATE TABLE IF NOT EXISTS category_activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    label TEXT NOT NULL UNIQUE,
    met FLOAT NOT NULL,
    category_activity_id INT REFERENCES category_activity(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS activity_user (
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
    activity_id INT REFERENCES activity(id) ON DELETE CASCADE NOT NULL,
    calories INT NOT NULL,
    duration INT NOT NULL CHECK (duration > 1),
    date_assigned TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM-DD');
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END activity section --

-- article section --

CREATE TABLE IF NOT EXISTS category_article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    upvote INT DEFAULT 0,
    category_article_id INT REFERENCES category_article(id) ON DELETE CASCADE NOT NULL,
    user_id INT REFERENCES "user"(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS liked_article_user (
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
    article_id INT REFERENCES article(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS comment_article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    article_id INT REFERENCES article(id) ON DELETE CASCADE NOT NULL,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END article --

COMMIT;
