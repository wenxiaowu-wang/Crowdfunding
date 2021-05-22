package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class XinWenTongZhi implements Serializable {

    private Integer id;
    private String biaoti;
    private String leibie;
    private String neirong;
    private String tianjiaren;
    private String shouyetupian;
    private String dianjilv;
    private String addtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getNeirong() {
        return neirong;
    }

    public void setNeirong(String neirong) {
        this.neirong = neirong;
    }

    public String getTianjiaren() {
        return tianjiaren;
    }

    public void setTianjiaren(String tianjiaren) {
        this.tianjiaren = tianjiaren;
    }

    public String getShouyetupian() {
        return shouyetupian;
    }

    public void setShouyetupian(String shouyetupian) {
        this.shouyetupian = shouyetupian;
    }

    public String getDianjilv() {
        return dianjilv;
    }

    public void setDianjilv(String dianjilv) {
        this.dianjilv = dianjilv;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    @Override
    public String toString() {
        return "XinWenTongZhi{" +
                "id=" + id +
                ", biaoti='" + biaoti + '\'' +
                ", leibie='" + leibie + '\'' +
                ", neirong='" + neirong + '\'' +
                ", tianjiaren='" + tianjiaren + '\'' +
                ", shouyetupian='" + shouyetupian + '\'' +
                ", dianjilv='" + dianjilv + '\'' +
                ", addtime='" + addtime + '\'' +
                '}';
    }
}
