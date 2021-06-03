package com.money.crowdfunding.website;

import com.money.crowdfunding.website.mapper.ProjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
class WebsiteApplicationTests {

    @Autowired
    ProjectMapper projectMapper;

    @Test
    void contextLoads() {

        int qixian = projectMapper.getQixian("0531225404");
        Date addtime = projectMapper.getAddTime("0531225404");
        SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy");
        SimpleDateFormat formatter2 = new SimpleDateFormat("MM");
        SimpleDateFormat formatter3 = new SimpleDateFormat("dd");
        SimpleDateFormat formatter4 = new SimpleDateFormat("HH");
        SimpleDateFormat formatter5 = new SimpleDateFormat("mm");
        SimpleDateFormat formatter6 = new SimpleDateFormat("ss");


        List<Integer> list = new ArrayList<>();
        int endTime1 =Integer.parseInt(formatter1.format(addtime))+qixian;
        int endTime2 =Integer.parseInt(formatter2.format(addtime));
        int endTime3 =Integer.parseInt(formatter3.format(addtime));
        int endTime4 =Integer.parseInt(formatter4.format(addtime));
        int endTime5 =Integer.parseInt(formatter5.format(addtime));
        int endTime6 =Integer.parseInt(formatter6.format(addtime));
        list.add(endTime6);
        list.add(endTime5);
        list.add(endTime4);
        list.add(endTime3);
        list.add(endTime2);
        list.add(endTime1);


        System.out.println(endTime1);
        System.out.println(endTime2);
        System.out.println(endTime3);
        System.out.println(endTime4);
        System.out.println(endTime5);
        System.out.println(endTime6);

        System.out.println(list);




    }

}
