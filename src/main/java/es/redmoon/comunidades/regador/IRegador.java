
package es.redmoon.comunidades.regador;

import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author antonio
 */
public interface IRegador {

public List<TuplasVw_pendiente_riego> getListaRiegosPendientes(int NumPage, int SizePage) throws SQLException;
public List<TuplasVw_pendiente_riego> getRiegosPendientesByPool() throws SQLException;
}
