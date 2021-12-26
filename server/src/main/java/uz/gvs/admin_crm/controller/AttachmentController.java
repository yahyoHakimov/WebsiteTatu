package uz.gvs.admin_crm.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import uz.gvs.admin_crm.entity.Attachment;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AttachmentDto;
import uz.gvs.admin_crm.repository.AttachmentRepository;
import uz.gvs.admin_crm.security.CurrentUser;
import uz.gvs.admin_crm.service.AttachmentService;
import uz.gvs.admin_crm.utils.AppConstants;

import java.util.UUID;


@RestController
@RequestMapping("/api/attachment")
public class AttachmentController {

    @Autowired
    AttachmentService attachmentService;
    @Autowired
    AttachmentRepository attachmentRepository;

    @PostMapping("/upload")
    public HttpEntity<?> uploadFile(MultipartHttpServletRequest request) {
        Integer id = attachmentService.uploadFile(request);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getFile(@PathVariable Integer id) {
        return attachmentService.getFile(id);
    }

    @GetMapping
    public HttpEntity<?> getFileForGet(@RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                       @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                       @CurrentUser User user) {
        ApiResponse apiResponse = attachmentService.getFileList(page, size, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteImg(@PathVariable Integer id) {
        ApiResponse apiResponse = attachmentService.deleteImg(id) ;
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
