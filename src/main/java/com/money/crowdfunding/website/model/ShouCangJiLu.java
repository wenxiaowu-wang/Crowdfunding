package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class ShouCangJiLu implements Serializable {

    private Integer id;
    private String username;
    private String xwid;
    private String ziduan;
    private String biao;
    private String addtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getXwid() {
        return xwid;
    }

    public void setXwid(String xwid) {
        this.xwid = xwid;
    }

    public String getZiduan() {
        return ziduan;
    }

    public void setZiduan(String ziduan) {
        this.ziduan = ziduan;
    }

    public String getBiao() {
        return biao;
    }

    public void setBiao(String biao) {
        this.biao = biao;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    @Override
    public String toString() {
        return "ShouCangJiLu{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", xwid='" + xwid + '\'' +
                ", ziduan='" + ziduan + '\'' +
                ", biao='" + biao + '\'' +
                ", addtime='" + addtime + '\'' +
                '}';
    }
}
