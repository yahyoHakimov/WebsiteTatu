package uz.gvs.admin_crm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByPhoneNumber(String phoneNumber);
    boolean existsByPhoneNumber(String phoneNumber);
}
