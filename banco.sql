create table sistema (
  id_sistema serial not null primary key,
  nome_sistema varchar(150) unique not null,
  secret_key varchar not null
);

create table tipo_arquivo (
  id_tipo_arquivo serial not null primary key,
  nome_tipo_arquivo varchar(150) not null
);

create table arquivo (
  id_arquivo serial not null primary key,
  nome_arquivo varchar(150) not null unique,
  formato_arquivo varchar(10) not null,
  tamanho_arquivo float not null,
  caminho_arquivo varchar(150),
  updated_at timestamp default to_timestamp((now())::text, 'yyyy-mm-dd hh24:mi:ss'::text),
  created_at timestamp default to_timestamp((now())::text, 'yyyy-mm-dd hh24:mi:ss'::text),
  id_tipo_arquivo int references tipo_arquivo (id_tipo_arquivo),
  id_sistema int references sistema (id_sistema)
);