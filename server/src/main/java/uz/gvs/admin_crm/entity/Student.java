package uz.gvs.admin_crm.entity;

import lombok.*;
import uz.gvs.admin_crm.entity.template.AbsEntity2;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "student")
public class Student extends AbsEntity2 {

    private String name;
    private String sourName;
    private String address;
    @Column(unique = true)
    private String phoneNumber;
    private String flatAddress;
    private String parentNumber;
    private String description;
    private String journalNumber;
    private String cabinetParole;

    public String getCabinetParole() {
        return cabinetParole;
    }

    public void setCabinetParole(String cabinetParole) {
        this.cabinetParole = cabinetParole;
    }

    public String getJournalNumber() {
        return journalNumber;
    }

    public void setJournalNumber(String journalNumber) {
        this.journalNumber = journalNumber;
    }

    @OneToOne
    private Attachment attachment;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSourName() {
        return sourName;
    }

    public void setSourName(String sourName) {
        this.sourName = sourName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFlatAddress() {
        return flatAddress;
    }

    public void setFlatAddress(String flatAddress) {
        this.flatAddress = flatAddress;
    }

    public String getParentNumber() {
        return parentNumber;
    }

    public void setParentNumber(String parentNumber) {
        this.parentNumber = parentNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Attachment getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }
}
