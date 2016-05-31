
--
-- Añadir un nuevo servidor compartido con múltiples bases de datos para
-- múltiples corredurías
-- Se tiene que añadir tantos usuarios nuevos como el número de bases de datos
-- que permite el nuevo servidor
--
-- select AddNewServerShared('37.153.108.75','www.poliza-net.es',1,30,30,1,'Telefonica',1);
-- select AddNewServerShared('37.153.109.206','www.myempresa.eu',2,50,30,1,'Joyent',1);
-- select AddNewServerShared('81.45.22.58','www.loexisasesores.es',1,30,1,35,'Amazon AWS',1);
--
CREATE OR REPLACE FUNCTION AddNewServerShared(
    xIP in varchar,
    xServerName in varchar,
    xRAM in numeric,
    xHD in numeric,
    xNumDB in integer,
    xSemilla in integer,
    xProveedor_Cloud in varchar,
    xPais in integer
) 
returns void
AS
$body$
DECLARE

    xDataBaseName varchar(30);
    xPassDataBase varchar(30);
    xIDCustomers integer;
    xIDServidores integer;
    xCertificado varchar(15);

BEGIN

    -- Insertar el nuevo servidor en la base de datos de servidores

    WITH Servidores_ins AS (
        INSERT INTO Servidores (IP,ServerName,RAM, HD, Proveedor_Cloud, NumeroDB, id_pais) 
        VALUES (xIP, xServerName, xRAM, xHD, xProveedor_Cloud, xNumDB, xPais)
        returning ID
    )
    select id into xIDServidores from Servidores_ins;


-- Añadir tantos clientes(corredurías) como número de bases de datos


FOR i IN 1..xNumDB LOOP

    raise notice 'valor de la semilla : %',xSemilla;
    xDataBaseName := 'jdbc/myOwnerCommu' || upper(lpad(to_hex(xSemilla),2,'0'));
    xPassDataBase := 'PassMaquina1';
    xCertificado := upper(lpad(to_hex(xSemilla),2,'0')); -- OJO para cuando pasemos de dos digitos
    

    -- Inserta un cliente, una correduría
    WITH customers_ins AS (
        INSERT INTO customers ( id_customers_pais, id_servidor, id_tipocuenta )
        VALUES ( xPais, xIDServidores, 1)
        returning ID
    )
    select id into xIDCustomers from customers_ins;

    -- AÑADIR el usuario administrador
    INSERT INTO customers_users (id_customers, databasename, passdatabase, IP, certificado, rol) 
                        VALUES (xIDCustomers, xDataBaseName, xPassDataBase, xIP, pg_read_binary_file(xCertificado||'.p12'), 'Administrador');

    -- inserta una base de datos disponible

    INSERT INTO DataBases_Servidor (id_servidor,id_cliente) VALUES (xIDServidores, xIDCustomers);

    xSemilla:=xSemilla+1;

END LOOP;


END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;



--
-- Añadir un nuevo servidor en modo de Correduría única, es decir no compartido
-- Una única base de datos para una sola correduría de seguros
--
-- 3 May 2016
--
--
-- select AddNewServerSingle('37.153.108.75','www.poliza-net.es','antonio.gialnet@gmail.com','693065280','00');
--

CREATE OR REPLACE FUNCTION AddNewServerSingle(
    xIP in varchar,
    xServerName in varchar,
    xMailAdmin in varchar,
    xMovil in varchar,
    xDBNumber in varchar
) 
returns void
AS
$body$
DECLARE

    xIDCustomers integer;
    xIDServidores integer;
    xCertificado varchar(15);

BEGIN

    -- Insertar el nuevo servidor en la base de datos de servidores

    WITH Servidores_ins AS (
        INSERT INTO Servidores (IP,ServerName,id_pais) 
        VALUES (xIP, xServerName, 1)
        returning ID
    )
    select id into xIDServidores from Servidores_ins;


    -- Inserta un cliente
    WITH customers_ins AS (
        INSERT INTO customers_hosting ( id_customers_pais, id_servidor)
        VALUES ( 1, xIDServidores)
        returning ID
    )
    select id into xIDCustomers from customers_ins;

    -- AÑADIR el usuario administrador
    INSERT INTO customers_users (id_customers, databasename, passdatabase, IP, rol, movil, mail) 
           VALUES (xIDCustomers, 'jdbc/myOwnerCommu' || xDBNumber , 'PassMaquina1', xIP, 'Administrador',xMovil,xMailAdmin);

    -- inserta una base de datos disponible

    INSERT INTO DataBases_Servidor (id_servidor,id_cliente) VALUES (xIDServidores, xIDCustomers);



END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;


--
-- Cambiar los datos del servidor
--
CREATE OR REPLACE FUNCTION UpdateServerSingle(
    xIP in varchar,
    xServerName in varchar,
    xMailAdmin in varchar,
    xMovil in varchar
) 
returns void
AS
$body$
DECLARE

    xIDCustomers integer;
    xIDServidores integer;
    xCertificado varchar(15);

BEGIN


    -- actualizar en servidores
    update Servidores SET IP=xIP,ServerName=xServerName where id=1;

    -- Actualizar los datos del administrador
    update customers_users  SET IP=xIP, movil=xMovil, mail=xMailAdmin 
           where id=1;

  



END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;