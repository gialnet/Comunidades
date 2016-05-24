

package es.redmoon.comunidades.datosapp;

/**
 *
 * @author antonio
 */
public class BeanDatosPer {
    private String Nif;
    private String Nombre;
    private String Direccion;
    private String Objeto;
    private String Poblacion;
    private String Movil;
    private String fax;
    private String Mail;
    private String url_web;
    private String url_tsa;
    private String fecha_constitucion;
    private String forma_juridica;
    
    private String CNAE;
    private String IBAN;
    private String BIC;
    private int tipo_de_cuenta; // 1 free, 2 premiun, 3 enterprise, 4 advisor
    
    private String EntidadPresenta; //     varchar(4), -- para las domiciliaciones
    private String OficinaPresenta; //     varchar(4), -- para las domiciliaciones
    private String Sufijo; //             varchar(3), -- para las domiciliaciones
    private int periodicidad_er;
    private String EmiteRemesas;
    
    
    public BeanDatosPer() {}
    
    public String getNif() {
        return Nif;
    }

    public void setNif(String Nif) {
        this.Nif = Nif;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String Direccion) {
        this.Direccion = Direccion;
    }

    public String getObjeto() {
        return Objeto;
    }

    public void setObjeto(String Objeto) {
        this.Objeto = Objeto;
    }

    public String getPoblacion() {
        return Poblacion;
    }

    public void setPoblacion(String Poblacion) {
        this.Poblacion = Poblacion;
    }

    public String getMovil() {
        return Movil;
    }

    public void setMovil(String Movil) {
        this.Movil = Movil;
    }

    public String getMail() {
        return Mail;
    }

    public void setMail(String Mail) {
        this.Mail = Mail;
    }

    public String getForma_juridica() {
        return forma_juridica;
    }

    public void setForma_juridica(String forma_juridica) {
        this.forma_juridica = forma_juridica;
    }
    
    public String getCNAE() {
        return CNAE;
    }

    public void setCNAE(String CNAE) {
        this.CNAE = CNAE;
    }

    public String getIBAN() {
        return IBAN;
    }

    public void setIBAN(String IBAN) {
        this.IBAN = IBAN;
    }

    public int getTipo_de_cuenta() {
        return tipo_de_cuenta;
    }

    public void setTipo_de_cuenta(int tipo_de_cuenta) {
        this.tipo_de_cuenta = tipo_de_cuenta;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getUrl_web() {
        return url_web;
    }

    public void setUrl_web(String url_web) {
        this.url_web = url_web;
    }

    public String getUrl_tsa() {
        return url_tsa;
    }

    public void setUrl_tsa(String url_tsa) {
        this.url_tsa = url_tsa;
    }

    public String getFecha_constitucion() {
        return fecha_constitucion;
    }

    public void setFecha_constitucion(String fecha_constitucion) {
        this.fecha_constitucion = fecha_constitucion;
    }

    public String getEntidadPresenta() {
        return EntidadPresenta;
    }

    public void setEntidadPresenta(String EntidadPresenta) {
        this.EntidadPresenta = EntidadPresenta;
    }

    public String getOficinaPresenta() {
        return OficinaPresenta;
    }

    public void setOficinaPresenta(String OficinaPresenta) {
        this.OficinaPresenta = OficinaPresenta;
    }

    public String getSufijo() {
        return Sufijo;
    }

    public void setSufijo(String Sufijo) {
        this.Sufijo = Sufijo;
    }

    public int getPeriodicidad_er() {
        return periodicidad_er;
    }

    public void setPeriodicidad_er(int periodicidad_er) {
        this.periodicidad_er = periodicidad_er;
    }

    public String getEmiteRemesas() {
        return EmiteRemesas;
    }

    public void setEmiteRemesas(String EmiteRemesas) {
        this.EmiteRemesas = EmiteRemesas;
    }

    public String getBIC() {
        return BIC;
    }

    public void setBIC(String BIC) {
        this.BIC = BIC;
    }

    

    
}
