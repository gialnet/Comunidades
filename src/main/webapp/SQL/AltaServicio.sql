

-- **************************************************************
-- Añadir un usuario adicional 
-- **************************************************************
--
-- ejemplo llamada: 
-- select AddUser('06600','a1','comunero');
-- select AddUser('staff','passwdyo','regador');
-- 
--
CREATE OR REPLACE FUNCTION AddUser(
    xUser in varchar,
    xPass in varchar,
    xRol in varchar
) 
returns void
AS
$body$
DECLARE

    xId_customers integer:=1; -- apunta a la maquina que hace de servidor
    xIP varchar(20):='37.153.108.75';
    xDatabasename varchar(30):='jdbc/myOwnerCommu00';

BEGIN



    INSERT INTO customers_users (id_customers, mail,passwd,rol,ip,databasename) 
                     values (xid_customers, xUser,xPass, xRol, xIP, xDatabasename);

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;

