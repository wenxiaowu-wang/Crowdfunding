package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class ZhongChouXiangMu implements Serializable {

    private Integer id;
    private String xiangmubianhao;
    private String biaoti;
    private String leibie;
    private String zhongchoujine;
    private String qixian;
    private String shouyi;
    private String xiangqing;
    private String faburen;
    private String issh;
    private String addtime;
    private String picture;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getXiangmubianhao() {
        return xiangmubianhao;
    }

    public void setXiangmubianhao(String xiangmubianhao) {
        this.xiangmubianhao = xiangmubianhao;
    }

    public String getBiaoti() {
        return biaoti;
    }

    public void setBiaoti(String biaoti) {
        this.biaoti = biaoti;
    }

    public String getLeibie() {
        return leibie;
    }

    public void setLeibie(String leibie) {
        this.leibie = leibie;
    }

    public String getZhongchoujine() {
        return zhongchoujine;
    }

    public void setZhongchoujine(String zhongchoujine) {
        this.zhongchoujine = zhongchoujine;
    }

    public String getQixian() {
        return qixian;
    }

    public void setQixian(String qixian) {
        this.qixian = qixian;
    }

    public String getShouyi() {
        return shouyi;
    }

    public void setShouyi(String shouyi) {
        this.shouyi = shouyi;
    }

    public String getXiangqing() {
        return xiangqing;
    }

    public void setXiangqing(String xiangqing) {
        this.xiangqing = xiangqing;
    }

    public String getFaburen() {
        return faburen;
    }

    public void setFaburen(String faburen) {
        this.faburen = faburen;
    }

    public String getIssh() {
        return issh;
    }

    public void setIssh(String issh) {
        this.issh = issh;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return "ZhongChouXiangMu{" +
                "id=" + id +
                ", xiangmubianhao='" + xiangmubianhao + '\'' +
                ", biaoti='" + biaoti + '\'' +
                ", leibie='" + leibie + '\'' +
                ", zhongchoujine='" + zhongchoujine + '\'' +
                ", qixian='" + qixian + '\'' +
                ", shouyi='" + shouyi + '\'' +
                ", xiangqing='" + xiangqing + '\'' +
                ", faburen='" + faburen + '\'' +
                ", issh='" + issh + '\'' +
                ", addtime='" + addtime + '\'' +
                ", picture='" + picture + '\'' +
                '}';
    }
}
