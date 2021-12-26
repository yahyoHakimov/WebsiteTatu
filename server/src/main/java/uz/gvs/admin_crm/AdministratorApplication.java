package uz.gvs.admin_crm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uz.gvs.admin_crm.config.InitConfig;

import java.util.Scanner;

@SpringBootApplication
public class AdministratorApplication {
    //        if (InitConfig.isStart())
//        else System.out.println("Malumotlar o'chmadi");
    public static void main(String[] args) {
        SpringApplication.run(AdministratorApplication.class, args);
    }
}
