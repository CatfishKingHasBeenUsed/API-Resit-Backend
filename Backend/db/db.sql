create database film_company;

create table user (
    username varchar(100) primary key,
    password varchar(100)
);

create table staff (
    staff_name varchar(100) primary key,
    password varchar(100)
);

create table application (
    id int auto_increment primary key,
    username varchar(100),
    film_name varchar(100),
    photo varchar(1024),
    status varchar(20),
    foreign key (username) references user(username)
);

insert into staff values
('staff1', '123456'),
('staff2', '123456');
