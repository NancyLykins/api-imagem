create table sistema (
  id_sistema serial not null primary key,
  nome_sistema varchar(150) unique not null,
  secret_key text
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
  caminho_arquivo varchar(1000),
  publico boolean default true,
  updated_at timestamp default to_timestamp((now())::text, 'yyyy-mm-dd hh24:mi:ss'::text),
  created_at timestamp default to_timestamp((now())::text, 'yyyy-mm-dd hh24:mi:ss'::text),
  id_tipo_arquivo int references tipo_arquivo (id_tipo_arquivo),
  id_sistema int references sistema (id_sistema)
);

//ceom key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIyMzY5NzA3fQ.ULGQlvNUj_1Dqo9x7ttzp5LK6Ea6MuFf5aA9AXjj9ks

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEFycXVpdm8iOjEsImlhdCI6MTcyMjM2OTgwM30.CdNtL_IOwVFtVKund5HB1CsZPDo48PRKsuC2AN7iC5g