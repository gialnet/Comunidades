
--
-- Tetbury Software Services LTD
--
-- SIC 62012 Business and domestic software development
/*
createdb regantes -E UTF8 -l es_ES.UTF-8
psql -d regantes -U secure
create user regantes_prodacon with SUPERUSER password 'acaPCB-13';


bin/asadmin add-resources glassfish/domains/domain1/config/Regantes.xml


*/
--
-- Naturaleza jurídica
--
CREATE TABLE datosper_legal
(
    id                  serial NOT NULL,
    forma_juridica      varchar(60),
    primary key (forma_juridica)
);


INSERT INTO datosper_legal (forma_juridica) VALUES ('SA');
INSERT INTO datosper_legal (forma_juridica) VALUES ('SL');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Sociedades Colectivas');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Sociedades Comanditarias');
INSERT INTO datosper_legal (forma_juridica) VALUES ('COMUNIDAD-BIENES');
INSERT INTO datosper_legal (forma_juridica) VALUES ('COOPERATIVA');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Asociaciones');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Comunidades de propietarios');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Sociedades civiles');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Corporaciones Locales');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Organismos públicos');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Congregaciones e instituciones religiosas');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Órganos Administración Estado y Comunidades Autónomas');
INSERT INTO datosper_legal (forma_juridica) VALUES ('UTE');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Otros tipos no definidos');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Entidades extranjeras');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Empresas Extranjeras no residentes en España');
INSERT INTO datosper_legal (forma_juridica) VALUES ('NIE Extrangeros no residentes');
INSERT INTO datosper_legal (forma_juridica) VALUES ('NIF Extranjeros que no tienen NIE');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Españoles residentes en el extranjero sin DNI');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Españoles menores de 14 años');
INSERT INTO datosper_legal (forma_juridica) VALUES ('Extranjeros Orden INT/2058/2008');
INSERT INTO datosper_legal (forma_juridica) VALUES ('RETA'); -- AUTONOMOS



CREATE TABLE datosper
(
    id                  serial NOT NULL,
    tipo_de_cuenta      integer default 1,
    forma_juridica      varchar(60) references datosper_legal(forma_juridica),
    IBAN                varchar(34), -- los dos primeros digitos indican el país ES codigo para españa
    BIC                 varchar(11), -- puede ser de 8 o de 11 posiciones
    CNAE                varchar(25), -- ejemplo: CNAE J6311: Proceso de datos, hosting y actividades relacionadas o SIC que es el código internacional
    fecha_constitucion  date, -- fecha de constitución de la sociedad
    tipo_actividad      varchar(25) default 'empresarial', -- empresarial o profesional
    otras_reglas        json,
    EntidadPresenta     varchar(4), -- para las domiciliaciones
    OficinaPresenta     varchar(4), -- para las domiciliaciones
    Sufijo              varchar(3)  default '000', -- para las domiciliaciones
    periodicidad_er     integer default 12, -- periodicidad de la emisión de recibos 12 uno por mes,6 cada 2 meses,4 cade tres meses, 2 cada semestre
    EmiteRemesas        varchar(2) default 'NO',
    nif                 char(20),
    nombre              varchar(60),
    direccion           varchar(90), -- Avenida Europa, 21
    objeto              varchar(40), -- bloque A 2ºD
    poblacion           varchar(90), -- 18690 Almuñécar Granada
    Pais_ISO3166        varchar(2) default 'ES',
    movil               varchar(10),
    fax                 varchar(10),
    mail                varchar(90),
    url_web             varchar(250),
    url_tsa             text
);


insert into datosper (forma_juridica, nombre, mail,url_web,url_tsa) 
values ('Comunidades de propietarios','Pozo San Isidro','info@pozosanisidro.es','http://www.pozosanisidro.es','http://tsa.belgium.be/connect');

