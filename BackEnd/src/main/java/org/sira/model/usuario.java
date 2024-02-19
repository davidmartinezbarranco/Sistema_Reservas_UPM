import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Lombok;

@Entity
public class usuario {
    @GeneratedValue
    @Id
    private Long id;
    
    private String nombreUsuario;
    private String contraseña;
    private String correoElectronico;

    

}
