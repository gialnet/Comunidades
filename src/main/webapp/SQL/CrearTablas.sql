
--
-- Tetbury Software Services LTD
--
-- SIC 62012 Business and domestic software development

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

--
-- Tickets de riego
--
CREATE TABLE Tickets (
    id                  serial not null,
    estanque            integer,
    nticket             integer,
    canal_compra        varchar(20) default 'papel',
    minutos_comprados   integer,
    fecha               timestamp default now(),
    GeoPos              point,
    observaciones       text,
    primary key(id)
);
create index Tickets_nticket on Tickets(nticket);
create index Tickets_estanque on Tickets(estanque);

/*
-- Carga de datos para las pruebas
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-01-01','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-01-08','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-01-15','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-01-29','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-02-05','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-02-12','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-02-19','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-02-26','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-03-04','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-03-11','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-03-18','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-03-25','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-04-01','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-04-08','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-04-15','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-04-22','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-05-06','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-05-13','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-05-20','YYYY-MM-DD') );
Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-05-27','YYYY-MM-DD') );

Insert into Tickets (estanque, nticket, minutos_comprados, fecha) values ('06600', 1, 30, to_timestamp('2016-06-03','YYYY-MM-DD') );

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

        IF xEstanque IS NULL THEN
            INSERT INTO SaldoEstanque (estanque,minutos_comprados,minutos_saldo) 
        VALUES (NEW.estanque, NEW.minutos_comprados, NEW.minutos_comprados);
        
        ELSE
            UPDATE SaldoEstanque SET minutos_comprados = minutos_comprados + NEW.minutos_comprados,
                minutos_saldo = minutos_saldo + NEW.minutos_comprados
                WHERE estanque = NEW.estanque;
        END IF;
        

       RETURN NEW;
  END;
$trg_New_Ticket$ LANGUAGE 'plpgsql';
/

CREATE TRIGGER trg_New_Ticket
BEFORE INSERT ON Tickets
    FOR EACH ROW EXECUTE PROCEDURE trg_New_Ticket();

--
-- Saldo en minutos de un estanque
--
CREATE TABLE SaldoEstanque (
    estanque            integer not null,
    minutos_comprados   integer,
    minutos_saldo       integer,
    primary key(estanque)
);


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
BEGIN

        -- Comprobar que existe el saldo del estanque
        SELECT minutos_saldo into xSaldo FROM SaldoEstanque WHERE estanque = NEW.estanque;

        IF xSaldo < NEW.minutos_servidos THEN

            -- Aviso de incidencia, el saldo será negativo
            xDebe := NEW.minutos_servidos - xSaldo;

            INSERT INTO AvisosEstanque (estanque, alerta) 
            VALUES (NEW.estanque, concat('Saldo insuficiente debe ', to_char(xDebe,'999')) );

        END IF;


        UPDATE SaldoEstanque SET minutos_saldo = minutos_saldo - NEW.minutos_servidos
                WHERE estanque = NEW.estanque;
        
        

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