CREATE TABLE propiedades
(
   codigo       varchar(5)    NOT NULL,
   descripcion  varchar(50)   DEFAULT ''::character varying NOT NULL,
   comunero     varchar(5)    NOT NULL,
   propietario  varchar(5)    DEFAULT NULL::character varying,
   comunidad    varchar(3)    NOT NULL,
   unidades     varchar(50)   DEFAULT ''::character varying NOT NULL,
   horas        varchar(50)   DEFAULT ''::character varying NOT NULL,
   anejo        varchar(50)   DEFAULT ''::character varying NOT NULL,
   ordenriego   varchar(50)   DEFAULT ''::character varying NOT NULL
);

ALTER TABLE public.propiedades OWNER TO polizanet;

ALTER TABLE propiedades
   ADD CONSTRAINT propiedades_pkey
   PRIMARY KEY (codigo);

ALTER TABLE propiedades
  ADD CONSTRAINT propiedades_comuneros_fkey FOREIGN KEY (comunero)
  REFERENCES comuneros (codigo)
  ON UPDATE NO ACTION
  ON DELETE CASCADE;

ALTER TABLE propiedades
  ADD CONSTRAINT propiedades_comuneros_propietario_fkey FOREIGN KEY (propietario)
  REFERENCES comuneros (codigo)
  ON UPDATE NO ACTION
  ON DELETE CASCADE;

ALTER TABLE propiedades
  ADD CONSTRAINT propiedades_comunidades_fkey FOREIGN KEY (comunidad)
  REFERENCES comunidades (codigo)
  ON UPDATE NO ACTION
  ON DELETE CASCADE;

GRANT INSERT, REFERENCES, TRIGGER, UPDATE, DELETE, SELECT ON propiedades TO polizanet;


--
-- Tabla de datos de la bomba de agua
--
CREATE TABLE Motor (
    id                  serial not null,
    fecha_buy           timestamp default now(), -- fecha de compra
    GeoPos              point,
    observaciones       text,
    primary key(id)
);

INSERT INTO Motor (observaciones) values ('Motor de x caballos, ...');

--
-- Detalle de actividad de la bomba, inicios y paradas
--
CREATE TABLE UsoMotor (
    id_motor            integer references motor(id),
    fecha_start         timestamp default now(), -- fecha y hora de arranque
    fecha_stop          timestamp default now()  -- fecha y hora de parada
);

CREATE TABLE LogUsoMotor (
    id                  serial not null,
    id_motor            integer references motor(id),
    fecha               timestamp default now(), -- fecha y hora de arranque
    observaciones       text,
    primary key(id)
);

--
-- Tickets de riego
--
CREATE TABLE Tickets (
    id                  serial not null,
    estanque            integer,
    nticket             integer,
    canal_compra        varchar(20) default 'papel',
    tipo                char(1) default 'M', -- M minutos L llenado
    minutos_comprados   integer,
    minutos_servidos    integer DEFAULT 0,
    pendiente           char(1) default 'S', -- pendiente S/N
    fecha_buy           timestamp default now(), -- fecha de compra
    fecha_riego         timestamp, -- fecha de riego
    GeoPos              point,
    observaciones       text,
    primary key(id)
);
create index Tickets_nticket on Tickets(nticket);
create index Tickets_estanque on Tickets(estanque);
create index Tickets_pendiente on Tickets(pendiente);

/*
-- Carga de datos para las pruebas
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06600', 1, 30, to_timestamp('2016-01-01','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06600', 15, 30, to_timestamp('2016-01-08','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06601', 166, 60, to_timestamp('2016-01-15','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06602', 400, 480, to_timestamp('2016-01-29','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06603', 601, 30, to_timestamp('2016-02-05','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06604', 720, 40, to_timestamp('2016-02-12','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06605', 1558, 75, to_timestamp('2016-02-19','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06606', 2009, 30, to_timestamp('2016-02-26','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06607', 3001, 30, to_timestamp('2016-03-04','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06608', 3151, 30, to_timestamp('2016-03-11','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06609', 3541, 180, to_timestamp('2016-03-18','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06610', 36078, 120, to_timestamp('2016-03-25','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06611', 4000, 120, to_timestamp('2016-04-01','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06612', 4100, 180, to_timestamp('2016-04-08','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06613', 4225, 30, to_timestamp('2016-04-15','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06614', 4555, 255, to_timestamp('2016-04-22','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06615', 5000, 30, to_timestamp('2016-05-06','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06615', 5689, 45, to_timestamp('2016-05-13','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06616', 5789, 20, to_timestamp('2016-05-20','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06617', 5900, 120, to_timestamp('2016-05-27','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha_buy) values ('06618', 6890, 60, to_timestamp('2016-06-03','YYYY-MM-DD') );

*/


