package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.RegisterUser;

public interface RegisterUserRepository extends JpaRepository<RegisterUser, Integer> {
}
