package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class Comment implements Serializable {

    private String yonghuming;
    private String touxiang;
    private String addtime;
    private String xinwenid;
    private String pinglunneirong;
    private String pinglunren;

    public String getYonghuming() {
        return yonghuming;
    }

    public void setYonghuming(String yonghuming) {
        this.yonghuming = yonghuming;
    }

    public String getTouxiang() {
        return touxiang;
    }

    public void setTouxiang(String touxiang) {
        this.touxiang = touxiang;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    public String getXinwenid() {
        return xinwenid;
    }

    public void setXinwenid(String xinwenid) {
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

    @Override
    public String toString() {
        return "Comment{" +
                "yonghuming='" + yonghuming + '\'' +
                ", touxiang='" + touxiang + '\'' +
                ", addtime='" + addtime + '\'' +
                ", xinwenid='" + xinwenid + '\'' +
                ", pinglunneirong='" + pinglunneirong + '\'' +
                ", pinglunren='" + pinglunren + '\'' +
                '}';
    }
}

