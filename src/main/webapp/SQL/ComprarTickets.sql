
--
-- Comprar un ticket de riego
--
CREATE OR REPLACE FUNCTION ComprarTicketLlenado(
    xEstanque in integer
) 
returns integer
AS
$body$
DECLARE
    xID integer;
BEGIN

    -- Insertar el nuevo ticket
    WITH BuyTickect_ins AS (
    Insert into Tickets (estanque, canal_compra, tipo) 
    values (xEstanque, 'web', 'L')
    RETURNING ID
    )
    select id into xID from BuyTickect_ins;

    return xID;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;

--
--
--
CREATE OR REPLACE FUNCTION ComprarTicketMinutos(
    xEstanque in integer,
    xMinutos in integer
) 
returns integer
AS
$body$
DECLARE

    xID integer;
BEGIN

    -- Insertar el nuevo ticket
    WITH BuyTickect_ins AS (
    Insert into Tickets (estanque, canal_compra, minutos_comprados) 
    values (xEstanque, 'web', xMinutos)
    RETURNING ID
    )
    select id into xID from BuyTickect_ins;

    return xID;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;
