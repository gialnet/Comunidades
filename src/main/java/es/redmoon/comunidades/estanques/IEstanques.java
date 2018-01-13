
package es.redmoon.comunidades.estanques;

import java.sql.SQLException;

/**
 *
 * @author antonio
 */
public interface IEstanques {

public TuplasEstanques getEstanqueByCodigo(String xCodigo) throws SQLException;    
}
