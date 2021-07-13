-- create database FROG;
use FROG;

create table usuarios (
nroUser  int not null auto_increment,
email varchar (100) not null,
pass varchar(30) not null,
frogCard varchar(15),
fullName varchar(150) not null,
barrio varchar(30),
fechaReg timestamp default current_timestamp,
primary key (nroUser),
unique (email, frogCard)
);

describe usuarios;
insert into usuarios (nroUser, email, pass, frogCard, fullName, barrio) values (001, 'admin@frog.com', '12345lean', '637693000000000', 'Administrador', 'Cordon');
insert into usuarios (nroUser, email, pass, frogCard, fullName) values (null, 'profes@frog.com', '123456', '637693000000001', 'Profes UTN');
select * from usuarios;

-- convierte todos los nombres en mayusculas
create trigger mayus
before insert on usuarios
for each row
set new.fullName = ucase(new.fullName);

create table tarjetaPuntos(
nroSocio int auto_increment,
puntos int not null,
nroUser int not null,
primary key (nroSocio),
foreign key (nroUser) references usuarios (nroUser)
);

describe tarjetaPuntos;
insert into tarjetaPuntos values (10001, 790, 001);
select * from tarjetaPuntos;

create view usuario as 
select fullName, email, frogCard, puntos
from usuarios inner join tarjetaPuntos
on usuarios.nroUser = tarjetaPuntos.nroUser;

select fullName, frogCard, puntos 
from usuarios 
inner join tarjetaPuntos 
on usuarios.nroUser = tarjetaPuntos.nroUser;

select fullName, puntos 
from FROG.usuarios
right join FROG.tarjetaPuntos
on usuarios.nroUser = tarjetaPuntos.nroUser
where usuarios.fullName like '%Leandro%'; -- si hubiera mas datos insertados, mostraria todos los campos de la tabla tarjetaPuntos.puntos, aunque en la otra tabla no hubiese referencias a esas filas en el select(?

/* -- safe updates 
select @@sql_safe_updates; # 0 deshabilitada
set sql_safe_updates = 1; # 1 habilitada
set sql_safe_updates = 0;

-- drop para tabla/bd
drop database FROG;
drop table usuarios;
drop table tarjetaPuntos;

-- delete para eliminar registros de la tabla
delete from usuarios;
delete from usuarios where barrio = 'Cordon';
*/

-- otros select
select fullName, frogCard  from usuarios;
select frogCard, email from usuarios;
select frogCard, email from usuarios where barrio = 'Cordon';
select fullName from usuarios where barrio = 'Cordon' or 'Palermo';

/* -- update
update usuarios
set frogCard = '637693000000001'
where fullName = 'Administrador'; */