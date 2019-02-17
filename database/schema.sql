/* make sure to create a database locally: createdb `zillowgallery` */
/* make sure to run schema: psql -d zillowgallery < database/schema.sql   */
DROP TABLE photos;
DROP TABLE houses;

/* we want to create tables: homes, photos */
CREATE TABLE IF NOT EXISTS houses (
    house_id SERIAL PRIMARY KEY,
    name varchar(40)
);

CREATE TABLE IF NOT EXISTS photos (
    photo_id SERIAL PRIMARY KEY,
    img_url varchar(150),
    img_order varchar(50),
    house_id INTEGER,
    FOREIGN KEY (house_id) REFERENCES houses
);