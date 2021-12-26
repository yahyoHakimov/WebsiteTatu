package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Attachment;
import uz.gvs.admin_crm.entity.Role;

import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String fullName;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String phoneNumber;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String description;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int age;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer regionId;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Attachment avatar;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String birthDate;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String password;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Role> roles;

    public UserDto(String fullName, String phoneNumber, String description, Integer regionId, String birthDate) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.regionId = regionId;
        this.birthDate = birthDate;
    }

    ///for teacher make user
    public UserDto(String fullName, String phoneNumber, String description, Integer regionId, String birthDate, String password) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.regionId = regionId;
        this.birthDate = birthDate;
        this.password = password;
    }

    public UserDto(UUID id, String fullName, String phoneNumber, String description, String birthDate, Set<Role> roles) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.birthDate = birthDate;
        this.roles = roles;
    }

    public UserDto(UUID id, String fullName, String phoneNumber, int age, Attachment avatar, String birthDate) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.avatar = avatar;
        this.birthDate = birthDate;
    }
}
