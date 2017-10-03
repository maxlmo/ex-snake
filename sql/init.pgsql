CREATE SEQUENCE public.scores_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE public."Score"
(
  id integer NOT NULL DEFAULT nextval('scores_id_seq'::regclass),
  name character varying,
  score character varying,
  "createdAt" date,
  "updatedAt" date,
  CONSTRAINT scores_pkey PRIMARY KEY (id)
)