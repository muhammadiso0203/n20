create table if not exists category(
    category_id serial primary key,
    name varchar(55)
    
);

create table if not exists product (
    product_id serial primary key,
    name varchar(55),
    price decimal(8,2),
    category_id int references category(category_id)
    on update cascade
    on delete cascade
);