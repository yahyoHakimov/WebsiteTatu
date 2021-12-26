package uz.gvs.admin_crm.entity.template;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public abstract class AbsNameEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    @Column
    private String name;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    @Column(columnDefinition = "text")
    private String description;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    @Column
    private boolean active;

    public AbsNameEntity(String name, String description, boolean active) {
        this.name = name;
        this.description = description;
        this.active = active;
    }
}
