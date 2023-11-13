create table
  public.terrenos (
    id bigint generated by default as identity,
    dirección text not null,
    tamaño (ha) bigint not null,
    límites jsonb not null,
    created_at timestamp with time zone not null default now(),
    tipo_terreno text not null,
    constraint terrenos_pkey primary key (id),
    constraint terrenos_id_key unique (id)
  ) tablespace pg_default;

create table
  public.fincas (
    id_terreno bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    tipo_finca text null,
    constraint fincas_pkey primary key (id_terreno),
    constraint fincas_id_terreno_fkey foreign key (id_terreno) references terrenos (id) on update cascade on delete cascade
  ) tablespace pg_default;

create table
  public.latifundios (
    id_terreno bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    constraint latifundios_pkey primary key (id_terreno),
    constraint latifundios_id_terreno_fkey foreign key (id_terreno) references terrenos (id)
  ) tablespace pg_default;

create table
  public.parcelas (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    id_terreno bigint not null,
    dirección text not null,
    límites jsonb not null,
    número bigint not null,
    constraint parcela_pkey primary key (id),
    constraint parcela_id_parcela_key unique (id),
    constraint parcelas_id_terreno_fkey foreign key (id_terreno) references terrenos (id) on update cascade on delete cascade
  ) tablespace pg_default;