--
-- Actualizar la tabla de saldo del estanque
--

CREATE OR REPLACE FUNCTION trg_New_Ticket() RETURNS 
    TRIGGER AS $trg_New_Ticket$
DECLARE
    xEstanque integer;
BEGIN

        -- Comprobar que existe el saldo del estanque
        SELECT estanque into xEstanque FROM SaldoEstanque WHERE estanque = NEW.estanque;

        -- SI EL TIPO DE TIECKET ES POR MINUTOS SE INCREMENTA EL SALDO DEL ESTANQUE
        -- RAISE NOTICE 'TIPO=%', NEW.tipo;
        IF NEW.tipo = 'M' THEN
            IF xEstanque IS NULL THEN
                INSERT INTO SaldoEstanque (estanque,minutos_comprados,minutos_saldo) 
            VALUES (NEW.estanque, NEW.minutos_comprados, NEW.minutos_comprados);

            ELSE
                UPDATE SaldoEstanque SET minutos_comprados = minutos_comprados + NEW.minutos_comprados,
                    minutos_saldo = minutos_saldo + NEW.minutos_comprados
                    WHERE estanque = NEW.estanque;
            END IF;
        END IF;
        

       RETURN NEW;
  END;
$trg_New_Ticket$ LANGUAGE 'plpgsql';
/

CREATE TRIGGER trg_New_Ticket
BEFORE INSERT ON Tickets
    FOR EACH ROW EXECUTE PROCEDURE trg_New_Ticket();


--
-- Cuando ya no queda saldo ponemos que ya no esta pendiente
--
CREATE OR REPLACE FUNCTION trg_Update_Ticket() RETURNS 
    TRIGGER AS $trg_Update_Ticket$
DECLARE
    xEstanque integer;
BEGIN

        -- SI EL TIPO DE TIECKET ES POR MINUTOS SE INCREMENTA EL SALDO DEL ESTANQUE
        -- RAISE NOTICE 'TIPO=%', NEW.tipo;
        IF NEW.minutos_servidos >= NEW.minutos_comprados THEN
            NEW.pendiente='N';
        END IF;
        

       RETURN NEW;
  END;
$trg_Update_Ticket$ LANGUAGE 'plpgsql';
/


CREATE TRIGGER trg_Update_Ticket
BEFORE UPDATE ON Tickets
    FOR EACH ROW EXECUTE PROCEDURE trg_Update_Ticket();

--
-- Saldo en minutos de un estanque
--
CREATE TABLE SaldoEstanque (
    estanque            integer not null,
    minutos_comprados   integer,
    minutos_saldo       integer,
    primary key(estanque)
);


-- Añadir una tupla al saldo 
INSERT INTO SaldoEstanque SELECT to_number(codigo,'99999'),0,0 from propiedades;

/*

INSERT INTO ServiciosEstanque (estanque, minutos_servidos, fecha) VALUES ('06600', 30, to_timestamp('2016-01-04','YYYY-MM-DD'));
INSERT INTO ServiciosEstanque (estanque, minutos_servidos, fecha) VALUES ('06600', 30, to_timestamp('2016-01-09','YYYY-MM-DD'));
INSERT INTO ServiciosEstanque (estanque, minutos_servidos, fecha) VALUES ('06600', 30, to_timestamp('2016-01-16','YYYY-MM-DD'));
INSERT INTO ServiciosEstanque (estanque, minutos_servidos, fecha) VALUES ('06600', 30, to_timestamp('2016-01-30','YYYY-MM-DD'));

*/



--
-- Movimientos llenado agua
--
CREATE TABLE ServiciosEstanque (
    estanque            integer,
    id_ticket           integer,
    tipo                char(1) default 'M', -- M minutos L llenado
    minutos_servidos    integer,
    fecha               timestamp default now()
);
create index ServiciosEstanque_estanque on ServiciosEstanque(estanque);

