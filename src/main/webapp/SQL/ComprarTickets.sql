
--
-- Comprar un ticket de riego
--
CREATE OR REPLACE FUNCTION ComprarTicketLlenado(
    xEstanque in integer
) 
returns void
AS
$body$
DECLARE

BEGIN

    -- Insertar el nuevo ticket
    Insert into Tickets (estanque, canal_compra, tipo) 
    values (xEstanque, 'web', 'L');

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
returns void
AS
$body$
DECLARE


BEGIN

    -- Insertar el nuevo ticket
    Insert into Tickets (estanque, canal_compra, minutos_comprados) 
    values (xEstanque, 'web', xMinutos);

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
SECURITY INVOKER
COST 100;
