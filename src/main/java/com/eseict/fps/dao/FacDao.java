package com.eseict.fps.dao;


import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository("FacDao")
public class FacDao {

    final private static Logger logger = LoggerFactory.getLogger(FacDao.class);

    @PersistenceContext(unitName = "entityManagerFactory")
    EntityManager emf;

    public String getCctvMgrNo(String cctvNm) {
        List<String> mgrNoList = new ArrayList<>();
        String cctvMgrNo = "";
        try {
            String sql = "SELECT c.mgtNo from ErfFacInfo as c " +
                    "where c.facNm = :cctvNm " +
                    "and (c.facClfyId = 'FCC_46572f5370e94a3c86b03cf28b85a9ae' or c.facClfyId = 'FCC_0e3b16826fed43e88b7e9beeaa2a1622')";
            Query query = emf.createQuery(sql);
//            TypedQuery<String> query = emf.createQuery(sql, String.class);
            query.setParameter("cctvNm", cctvNm);
            mgrNoList = query.getResultList();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        if(!mgrNoList.isEmpty()){
            cctvMgrNo = mgrNoList.get(0);
        }
        return cctvMgrNo;
    }
}