--
-- Cuando se inserta un nuevo servicio prestado se descuenta del saldo
--
CREATE OR REPLACE FUNCTION trg_New_Servicio() RETURNS 
    TRIGGER AS $trg_New_Servicio$
DECLARE
    xSaldo integer;
    xDebe integer;
    xTipo char;
    xId integer;
BEGIN

        -- Buscar el ultimo ticket pendiente de servir

        select min(id) into xId from tickets where estanque=NEW.estanque AND pendiente='S';

        UPDATE tickets SET minutos_servidos=minutos_servidos+NEW.minutos_servidos 
                where id=xId;

        new.id_ticket=xId;

        -- averiguar si es llenado o por minutos
        SELECT tipo INTO xTipo FROM tickets WHERE nticket = xId;

        -- Comprobar que existe el saldo del estanque
        SELECT minutos_saldo into xSaldo FROM SaldoEstanque WHERE estanque = NEW.estanque;

        IF xTipo='M' THEN
            IF xSaldo < NEW.minutos_servidos THEN

                -- Aviso de incidencia, el saldo será negativo
                xDebe := NEW.minutos_servidos - xSaldo;

                INSERT INTO AvisosEstanque (estanque, alerta) 
                VALUES (NEW.estanque, concat('Saldo insuficiente debe ', to_char(xDebe,'999')) );

            END IF;
            UPDATE SaldoEstanque SET minutos_saldo = minutos_saldo - NEW.minutos_servidos
                WHERE estanque = NEW.estanque;
        ELSE
            UPDATE SaldoEstanque SET minutos_comprados = minutos_comprados - NEW.minutos_servidos
                WHERE estanque = NEW.estanque;
        END IF;
        
       RETURN NEW;
  END;
$trg_New_Servicio$ LANGUAGE 'plpgsql';
/

CREATE TRIGGER trg_New_Servicio
BEFORE INSERT ON ServiciosEstanque
    FOR EACH ROW EXECUTE PROCEDURE trg_New_Servicio();

--
-- tabla de alertas del servicio
--
CREATE TABLE AvisosEstanque (
    id          serial not null,
    estanque    integer,
    fecha       timestamp default now(),
    alerta      text,
    primary key(id)
);
create index AvisosEstanque_estanque on AvisosEstanque(estanque);

--
-- 
--
CREATE TABLE comuneros
(
   codigo     varchar(5)      NOT NULL,
   username   varchar(50)     DEFAULT ''::character varying NOT NULL,
   password   varchar(50)     DEFAULT ''::character varying NOT NULL,
   nif        varchar(50)     DEFAULT ''::character varying NOT NULL,
   nombre     varchar(50)     DEFAULT ''::character varying NOT NULL,
   apellidos  varchar(50)     DEFAULT ''::character varying NOT NULL,
   domicilio  varchar(50)     DEFAULT ''::character varying NOT NULL,
   cp         varchar(5)      DEFAULT ''::character varying NOT NULL,
   localidad  varchar(50)     DEFAULT ''::character varying NOT NULL,
   provincia  varchar(50)     DEFAULT ''::character varying NOT NULL,
   telefono   varchar(50)     DEFAULT ''::character varying NOT NULL,
   movil      varchar(50)     DEFAULT ''::character varying NOT NULL,
   email      varchar(250)    DEFAULT ''::character varying NOT NULL,
   primary key(codigo)
);

INSERT INTO comuneros (codigo,username) VALUES ('staff','regador');


create or replace view vw_pendiente_riego (id,estanque,canal_compra, tipo, minutos_saldo, nombre,anejo,ordenriego) 
    as select T.id,T.estanque,T.canal_compra, T.tipo, S.minutos_saldo, concat(C.nombre,' ',C.apellidos),P.anejo,P.ordenriego
 from tickets T, comuneros C, propiedades P, SaldoEstanque S
    WHERE T.pendiente='S'
    AND S.estanque=T.estanque
    AND T.estanque=TO_NUMBER(P.codigo,'99999')
    AND C.codigo=P.comunero;