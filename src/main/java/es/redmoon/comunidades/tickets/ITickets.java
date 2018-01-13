
package es.redmoon.comunidades.tickets;

import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author antonio
 */
public interface ITickets {

public List<TuplasTickets> getListaTickets(int NumPage, int SizePage, String xEstanque) throws SQLException;
public void CompraLleno(String xEstanque) throws SQLException;
public void CompraMinutos(String xEstanque, String xMinutos) throws SQLException;
public int CuentaTickects(String estanque, String desde, String hasta) throws SQLException;

}
