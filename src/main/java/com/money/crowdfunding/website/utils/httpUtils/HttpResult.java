package com.money.crowdfunding.website.utils.httpUtils;

/**
 * 返回Json数据模板
 * @param <T>
 */
public class HttpResult<T> {
    /**
     * 请求成功
     */
    public static final int SUCCESS = 200;
    /**
     * 无权限
     */
    public static final int N0_AUTHORITY = 403;

    /**
     * 未登录
     */
    public static final int NO_LOGIN = 401;

    /**
     * 服务器内部错误
     */
    public static final int DEFAULT_ERROR = 400;

    private int code;

    private String msg;

    private T data;

    private Object object;

    public int getCode() {
        return code;
    }

    public HttpResult<T> setCode(int code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public HttpResult<T> setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public T getData() {
        return data;
    }

    public HttpResult<T> setData(T data) {
        this.data = data;
        return this;
    }

    public static <T> HttpResult<T> ok(T data){
        HttpResult<T> ok = ok();
        ok.setData(data);
        return ok;
    }

    public static <T> HttpResult<T> ok(T data,Object object){
        HttpResult<T> ok = ok();
        ok.setData(data);
        ok.setObject(object);
        return ok;
    }

    public static <T> HttpResult<T> ok(){
        HttpResult<T> httpResult = new HttpResult<>();
        httpResult.setCode(SUCCESS);
        httpResult.setMsg("success");
        return httpResult;
    }

    public static HttpResult failMsg(String msg) {
        HttpResult restResult = new HttpResult();
        restResult.setCode(DEFAULT_ERROR);
        restResult.setMsg(msg);
        return restResult;
    }

    public static <T> HttpResult<T> fail(){
        HttpResult<T> httpResult = new HttpResult<>();
        httpResult.setCode(NO_LOGIN);
        httpResult.setMsg("请重新登录!");
        return httpResult;
    }

    public static <T> HttpResult<T> error(T data){
        HttpResult<T> error = error();
        if (data instanceof String){
            error.setMsg((String) data);
        }
        error.setData(data);
        return error;
    }

    /**
     * 自定义错误码错误
     * @param data T
     * @param code code   403
     * @param <T> data
     * @return HttpResult<T>
     */
    public static <T> HttpResult<T> error(T data, int code){
        HttpResult<T> error = error();
        error.setCode(code);
        error.setData(data);
        return error;
    }

    /**
     * 自定义错误码错误
     * @param <T> data
     * @return HttpResult<T>
     */
    public static <T> HttpResult<T> errorMsg(String msg){
        HttpResult<T> error = error();
        error.setMsg(msg);
        return error;
    }

    public static <T> HttpResult<T> errorMsgData(String msg,T data){
        HttpResult<T> error = error();
        error.setCode(DEFAULT_ERROR);
        error.setMsg(msg);
        error.setData(data);
        return error;
    }

    public static <T> HttpResult<T> okMsg(String msg,T data){
        HttpResult<T> httpResult = new HttpResult<>();
        httpResult.setCode(SUCCESS);
        httpResult.setMsg(msg);
        httpResult.setData(data);
        return httpResult;
    }

    public static <T> HttpResult<T> okMsgs(String msg){
        HttpResult<T> httpResult = new HttpResult<>();
        httpResult.setCode(SUCCESS);
        httpResult.setMsg(msg);
        return httpResult;
    }

    /**
     * 内部错误
     * @param <T> t
     * @return HttpResult<T>
     */
    public static <T> HttpResult<T> error(){
        HttpResult<T> httpResult = new HttpResult<>();
        httpResult.setCode(DEFAULT_ERROR);
        httpResult.setMsg("error");
        return  httpResult;
    }

    public static HttpResult<String> noAuthority(){

        return new HttpResult<String>().setCode(N0_AUTHORITY).setMsg("权限不足！").setData("权限不足！");
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    @Override
    public String toString() {
        return "HttpResult{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                ", object=" + object +
                '}';
    }
}
