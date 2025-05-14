create table if not exists users(
    user_id serial primary key,
    name varchar(100),
    email varchar(100) unique
);

create table if not exists articles(
    article_id serial primary key,
    user_id int references users(user_id) on delete cascade,
    title varchar(255),
    content text,
    created_at timestamp default current_timestamp
);

create table if not exists device_logs(
    device_log_id serial primary key,
    user_id int references users(user_id) on delete cascade,
    client varchar(100),
    os varchar(50),
    device_logs varchar(50),
    row_user_agent text,
    created_at timestamp default current_timestamp
);