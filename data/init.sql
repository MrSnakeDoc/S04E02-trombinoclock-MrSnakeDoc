begin
  
CREATE TABLE promo(
    id integer,
    name character varying(128),
    github_organization character varying(255),
    PRIMARY KEY(id)
)

  CREATE TABLE student(
    id integer,
    first_name character varying(128),
    last_name character varying(128),
    github_username character varying(255),
    profile_picture_url character varying(255),
    promo_id integer,
    PRIMARY KEY(id)
)

commit;