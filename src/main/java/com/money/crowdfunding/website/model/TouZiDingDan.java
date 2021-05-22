package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class TouZiDingDan implements Serializable {

    private Integer id;
    private String xiangmubianhao;
    private String biaoti;
    private String leibie;
    private String zhongchoujine;
    private String qixian;
    private String shouyi;
    private String faburen;
    private String touziren;
    private String issh;
    private String iszf;
    private String addtime;

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

    public String getFaburen() {
        return faburen;
    }

    public void setFaburen(String faburen) {
        this.faburen = faburen;
    }

    public String getTouziren() {
        return touziren;
    }

    public void setTouziren(String touziren) {
        this.touziren = touziren;
    }

    public String getIssh() {
        return issh;
    }

    public void setIssh(String issh) {
        this.issh = issh;
    }

    public String getIszf() {
        return iszf;
    }

    public void setIszf(String iszf) {
        this.iszf = iszf;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    @Override
    public String toString() {
        return "TouZiDingDan{" +
                "id=" + id +
                ", xiangmubianhao='" + xiangmubianhao + '\'' +
                ", biaoti='" + biaoti + '\'' +
                ", leibie='" + leibie + '\'' +
                ", zhongchoujine='" + zhongchoujine + '\'' +
                ", qixian='" + qixian + '\'' +
                ", shouyi='" + shouyi + '\'' +
                ", faburen='" + faburen + '\'' +
                ", touziren='" + touziren + '\'' +
                ", issh='" + issh + '\'' +
                ", iszf='" + iszf + '\'' +
                ", addtime='" + addtime + '\'' +
                '}';
    }
}
