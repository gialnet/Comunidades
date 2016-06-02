
package es.redmoon.comunidades.estanques;

/**
 *
 * @author antonio
 */
public class TuplasEstanques {

    private final String codigo;
    private final String descripcion;
    private final String comunero;
    private final String propietario;
    private final String comunidad;
    private final String unidades;
    private final String horas;
    private final String anejo;
    private final String ordenriego;
    
    public static class Builder {
        private String codigo;
        private String descripcion;
        private String comunero;
        private String propietario;
        private String comunidad;
        private String unidades;
        private String horas;
        private String anejo;
        private String ordenriego;
        private String version;
        
        public Builder() {
            this.version = "1.0";
        }

        public Builder Codigo(final String codigo) {
            this.codigo = codigo;
            return this;
        }
        
        public Builder Descripcion(final String descripcion) {
            this.descripcion = descripcion;
            return this;
        }
        public Builder Comunero(final String comunero) {
            this.comunero = comunero;
            return this;
        }
        public Builder Propietario(final String propietario) {
            this.propietario = propietario;
            return this;
        }
        
        public Builder Comunidad(final String comunidad) {
            this.comunidad = comunidad;
            return this;
        }
        
        public Builder Unidades(final String unidades) {
            this.unidades = unidades;
            return this;
        }
        
        public Builder Horas(final String horas) {
            this.horas = horas;
            return this;
        }
        
        public Builder Anejo(final String anejo) {
            this.anejo = anejo;
            return this;
        }
        
        public Builder Ordenriego(final String ordenriego) {
            this.ordenriego = ordenriego;
            return this;
        }
        
        public TuplasEstanques build() {
            return new TuplasEstanques(this);
        }
    }
    
    /**
     * 
     * @param builder 
     */
    private TuplasEstanques(Builder builder) {
        
        this.codigo=builder.codigo;
        this.descripcion=builder.descripcion;
        this.comunero=builder.comunero;
        this.propietario=builder.propietario;
        this.comunidad=builder.comunidad;
        this.unidades=builder.unidades;
        this.horas=builder.horas;
        this.anejo=builder.anejo;
        this.ordenriego=builder.ordenriego;
    }
    
}
