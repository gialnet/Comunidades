
--
-- Generar uan URL de forma aleatoria
--
CREATE OR REPLACE FUNCTION OneTimeURL() returns varchar
AS
$body$
DECLARE

    xURL varchar(128);

BEGIN

xURL:=encode(digest(to_char(ROUND(RANDOM() * 10000), '9999'), 'SHA512'), 'hex');

return xURL;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;



-- ***************************************
-- Alta en el servicio a través de Facebook, Google+, etc.
-- select xIDLibre,xurl_wellcome from AltaServicioGoogle('Antonio','antonio@redmoon.es','es','male','https://plus.google.com/108068397209142441065')
-- ***************************************
CREATE OR REPLACE FUNCTION AltaServicioIDF(
    xNombre in varchar,
    xMail in varchar,
    xPais in varchar,
    xGenero in varchar,
    xPlus in varchar,
    xIDLibre out integer,
    xurl_wellcome out varchar
) 
returns record
AS
$body$
DECLARE

    xDataBaseName varchar(30);
    xPassDataBase varchar(30);
    xIDPais integer:= NULL;

BEGIN


-- Buscar el país

select id into xIDPais from customers_pais where ISO_3166_1=Upper(xPais);

if xIDPais is null then
    raise notice 'País aún no disponible';
    INSERT INTO AltaCustomersNoResueltas (PAIS, MAIL, NOMBRE) VALUES (xPais, xMail, xNombre);
    xIDLibre:= -1;
    return;
end if;

-- Buscar una base de datos disponible para el país del cliente
-- ocupar la base de datos de forma provisional
WITH databaseFree AS (

Update DataBases_Servidor SET Estado = 'IDGoogle'
    WHERE id_cliente = (Select min(id_cliente) from DataBases_Servidor 
    WHERE Estado = 'libre' and id_servidor in (select id from servidores where id_pais = xIDPais))
    returning ID
)
select id into xIDLibre from databaseFree;


-- Asignar el cliente a los datos del solicitante
if xIDLibre is not null then

    -- URL de verificación y bienvenida al sistema.
    -- es una clave provisional que se envia por mail
    -- para comprobar la dirección de correo electrónico del cliente
    --
    xurl_wellcome := xIDLibre || '-' || OneTimeURL();

    Update customers_users SET Nombre = xNombre, Mail = xMail, url_wellcome = xurl_wellcome, 
        genero = xGenero, GooglePlus = xPlus
        WHERE id_customers = xIDLibre;

    --raise notice 'Se ha actualizado %, id %', xNombre, xIDLibre;

    Insert into UsuariosServicios(id_cliente,id_servicio,estado)
                            Values (xIDLibre, 1, 'activo'); -- 1 Cuentas Free

else
    raise notice 'No hay bases de datos disponibles';
    INSERT INTO AltaCustomersNoResueltas (PAIS, MAIL, NOMBRE, CAUSA) VALUES (xPais, xMail, xNombre, 'No hay bases de datos disponibles');
    xIDLibre := -2;
end if;




END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;



--
-- Peticion Alta Servicio vía Google
--

CREATE OR REPLACE FUNCTION PeticionAltaServicioGoogle(xMail in varchar, xNombre in varchar)
returns varchar
AS
$body$
DECLARE

    xurl_wellcome varchar(512);
    xIDLibre integer;

BEGIN


    -- Es un nuevo usuario
    --
    -- Buscar una base de datos disponible
    -- ocupar la base de datos de forma provisional
    WITH databaseFree AS (
    Update DataBases_Servidor SET Estado = 'IDGoogle'
        WHERE id_cliente = (Select min(id_cliente) from DataBases_Servidor WHERE Estado = 'libre')
        returning ID
    )
    select id into xIDLibre from databaseFree;

    -- Asignar el cliente a los datos del solicitante
    if xIDLibre is not null then

        -- URL de verificación y bienvenida al sistema.
        -- es una clave provisional que se envia por mail
        -- para comprobar la dirección de correo electrónico del cliente
        --
        xurl_wellcome := xIDLibre || '-' || OneTimeURL();

        Update customers_users SET url_wellcome = xurl_wellcome 
            WHERE id_customers = xIDLibre;

        --raise notice 'Se ha actualizado %, id %', xNombre, xIDLibre;
    else
        raise notice 'No hay bases de datos disponibles';
        xurl_wellcome := '';
    end if;

return xurl_wellcome;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;




-- **************************************************************
-- Añadir un usuario adicional para clientes tipo Loesis Asesores
-- **************************************************************
-- xCertificado contiene el nombre del certificado ejemplo A1.p12
--
-- ejemplo llamada: 
-- select AddUser('loexisasesores@gmail.com','franjodar@loexisasesore.es','Empleado directivo','24.p12');
-- select AddUser('loexisasesores@gmail.com','laboral@loexisasesores.es','Empleado plantilla','25.p12');
-- select AddUser('loexisasesores@gmail.com','financiero@loexisasesores.es','Empleado plantilla','26.p12');
--
CREATE OR REPLACE FUNCTION AddUser(
    xMailAdmin in varchar,
    xMail in varchar,
    xRol in varchar,
    xCertificado in varchar
) 
returns void
AS
$body$
DECLARE

    xid_customers integer;
    xip varchar(20);
    xdatabasename varchar(30);

