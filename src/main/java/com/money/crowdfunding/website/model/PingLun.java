package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class PingLun implements Serializable {

    private Integer id;
    private String xinwenid;
    private String pinglunneirong;
    private String pinglunren;
    private String pingfen;
    private String biao;
    private Timestamp addtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getXinwenid() {
        return xinwenid;
    }

    public void setXinwenid(String xinweiid) {
        this.xinwenid = xinwenid;
    }

    public String getPinglunneirong() {
        return pinglunneirong;
    }

    public void setPinglunneirong(String pinglunneirong) {
        this.pinglunneirong = pinglunneirong;
    }

    public String getPinglunren() {
        return pinglunren;
    }

    public void setPinglunren(String pinglunren) {
        this.pinglunren = pinglunren;
    }

    public String getPingfen() {
        return pingfen;
    }

    public void setPingfen(String pingfen) {
        this.pingfen = pingfen;
    }

    public String getBiao() {
        return biao;
    }

    public void setBiao(String biao) {
        this.biao = biao;
    }

    public Timestamp getAddtime() {
        return addtime;
    }

    public void setAddtime(Timestamp addtime) {
        this.addtime = addtime;
    }

    @Override
    public String toString() {
        return "PingLun{" +
                "id=" + id +
                ", xinwenid='" + xinwenid + '\'' +
                ", pinglunneirong='" + pinglunneirong + '\'' +
                ", pinglunren='" + pinglunren + '\'' +
                ", pingfen='" + pingfen + '\'' +
                ", biao='" + biao + '\'' +
                ", addtime=" + addtime +
                '}';
    }
}
