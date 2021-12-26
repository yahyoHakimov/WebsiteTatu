package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {

    private Integer id;
    private String name;
    private String sourName;
    private String phoneNumber;
    private String address;
    private String flatAddress;
    private String parentNumber;
    private String description;
    private String journalNumber;
    private String cabinetParole;

}
