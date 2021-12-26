package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.StudentDto;
import uz.gvs.admin_crm.payload.StudentDtoList;
import uz.gvs.admin_crm.repository.AttachmentRepository;
import uz.gvs.admin_crm.repository.RegisterUserRepository;
import uz.gvs.admin_crm.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    RegisterUserRepository registerUserRepository;
    @Autowired
    AttachmentRepository attachmentRepository;

    public ApiResponse addStudent(StudentDto studentDto) {
     try {
         if (!studentRepository.existsStudentByPhoneNumber(studentDto.getPhoneNumber())) {
             Student student = new Student();
             student.setName(studentDto.getName());
             student.setSourName(studentDto.getSourName());
             student.setAddress(studentDto.getAddress());
             student.setPhoneNumber(studentDto.getPhoneNumber());
             student.setAttachment((student.getAttachment() != null) ? attachmentRepository.findById(student.getAttachment().getId()).orElseThrow(() -> new ResourceNotFoundException("studentAttachmentId")) : null);
             student.setParentNumber(studentDto.getParentNumber());
             student.setFlatAddress(studentDto.getFlatAddress());
             student.setDescription(studentDto.getDescription());
             student.setCabinetParole(studentDto.getCabinetParole());
             studentRepository.save(student);
             return apiResponseService.saveResponse();
         }
         return apiResponseService.errorResponse();
     } catch (Exception a) {
         return apiResponseService.tryErrorResponse();
     }
    }

    public List<StudentDto> getOneStudentList(Integer id) {
        try {
            List<StudentDto> all = new ArrayList<>();
            Object[] student = studentRepository.getOneStudent(id);
            for (Object data : student) {
                Object[] students = (Object[]) data;
                Integer studentId = (Integer) students[0];
                String name = (String) students[1];
                String sourName = (String) students[2];
                String phoneNumber = (String) students[3];
                String address = (String) students[4];
                String flatAddress = (String) students[5];
                String parentNumber = (String) students[6];
                String description = (String) students[7];
                String number = (String) students[8];
                String cabinetParole = (String) students[9];
                all.add(new StudentDto(studentId,name, sourName, phoneNumber, address,flatAddress, parentNumber, description, number, cabinetParole));
            }
            return all;
        } catch (Exception a) {
            return new ArrayList<>();
        }
    }
    public ApiResponse getOneStudent(Integer id) {
        try {
            Optional<Student> optional = studentRepository.findById(id);
            if (optional.isPresent()) {
                List<StudentDto> getOneStudent = getOneStudentList(id);
                return apiResponseService.getResponse(new StudentDtoList(getOneStudent));
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception a) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse editStudent(Integer id, StudentDto studentDto) {
        try {
        Optional<Student> optional = studentRepository.findById(id);
        if (optional.isEmpty())
            return apiResponseService.notFoundResponse();
        Student student = optional.get();
        student.setName(studentDto.getName());
        student.setSourName(studentDto.getSourName());
        student.setAddress(studentDto.getAddress());
        student.setPhoneNumber(studentDto.getPhoneNumber());
        student.setAttachment((student.getAttachment() != null) ? attachmentRepository.findById(student.getAttachment().getId()).orElseThrow(() -> new ResourceNotFoundException("studentAttachmentId")) : null);
        student.setParentNumber(studentDto.getParentNumber());
        student.setFlatAddress(studentDto.getFlatAddress());
        student.setDescription(studentDto.getDescription());
        studentRepository.save(student);
        return apiResponseService.saveResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteStudent(Integer id) {
        try {
            studentRepository.deleteById(id);
            return apiResponseService.deleteResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getStudent() {
        try {
            List<Student> all = studentRepository.findAll();
            return apiResponseService.getResponse(all.stream().map(this::makeStudent).collect(Collectors.toList()));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public StudentDto makeStudent(Student student) {
        return new StudentDto(
                student.getId(),
                student.getName(),
                student.getSourName(),
                student.getPhoneNumber(),
                student.getAddress(),
                student.getFlatAddress(),
                student.getParentNumber(),
                student.getDescription(),
                student.getJournalNumber(),
                student.getCabinetParole()
        );
    }
}
