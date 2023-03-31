create database Netflix;
use Netflix;
create table Movies (
id_movie int primary key auto_increment not null,
title varchar(45) not null,
gender varchar(45) not null,
image varchar(1000) not null,
category varchar(45) not null,
year date
);

create table Users (
id_user int primary key auto_increment not null,
user varchar(45) not null,
pasword varchar(45) not null,
name varchar(45) not null,
email varchar(45) not null,
plan_details varchar(45) not null
);

create table Actors (
id_actor int primary key auto_increment not null,
name varchar(45) not null,
lastName varchar(45) not null,
contry varchar(45) not null,
birthday date
);

insert into Movies (title, gender, image, category, year) values ("Pulp Fiction", "crimen", "https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg", "Top 10", "1994"),
("La vita é bella", "comedia", "https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg", "Top 10", "1996"), 
("Forrest Gump", "comedia", "https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg", "Top 10", "1994"); 

insert into Users (user, pasword, name, email, plan_details) values ("Laura_dev", "laura", "Laura", "laura@gmail.com", "standard"), ("Maria_dev", "Maria", "Maria", "maria@gmail.com", "standard"), 
("Esther_dev", "Esther", "Esther", "esther@gmail.com", "standard");

insert into actors (name, lastName, contry, birthday) values ("John", "Travolta", "Estados Unidos", "1954-02-18"), ("Roberto", "Benigni", "Italia", "1952-10-27"),
 ("Tom", "Hanks", "Estados Unidos", "1956-06-09");
 
 use netflix;
 
 SELECT * FROM movies;
 
 SELECT title, gender FROM movies
 WHERE year >= 1990;
 
 SELECT * FROM movies
 WHERE category = "Top 10";
 
 UPDATE movies
 SET year = 1997
 where id_movie = 2;
 
 SELECT * FROM actors;
 
 SELECT  name FROM actors
 WHERE birthday >= 1950-01-01 OR birthday <= 1960-12-31;
 
 SELECT name, lastName FROM actors
 WHERE contry = "estados unidos";
 
 SELECT * FROM users
 WHERE plan_details = "standard";
 
 DELETE FROM users
 WHERE name LIKE "m%";
  
SELECT * FROM users;

create table rel_movies_users (
fkmovies int,
foreign key (fkmovies) REFERENCES Movies (id_movie),
fkusers int,
foreign key (fkusers) REFERENCES Users (id_user),
id_movie_user int primary key auto_increment not null
);

insert into rel_movies_users (fkusers, fkmovies) values (1,1),(1,2),(3,2);
SELECT * FROM rel_movies_users; 

create table rel_movies_actors (
fkmovies int,
fkactors int,
foreign key (fkmovies) REFERENCES Movies (id_movie),
foreign key (fkactors) REFERENCES Actors (id_actor),
id_movies_actors int primary key auto_increment not null
);
 
insert into rel_movies_actors (fkmovies, fkactors) values (1,1), (2,2), (3,3);
SELECT * FROM rel_movies_actors;