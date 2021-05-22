package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class Admin implements Serializable {

//    private static final long serialVersionUID = 1L;

    private String username;
    private String pwd;
    private String cx;
    private String addtime;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getCx() {
        return cx;
    }

    public void setCx(String cx) {
        this.cx = cx;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "username='" + username + '\'' +
                ", pwd='" + pwd + '\'' +
                ", cx='" + cx + '\'' +
                ", addtime='" + addtime + '\'' +
                '}';
    }
}
