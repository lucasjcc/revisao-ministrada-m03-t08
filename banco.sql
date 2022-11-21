create table usuarios (
	id serial primary key,
  	nome text not null,
  	email varchar(40) not null unique,
  	senha text not null
);

create table gastos (
	id serial primary key,
  	id_usuario integer not null,
  	valor numeric check(valor > 0) not null,
  	data_gasto date default now(),
  	descricao text,
  	FOREIGN KEY (id_usuario) references usuarios(id)
);
