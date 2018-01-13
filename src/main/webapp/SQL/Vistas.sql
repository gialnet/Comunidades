--
-- Tetbury Software Services LTD
--
-- SIC 62012 Business and domestic software development
-- antoniocastillo@prodacon.es 23791319-G

create or replace view vw_pendiente_riego (id,estanque,canal_compra, tipo, minutos_saldo, nombre,anejo,ordenriego) 
    as select T.id,T.estanque,T.canal_compra, T.tipo, S.minutos_saldo, concat(C.nombre,' ',C.apellidos),P.anejo,P.ordenriego
 from tickets T, comuneros C, propiedades P, SaldoEstanque S
    WHERE T.pendiente='S'
    AND S.estanque=T.estanque
    AND T.estanque=TO_NUMBER(P.codigo,'99999')
    AND C.codigo=P.comunero;


-- codigo : ID de la propiedad identifica de forma única la finca número secuencia
-- comunero : ID del comunero de la finca, no tiene por que ser el propietario de la misma
-- puede ser el que lo representa

create or replace view vw_propiedades (codigo,comunero,nombre, apellidos,nif,username, movil, email ) 
    as select P.codigo, P.comunero, C.nombre, C.apellidos,C.nif,C.username, C.movil, C.email
 from comuneros C, propiedades P
    WHERE C.codigo=P.comunero;

CREATE OR REPLACE FUNCTION  pendiente_riego_web() 
RETURNS TABLE(
    tfestanque integer,
    tftipo char,
    tfminutos_saldo integer,
    tfnombre varchar
)
AS
$body$
DECLARE

curs4 CURSOR IS SELECT estanque, minutos_saldo
    FROM SaldoEstanque where estanque in (select estanque from tickets where pendiente='S' and canal_compra='web');
    
BEGIN

    FOR cCursor IN curs4 LOOP

        tfestanque:=cCursor.estanque;
        tfminutos_saldo:=cCursor.minutos_saldo;
        
        tftipo:=CheckLLenado(cCursor.estanque);
        
        select concat(C.nombre,' ',C.apellidos) into tfnombre 
            from comuneros C, propiedades P
            where C.codigo=P.comunero 
            AND TO_NUMBER(P.codigo,'99999')=cCursor.estanque;
        return next;

    END LOOP;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;


--
-- Para sacar una tupla única por estanque para los listados y la página del regador
--
CREATE OR REPLACE FUNCTION  ft_pendiente_riego() 
RETURNS TABLE(
    tfestanque integer,
    tftipo char,
    tfminutos_saldo integer,
    tfnombre varchar
)
AS
$body$
DECLARE

curs4 CURSOR IS SELECT estanque, minutos_saldo
    FROM SaldoEstanque where estanque in (select estanque from tickets where pendiente='S');
    
BEGIN

    FOR cCursor IN curs4 LOOP

        tfestanque:=cCursor.estanque;
        tfminutos_saldo:=cCursor.minutos_saldo;
        
        tftipo:=CheckLLenado(cCursor.estanque);
        
        select concat(C.nombre,' ',C.apellidos) into tfnombre 
            from comuneros C, propiedades P
            where C.codigo=P.comunero 
            AND TO_NUMBER(P.codigo,'99999')=cCursor.estanque;
        return next;

    END LOOP;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;

--
-- Buscar llenados
--
CREATE OR REPLACE FUNCTION CheckLLenado(xEstanque in integer)
returns char
AS
$body$
DECLARE
    curs5 CURSOR IS  select tipo from tickets where pendiente='S' and estanque=xEstanque;
    xTipo char:='M';
BEGIN

    FOR cCursor IN curs5 LOOP
        IF cCursor.tipo='L' THEN
            xTipo:='L';
        END IF;
    END LOOP;

return xTipo;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;
