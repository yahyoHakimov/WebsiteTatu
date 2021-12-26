package uz.gvs.admin_crm.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uz.gvs.admin_crm.entity.Role;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.repository.RoleRepository;
import uz.gvs.admin_crm.repository.UserRepository;
import java.util.HashSet;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Value("${spring.datasource.initialization-mode}")
    private String initMode;

    @Override
    public void run(String... args) throws Exception {
        if (initMode.equals("always")) {
            List<Role> roles = roleRepository.findAll();
            userRepository.save(
                    new User(
                            "mehruz",
                            "998901234567",
                            passwordEncoder.encode("631-19"),
                            new HashSet<Role>(roleRepository.findAllByRoleName(RoleName.SUPER_ADMIN)),
                            true
                    ));

        }
    }

    private Role getRoleByRoleName(List<Role> roles, RoleName roleName) {
        for (Role role : roles) {
            if (role.getRoleName().equals(roleName))
                return role;
        }
        return null;
    }
}
