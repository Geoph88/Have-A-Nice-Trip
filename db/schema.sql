CREATE DATABASE travel_app;
\c travel_app

CREATE TABLE trips(
    id SERIAL PRIMARY KEY,
    name TEXT,
    start_date TEXT,
    end_date TEXT
);

CREATE TABLE itineraries(
    id SERIAL PRIMARY KEY,
    start_location TEXT,
    end_location TEXT,
    start_date TEXT,
    end_date TEXT,
    start_time TEXT,
    end_time TEXT,
    activities TEXT, 
    notes TEXT, 
    checklist TEXT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
);

SELECT users.id AS user_id, itineraries.start_location, itineraries.end_location, itineraries.start_date, itineraries.end_date, itineraries.start_time, itineraries.end_time, itineraries.activities, itineraries.notes, itineraries.checklist FROM itineraries INNER JOIN users ON users.id = itineraries.id;

SELECT users.id AS user_id, trips.name FROM trips INNER JOIN users ON users.id = trips.id;

SELECT trips.id AS trips_id, trips.name, itineraries.start_location, itineraries.end_location, itineraries.start_date, itineraries.end_date, itineraries.start_time, itineraries.end_time, itineraries.activities, itineraries.notes, itineraries.checklist FROM itineraries INNER JOIN trips ON trips.id = itineraries.id;