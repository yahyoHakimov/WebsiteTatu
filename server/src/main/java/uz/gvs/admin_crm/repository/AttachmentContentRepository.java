package uz.gvs.admin_crm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.AttachmentContent;

import java.util.UUID;

public interface AttachmentContentRepository extends JpaRepository<AttachmentContent, Integer> {
//    AttachmentContent findByAttachmentId(Integer attachment_id);

    AttachmentContent findByAttachmentId(Integer attachment_id);
    void deleteByAttachmentId(Integer attachment_id);

    @Query(nativeQuery = true, value = "delete from attachment_content where attachment_id=:rasm_id returning 1")
    Integer ketmonlik(Integer rasm_id);


    void deleteByAttachment_id(Integer id);
}
