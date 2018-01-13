/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.comuneros;

import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author antonio
 */
public interface IComuneros {


    public List<TuplasComuneros> getListaComuneros() throws SQLException;
    public TuplasComuneros getComuneroByCodigo(String xCodigo) throws SQLException;

}
