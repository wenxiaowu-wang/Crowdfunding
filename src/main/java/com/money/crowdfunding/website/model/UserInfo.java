package com.money.crowdfunding.website.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 包:com.money.crowdfunding.website.model
 * 项目:website
 * 描述:
 */
@Data
public class UserInfo implements Serializable {

    private Integer id;
    private String yonghuming;
    private String mima;
    private String xingbie;
    private String chushengnianyue;
    private String qq;
    private String youxiang;
    private String dianhua;
    private String shenfenzheng;
    private String touxiang;
    private String dizhi;
    private String beizhu;
    private String addtime;
    private String issh;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getYonghuming() {
        return yonghuming;
    }

    public void setYonghuming(String yonghuming) {
        this.yonghuming = yonghuming;
    }

    public String getMima() {
        return mima;
    }

    public void setMima(String mima) {
        this.mima = mima;
    }

    public String getXingbie() {
        return xingbie;
    }

    public void setXingbie(String xingbie) {
        this.xingbie = xingbie;
    }

    public String getChushengnianyue() {
        return chushengnianyue;
    }

    public void setChushengnianyue(String chushengnianyue) {
        this.chushengnianyue = chushengnianyue;
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

    public String getShenfenzheng() {
        return shenfenzheng;
    }

    public void setShenfenzheng(String shenfenzheng) {
        this.shenfenzheng = shenfenzheng;
    }

    public String getTouxiang() {
        return touxiang;
    }

    public void setTouxiang(String touxiang) {
        this.touxiang = touxiang;
    }

    public String getDizhi() {
        return dizhi;
    }

    public void setDizhi(String dizhi) {
        this.dizhi = dizhi;
    }

    public String getBeizhu() {
        return beizhu;
    }

    public void setBeizhu(String beizhu) {
        this.beizhu = beizhu;
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime;
    }

    public String getIssh() {
        return issh;
    }

    public void setIssh(String issh) {
        this.issh = issh;
    }


    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", yonghuming='" + yonghuming + '\'' +
                ", mima='" + mima + '\'' +
                ", xingbie='" + xingbie + '\'' +
                ", chushengnianyue='" + chushengnianyue + '\'' +
                ", qq='" + qq + '\'' +
                ", youxiang='" + youxiang + '\'' +
                ", dianhua='" + dianhua + '\'' +
                ", shenfenzheng='" + shenfenzheng + '\'' +
                ", touxiang='" + touxiang + '\'' +
                ", dizhi='" + dizhi + '\'' +
                ", beizhu='" + beizhu + '\'' +
                ", addtime='" + addtime + '\'' +
                ", issh='" + issh + '\'' +
                '}';
    }


}
