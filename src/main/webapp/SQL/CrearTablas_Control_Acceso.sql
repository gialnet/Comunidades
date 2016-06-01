--
-- Crear tablas para la base de datos de configuración
-- 
-- 31 may 2016
--
/*

owner communities

createdb owner-communities-sysconfig;
psql
alter role ownercommunities with SUPERUSER PASSWORD 'Granada{2016}';
create user ownercommunities with SUPERUSER password 'Granada{2016}';
psql -d owner-communities-sysconfig -U postgres;

psql -d owner-communities-sysconfig -U ownercommunities

CREATE EXTENSION pgcrypto;
CREATE EXTENSION tsearch2;

*/


/*

Tabla de regantes

createdb regantes;
create user regantes_prodacon with SUPERUSER password 'acaPCB-13';

*/

CREATE TABLE AutoridadCA
(
    id                  serial NOT NULL,
    descripcion         varchar(90),
    mode_access         varchar(10) default 'single',  -- singel una sola base de datos shared modo compartido multiples bases de datos
    databasename        varchar(50) default 'jdbc/myOwnerCommu',
    raizCA              bytea,
    primary key (id)
);

INSERT INTO AutoridadCA (descripcion) VALUES ('Cadena de certificados de confianza de la CA Tetbury');
/
--
-- Los distintos tipos de cleintes en función de su residencia y consideraciones
-- especiales tributarias
--
CREATE TABLE customers_pais
(
    id              serial      NOT NULL,
    descripcion     varchar(50),
    ISO_3166_1      varchar(2),
    cuenta_cliente  varchar(5),
    cuenta_ventas   varchar(5),
    primary key (id)
);


INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('ESPAÑA',     'ES','43001' ,'70001');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('ARGENTINA',  'AR','43002' ,'70002');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('BOLIVIA',    'BO','43003' ,'70003');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('CHILE',      'CL','43004' ,'70004');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('COLOMBIA',   'CO','43005' ,'70005');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('COSTA RICA', 'CR','43006' ,'70006');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('CUBA',       'CU','43007' ,'70007');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('REPUBLICA DOMINICANA', 'DO','43008' ,'70008');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('ECUADOR',    'EC','43009' ,'70009');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('EL SALVADOR', 'SV','43010' ,'70010');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('GUINEA ECUATORIAL', 'GQ','43011' ,'70011');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('HONDURAS',   'HN','43012' ,'70012');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('MEXICO',     'MX','43013' ,'70013');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('NICARAGUA',  'NI','43014' ,'70014');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('PANAMA',     'PA','43015' ,'70015');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('PARAGUAY',   'PY','43016' ,'70016');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('PERU',       'PE','43017' ,'70017');
INSERT INTO customers_pais (DESCRIPCION,ISO_3166_1,cuenta_cliente,cuenta_ventas) VALUES ('VENEZUELA',  'VE','43018' ,'70018');
/

--
-- Servidores
--

CREATE TABLE Servidores
(
    id                  serial NOT NULL,
    id_pais             integer references customers_pais(id),
    fecha               date default CURRENT_DATE,
    IP                  varchar(20),
    ServerName          varchar(50),
    RAM                 numeric(4,2),
    HD                  numeric(8,2),
    Proveedor_Cloud     varchar(50),
    NumeroDB            integer,
    primary key (id)
);
/

--
-- clientes de nuestro hosting
--
CREATE TABLE customers_hosting
(
    id                       serial      NOT NULL,
    id_customers_pais        integer references customers_pais(id),
    id_servidor              integer references Servidores(id),
   primary key (id)
);
/

--
-- Usuarios autorizados por el administrador de un cliente
--
CREATE TABLE customers_users
(
    id                      serial NOT NULL,
    mail                    varchar(90),
    id_customers            integer references customers_hosting(id),
    genero                  varchar(20), -- male female
    GooglePlus              text,   -- dirección de la cuenta Google + https://plus.google.com/108068397209142441065
    telefono_Twilio         varchar(25),
    rol                     varchar(50), -- Administrador, Socio, Empleado directivo, Empleado plantilla,Asesor Fiscal,Asesor Laboral, Asesor Juridico
    nif                     varchar(20),
    nombre                  varchar(60),
    direccion               varchar(90), -- Avenida Europa, 21
    objeto                  varchar(40), -- bloque A 2ºD
    poblacion               varchar(90), -- 18690 Almuñécar Granada
    movil                   varchar(20),
    saldo                   numeric(5),
    estado                  varchar(50),
    passwd                  varchar(128),
    IP                      varchar(20),
    certdatabase            varchar(30),
    databasename            varchar(30),
    passdatabase            varchar(128),
    url_wellcome            varchar(512),
    url_site                varchar(512),
    api_token               text,
    api_key                 text,
    descargo_token          varchar(1) default 'N',
    certificado             bytea,
   primary key (id)
);

create index customers_users_customers on customers_users(id_customers);
create index customers_users_amil on customers_users(mail);
create index customers_users_site on customers_users(url_site);
create index customers_databasename on customers_users(databasename);
create index customers_certdatabase on customers_users(certdatabase);
/

--
-- Usuarios externos autorizados por el administrador de un cliente
--
CREATE TABLE customers_users_adviser
(
    id_customers            integer references customers_hosting(id),
    telefono_Twilio         varchar(25), -- telefono de la plataforma
    mail                    varchar(90), -- donde se encuentra el certificado del ASESOR en la tabla de customers_users
    rol                     varchar(50), -- Asesor Fiscal,Asesor Laboral, Asesor Juridico
   primary key (id_customers,mail)
);
/

--
-- Bases de datos que hay en un servidor
--
CREATE TABLE DataBases_Servidor
(
    id                  serial NOT NULL,
    id_servidor         integer references Servidores(id),
    id_cliente          integer references customers_hosting(id),
    fecha               date default CURRENT_DATE,
    Estado              varchar(10) default 'libre',
    primary key (id)
);
/

--
-- Registrar las peticiones de alta
--
CREATE TABLE AltaCustomersNoResueltas
(
    id                      serial      NOT NULL,
    GooglePlus              text,   -- dirección de la cuenta Google + https://plus.google.com/108068397209142441065
    pais                    varchar(5),
    mail                    varchar(90),
    nombre                  varchar(60),
    estado                  varchar(50) default 'pendiente',
    causa                   varchar(50) default 'No se encontro su email',
   primary key (id)
);
/

--
-- Logs de inicio de sesion
--

CREATE TABLE LogSesion
(
    id                  serial      NOT NULL,
    Fecha               TIMESTAMP default now(),
    ip                  varchar(20),
    hostname            varchar(90),
    mail                varchar(90),
    URI                 text,
    primary key (id)
);
/

