create schema if not exists ovi;

create table ovi."Accounts"
(
    id       integer generated always as identity
        constraint id
            primary key,
    username varchar                not null,
    password varchar                not null,
    type     varchar default 'user' not null
);

insert into ovi."Accounts" (username, password, type)
values ('admin1234', 'admin1234', 'ADMIN')