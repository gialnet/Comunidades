
package es.redmoon.comunidades.regador;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import es.redmoon.comunidades.sesion.PoolConn;
import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import javax.naming.NamingException;

/**
 *
 * @author antonio
 */
public class ListadoRiegos extends PoolConn {

    private final String version;
    private static final Font FUENTE_CUERPO = FontFactory.getFont(FontFactory.HELVETICA, 9, Font.NORMAL, Color.BLACK);
    
    private PdfWriter writer;
    private Document document;
    private ByteArrayOutputStream PDFenMemoria = new ByteArrayOutputStream();
    private PdfPTable table;
    private PdfPCell cell;
    private Paragraph p;

    public ListadoRiegos(String DataBase) throws SQLException, NamingException {
        super(DataBase);
        this.version=DataBase;
    }

    /**
     * Devuelve un listado de todas las pólizas
     * @param xYear
     * @param xTrimestre
     * @param xNIF
     * @param xNombre
     * @return
     * @throws DocumentException
     * @throws SQLException 
     */
    public byte[] makeListado(String sentencia) throws DocumentException, SQLException
    {
        
        CreatePDF();
        
        HeaderTable();
        
        CuerpoTable(sentencia);

        Grabar();
        return PDFenMemoria.toByteArray();
    }

    /**
     * Crear un documento PDF con los datos del informe
     * @throws DocumentException 
     */
    
    private void CreatePDF() throws DocumentException
    {
        
        this.document = new Document(PageSize.A4);
        
        writer = PdfWriter.getInstance(this.document, PDFenMemoria);
        
        this.document.open();
        
    }
    
    /**
     * Cabecera de la tabla
     * @param xYear
     * @param xTrimestre
     * @param xNIF
     * @param xNombre 
     */
    private void HeaderTable()
    {
        Calendar javaCalendar = null;
        String currentDate = "";

        javaCalendar = Calendar.getInstance();

        currentDate = javaCalendar.get(Calendar.YEAR) +
                "/" + (javaCalendar.get(Calendar.MONTH) + 1) + 
                "/" + javaCalendar.get(Calendar.DATE);
        
        float[] widths1 = { 1f, 1f, 1f, 3f};
        
        this.table = new PdfPTable(widths1);
        
        table.setWidthPercentage(100);
        table.setHeaderRows(3);
        
        String titulo="Listado de Riegos";
        
        PdfPCell h1 = new PdfPCell(new Paragraph(titulo));
        
        h1.setGrayFill(0.7f);
        h1.setColspan(10);
        h1.setHorizontalAlignment(Element.ALIGN_CENTER);
        
        table.addCell(h1);
        
        PdfPCell h2 = new PdfPCell(new Paragraph(" A fecha "+currentDate));
        h2.setGrayFill(0.7f);
        h2.setColspan(10);
        h2.setHorizontalAlignment(Element.ALIGN_LEFT);
        
        table.addCell(h2);

        PdfPCell h21 = new PdfPCell(new Paragraph("Estanque"));
        PdfPCell h22 = new PdfPCell(new Paragraph("Tipo"));
        PdfPCell h23 = new PdfPCell(new Paragraph("Minutos"));
        PdfPCell h24 = new PdfPCell(new Paragraph("Comunero"));
        /*
        PdfPCell h25 = new PdfPCell(new Paragraph("Tomador"));
        PdfPCell h26 = new PdfPCell(new Paragraph("Riesgo Asegurado"));
        PdfPCell h27 = new PdfPCell(new Paragraph("Efecto"));
        PdfPCell h28 = new PdfPCell(new Paragraph("Venci."));
        PdfPCell h29 = new PdfPCell(new Paragraph("gestor"));
        PdfPCell h20 = new PdfPCell(new Paragraph("comer."));
        */ 


        h21.setGrayFill(0.7f);
        h22.setGrayFill(0.7f);
        h23.setGrayFill(0.7f);
        h24.setGrayFill(0.7f);
        /*
        h25.setGrayFill(0.7f);
        h26.setGrayFill(0.7f);
        h26.setHorizontalAlignment(Element.ALIGN_RIGHT);
        h27.setGrayFill(0.7f);
        h27.setHorizontalAlignment(Element.ALIGN_RIGHT);
        h28.setGrayFill(0.7f);
        h28.setHorizontalAlignment(Element.ALIGN_RIGHT);
        h29.setGrayFill(0.7f);
        h29.setHorizontalAlignment(Element.ALIGN_RIGHT);
        h20.setGrayFill(0.7f);
        h20.setHorizontalAlignment(Element.ALIGN_RIGHT);
        */

        table.addCell(h21);
        table.addCell(h22);
        table.addCell(h23);
        table.addCell(h24);
        /*
        table.addCell(h25);
        table.addCell(h26);
        table.addCell(h27);
        table.addCell(h28);
        table.addCell(h29);
        table.addCell(h20);
        */
    }
    
    private void CuerpoTable(String sentencia) throws SQLException
    {
        
        Connection conn= PGconectar();
        PreparedStatement st = conn.prepareStatement(sentencia);
        ResultSet rs = st.executeQuery();
        String Tipo="";
        String Tiempo="";
        
        int j=1;
        
        while (rs.next())
        {
            
            p = new Paragraph(rs.getString("tfestanque"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_RIGHT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            if (rs.getString("tftipo").equalsIgnoreCase("M"))
                Tipo="Minutos";
            else
                Tipo="Llenar";
            
            p = new Paragraph(Tipo,FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            
            if (rs.getString("tftipo").equalsIgnoreCase("M"))
                Tiempo=rs.getString("tfminutos_saldo");
            else
                Tiempo="X";
            
            p = new Paragraph(Tiempo,FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);

            p = new Paragraph(rs.getString("tfnombre"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);

            /*
            p = new Paragraph(rs.getString("nombre"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            p = new Paragraph(rs.getString("riesgo_asegurado"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            p = new Paragraph(rs.getString("efecto"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            p = new Paragraph(rs.getString("vencimiento"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            p = new Paragraph(rs.getString("gestor"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);
            
            p = new Paragraph(rs.getString("comercial"),FUENTE_CUERPO);
            p.setAlignment(Element.ALIGN_LEFT);
            cell = new PdfPCell();
            cell.addElement(p);
            table.addCell(cell);*/
            
        j++;
        }
        
        st.close();
        conn.close();
    }
        
    /**
     * 
     * @throws DocumentException 
     */
    private void Grabar() throws DocumentException
    {
        document.add(table);
        document.close();
        writer.close();
    }
}
