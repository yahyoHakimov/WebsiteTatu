package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.entity.RegisterUser;
import uz.gvs.admin_crm.entity.Role;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.RegisterUserRepository;
import uz.gvs.admin_crm.repository.RoleRepository;
import uz.gvs.admin_crm.repository.UserRepository;
import uz.gvs.admin_crm.security.CurrentUser;
import uz.gvs.admin_crm.security.JwtTokenProvider;
import uz.gvs.admin_crm.service.AuthService;
import uz.gvs.admin_crm.utils.MessageConst;

import javax.validation.Valid;

import java.util.HashSet;

import static uz.gvs.admin_crm.entity.enums.RoleName.STUDENT;

@RequestMapping("/api/auth")
@RestController
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    RegisterUserRepository registerUserRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    private HttpEntity<?> login(@Valid @RequestBody ReqLogin reqLogin) {
        try {
            Authentication authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(reqLogin.getPhoneNumber(), reqLogin.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(user);
            return ResponseEntity.status(200).body(new ApiResponse(MessageConst.LOGIN_SUCCESS, true, new JwtToken(token)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponse(MessageConst.LOGIN_ERROR, false));
        }
    }
    @PostMapping("/registration")
    private HttpEntity<?> registration(@Valid @RequestBody RegisterUserDto registerUserDto) {
        try {
            User registerUser = new User();
            registerUser.setFullName(registerUserDto.getFullName());
            registerUser.setPhoneNumber(registerUserDto.getPhoneNumber());
            registerUser.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
            registerUser.setRoles(new HashSet<Role>(roleRepository.findAllByRoleName(STUDENT)));
            userRepository.save(registerUser);
            Authentication authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(registerUserDto.getPhoneNumber(), registerUserDto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String token = jwtTokenProvider.generateTokenForRegistration(user);
            return ResponseEntity.status(200).body(new ApiResponse(MessageConst.LOGIN_SUCCESS, true, new JwtToken(token)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponse(MessageConst.LOGIN_ERROR, false));
        }
    }

    @GetMapping("/me")
    public HttpEntity<?> getUserMe(@CurrentUser User user) {
        return ResponseEntity.ok(user);
    }
}
