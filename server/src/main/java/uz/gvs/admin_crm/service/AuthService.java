package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.RegisterUser;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.repository.RegisterUserRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.util.UUID;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RegisterUserRepository registerUserRepository;


    public UserDetails getUserById(UUID id) {
        return (UserDetails) userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));

    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByPhoneNumber(s).orElseThrow(() -> new ResourceNotFoundException("get Username"));
    }
}
