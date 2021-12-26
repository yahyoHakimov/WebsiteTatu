package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    boolean existsStudentByPhoneNumber(String phoneNumber);

    @Query(nativeQuery = true, value = "select s.id, s.name, s.sour_name, s.phone_number, s.address, s.flat_address, s.parent_number, s.description, s.number from student s where s.id = :id")
    Object[] getOneStudent(Integer id);
}
