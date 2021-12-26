package uz.gvs.admin_crm.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Attachment;


public interface AttachmentRepository extends JpaRepository<Attachment, Integer> {

}
