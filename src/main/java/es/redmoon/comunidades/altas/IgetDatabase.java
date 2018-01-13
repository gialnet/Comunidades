
package es.redmoon.comunidades.altas;

import java.sql.SQLException;

/**
 *
 * @author antonio
 */
public interface IgetDatabase {

    public boolean getDatabaseForLogin(String xUser, String xPass) throws SQLException;
    public void LogSesion(String IP, String HostName, String URI, String mail) throws SQLException;
    public String getIp();
    public String getDatabasename();
}
