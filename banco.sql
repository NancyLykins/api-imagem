create table sistema (
  id_sistema serial not null primary key,
  nome_sistema varchar(150) unique not null,
  secret_key text
);

create table tipo_arquivo (
  id_tipo_arquivo serial not null primary key,
  nome_tipo_arquivo varchar(150) not null // imagem | documento | video | audio
);

create table arquivo (
  id_arquivo serial not null primary key,
  nome_arquivo varchar(150) not null unique,
  formato_arquivo varchar(10) not null,
  tamanho_arquivo float not null,
  caminho_arquivo varchar(150),
  publico boolean default true,
  updated_at timestamp default to_timestamp((now())::text, 'yyyy-mm-dd hh24:mi:ss'::text),
  created_at timestamp default to_timestamp((now())::text, 'yyyy-mm-dd hh24:mi:ss'::text),
  id_tipo_arquivo int references tipo_arquivo (id_tipo_arquivo),
  id_sistema int references sistema (id_sistema)
);

//ceom key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzIyMzYwMzM2fQ.PccqDXFD_j_CGiTdjAcYQBmTghZJqw6HgtE80x1N2oU