BEGIN


-- Averiguar el ID de cliente

SELECT id_customers, ip, databasename INTO xid_customers, xip, xdatabasename 
    FROM customers_users WHERE mail=xMailAdmin;

--
-- Insertar el nuevo cliente, esto supone un cargo en la cuenta del cliente
-- por usuario adicional
--

INSERT INTO customers_users (id_customers, mail,   rol,  ip, databasename, certificado, passdatabase) 
                     values (xid_customers, xMail, xRol, xip, xdatabasename, pg_read_binary_file(xCertificado), 'PassMaquina1' );

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;



-- ***********************************
-- Añadir un usuario adicional externo
-- ***********************************

CREATE OR REPLACE FUNCTION AddUserAdviser(
    xMailAdmin in varchar,
    xMail in varchar,
    xRol in varchar
) 
returns void
AS
$body$
DECLARE

    xid_customers integer;

BEGIN


-- Averiguar el ID de cliente

SELECT id_customers INTO xid_customers FROM customers_users WHERE mail=xMailAdmin;

-- * OJO
-- Insertar el asesor externo, como requisito el asesor tiene que tener una cuenta
-- en el sistema. Asesorar clientes no produce un cargo adicional.
--
INSERT INTO customers_users_adviser (id_customers, mail, rol) values (xid_customers, xMail, xRol);



END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;





-- ***************************************
-- Alta en el servicio a través de Facebook
-- select xIDLibre,xurl_wellcome from AltaServicioIDF('Antonio','antonio@redmoon.es','es','male','https://plus.google.com/108068397209142441065')
-- ***************************************
CREATE OR REPLACE FUNCTION SolicitudAltaServicio(
    xNombre in varchar,
    xMail in varchar,
    xGenero in varchar,
    xPlus in varchar
) 
returns record
AS
$body$
DECLARE

BEGIN


INSERT INTO AltaCustomersNoResueltas (PAIS, MAIL, NOMBRE) VALUES (xPais, xMail, xNombre);


END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;


-- **************************************************************
-- Añadir un usuario adicional 
-- **************************************************************
--
-- ejemplo llamada: 
-- select AddUserSingleMode('admin@prodacon.es','antonio@prodacon.es','{"agente":"000001"}');
-- select AddUserSingleMode('admin@prodacon.es','laboral@prodacon.es','{"comercial":"100215"}');
-- select AddUserSingleMode('admin@prodacon.es','financiero@prodacon.es','{"cobrador":"000006"}');
--
CREATE OR REPLACE FUNCTION AddUserSingleMode(
    xMailAdmin in varchar,
    xMail in varchar,
    xRol in varchar,
    xvisibility_client in varchar,
    xvisibility_polizas in varchar,
    xvisibility_recibos in varchar,
    xvisibility_sinister in varchar
) 
returns void
AS
$body$
DECLARE

    xId_customers integer;
    xIP varchar(20);
    xDatabasename varchar(30);

BEGIN


-- Averiguar el ID de cliente

SELECT id_customers, ip, databasename INTO xId_customers, xIP, xDatabasename 
    FROM customers_users WHERE mail=xMailAdmin;

IF xId_customers IS NULL THEN
    raise notice 'No existe el mail indicado : %',xMailAdmin;
ELSE

    INSERT INTO customers_users (id_customers, mail,   rol,  ip, databasename,
            visibility_client, visibility_polizas, visibility_recibos, visibility_sinister) 
                     values (xid_customers, xMail, xRol, xIP, xDatabasename,
            Xvisibility_client::json, Xvisibility_polizas::json, Xvisibility_recibos::json, Xvisibility_sinister::json);
END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;




-- **************************************************************
-- Añadir un usuario adicional para clientes tipo Loesis Asesores
-- **************************************************************
-- xCertificado contiene el nombre del certificado ejemplo A1.p12
--
-- ejemplo llamada: 
-- select addusershared('antonio.gialnet@gmail.com','antonio.castillo','administrador','{}','{}','{}','{}')
-- 
-- 
--
CREATE OR REPLACE FUNCTION AddUserShared(
    xMailAdmin in varchar,
    xMail in varchar,
    xRol in varchar,
    Xvisibility_client in varchar,
    Xvisibility_polizas in varchar,
    Xvisibility_recibos in varchar,
    Xvisibility_sinister in varchar
) 
returns void
AS
$body$
DECLARE

    xId_customers integer;
    xIP varchar(20);
    xDatabasename varchar(30);

BEGIN


-- Averiguar el ID de cliente

SELECT id_customers, ip, databasename INTO xId_customers, xIP, xDatabasename 
    FROM customers_users WHERE mail=xMailAdmin;

IF xId_customers IS NULL THEN
    raise notice 'No existe el mail indicado : %',xMailAdmin;
ELSE

    INSERT INTO customers_users (id_customers, mail,   rol,  ip, databasename,
            visibility_client, visibility_polizas, visibility_recibos, visibility_sinister) 
                     values (xid_customers, xMail, xRol, xIP, xDatabasename,
            Xvisibility_client::json, Xvisibility_polizas::json, Xvisibility_recibos::json, Xvisibility_sinister::json);
END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;
