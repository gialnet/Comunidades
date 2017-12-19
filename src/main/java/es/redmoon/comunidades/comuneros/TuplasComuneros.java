
package es.redmoon.comunidades.comuneros;

/**
 * Objeto inmutable para la relacion ORM y la tabla Comuneros
 * @author antonio
 */
public class TuplasComuneros {

    private final String nombre;
    private final String apellidos;
    private final String movil;
    private final String email;

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getMovil() {
        return movil;
    }

    public String getEmail() {
        return email;
    }

    
    public static class Builder {
        private String nombre;
        private String apellidos;
        private String movil;
        private String email;
        private String version;
        
        public Builder() {
            this.version = "1.0";
        }

        public Builder Nombre(final String nombre) {
            this.nombre = nombre;
            return this;
        }
        
        public Builder Apellidos(final String apellidos) {
            this.apellidos = apellidos;
            return this;
        }
        public Builder Movil(final String movil) {
            this.movil = movil;
            return this;
        }
        public Builder Email(final String email) {
            this.email = email;
            return this;
        }
        public TuplasComuneros build() {
            return new TuplasComuneros(this);
        }
    }
    
    private TuplasComuneros(Builder builder) {
        
        this.nombre=builder.nombre;
        this.apellidos=builder.apellidos;
        this.movil=builder.movil;
        this.email=builder.movil;
    }
}
