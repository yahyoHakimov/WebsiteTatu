package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import uz.gvs.admin_crm.entity.Attachment;
import uz.gvs.admin_crm.entity.AttachmentContent;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AttachmentDto;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.repository.AttachmentContentRepository;
import uz.gvs.admin_crm.repository.AttachmentRepository;

import java.io.IOException;
import java.util.Iterator;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AttachmentService {
    @Autowired
    AttachmentRepository attachmentRepository;
    @Autowired
    AttachmentContentRepository attachmentContentRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    CheckRole checkRole;

    public Integer uploadFile(MultipartHttpServletRequest request) {
        try {
            Iterator<String> fileNames = request.getFileNames();
            /////while(fileNames.hasNext)   agar ishlamasa while ni ichiga olib qo'yish kerak
            MultipartFile file = request.getFile(fileNames.next());
            //asert bu test qilish uchun
            assert file != null;
            Attachment attachment = new Attachment(file.getOriginalFilename(),
                    file.getContentType(),
                    file.getSize());
            Attachment savedAttachment = attachmentRepository.save(attachment);

            AttachmentContent attachmentContent = new AttachmentContent(savedAttachment, file.getBytes());

            attachmentContentRepository.save(attachmentContent);
            return savedAttachment.getId();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;

    }

    public HttpEntity<?> getFile(Integer id) {
        Attachment attachment = attachmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getAttachment"));
        AttachmentContent attachmentContent = attachmentContentRepository.findByAttachmentId(id);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(attachment.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename:\"" + attachment.getName() + "\"")
                .body(attachmentContent.getContent());

    }

    public ApiResponse getFileList(int page, int size, User user) {
        try {
            Page<Attachment> all = null;
//            if (checkRole.isSuperAdmin(user)) {
            all = attachmentRepository.findAll(PageRequest.of(page, size));
//            }
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalElements(),
                            all.getTotalPages(),
                            all.getSize(),
                            all.get().map(this::makeAttachment).collect(Collectors.toList())
                    )
            );
        } catch (Exception a) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public AttachmentDto makeAttachment(Attachment attachment) {
        return new AttachmentDto(
                attachment.getName(),
                attachment.getContentType(),
                attachment.getSize()
        );
    }

    public ApiResponse deleteImg(Integer id) {
        try {
            Optional<Attachment> byId = attachmentRepository.findById(id);
            Attachment attachment = byId.get();

            attachmentContentRepository.deleteById(attachment.getId());
            attachmentRepository.deleteById(id);
            return apiResponseService.deleteResponse();
        } catch (Exception a) {
            return apiResponseService.tryErrorResponse();
        }
    }

//    public HttpEntity<?> getOne(Integer id) {
//            Attachment one = attachmentRepository.getOne(id);
//            AttachmentContent attachmentContent = attachmentContentRepository.findByAttachmentId(id);
//            return ResponseEntity.ok()
//                    .contentType(MediaType.valueOf(one.getContentType()))
//                    .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename:\""+one.getName()+"\"")
//                    .body(attachmentContent.getContent());
//    }
}
