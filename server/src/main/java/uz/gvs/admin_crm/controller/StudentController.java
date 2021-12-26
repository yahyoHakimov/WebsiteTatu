package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.StudentDto;
import uz.gvs.admin_crm.service.ApiResponseService;
import uz.gvs.admin_crm.service.StudentService;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/controller")
public class StudentController {
    @Autowired
    StudentService studentService;
    @Autowired
    ApiResponseService apiResponseService;

    @PostMapping()
    public HttpEntity<?> addStudent(@RequestBody StudentDto studentDto) {
        ApiResponse apiResponse = studentService.addStudent(studentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editStudent(@PathVariable Integer id, @RequestBody StudentDto studentDto) {
        ApiResponse apiResponse = studentService.editStudent(id, studentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteStudent(@PathVariable Integer id) {
        ApiResponse apiResponse = studentService.deleteStudent(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }

    @GetMapping
    public HttpEntity<?> getStudentList() {
        ApiResponse student = studentService.getStudent();
        return ResponseEntity.status(student.isSuccess() ? 200 : 409).body(student);
    }
    @GetMapping("/list/{id}")
    public HttpEntity<?> getStudent(@PathVariable Integer id) {
        ApiResponse apiResponse = studentService.getOneStudent(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
