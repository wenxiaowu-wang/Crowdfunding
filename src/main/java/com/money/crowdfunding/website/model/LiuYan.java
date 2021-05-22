package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class LiuYan implements Serializable {

    private Integer id;
    private String cheng;
    private String xingbie;
    private String qq;
    private String youxiang;
    private String dianhua;
    private String neirong;
    private String addtime;
    private String huifuneirong;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCheng() {
        return cheng;
    }

    public void setCheng(String cheng) {
        this.cheng = cheng;
    }

    public String getXingbie() {
        return xingbie;
    }

    public void setXingbie(String xingbie) {
        this.xingbie = xingbie;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getYouxiang() {
        return youxiang;
    }

    public void setYouxiang(String youxiang) {
        this.youxiang = youxiang;
    }

    public String getDianhua() {
        return dianhua;
    }

    public void setDianhua(String dianhua) {
        this.dianhua = dianhua;
    }

    public String getNeirong() {
        return neirong;
    }

    public void setNeirong(String neirong) {
        this.neirong = neirong;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    public String getHuifuneirong() {
        return huifuneirong;
    }

    public void setHuifuneirong(String huifuneirong) {
        this.huifuneirong = huifuneirong;
    }

    @Override
    public String toString() {
        return "LiuYan{" +
                "id=" + id +
                ", cheng='" + cheng + '\'' +
                ", xingbie='" + xingbie + '\'' +
                ", qq='" + qq + '\'' +
                ", youxiang='" + youxiang + '\'' +
                ", dianhua='" + dianhua + '\'' +
                ", neirong='" + neirong + '\'' +
                ", addtime='" + addtime + '\'' +
                ", huifuneirong='" + huifuneirong + '\'' +
                '}';
    }
}
