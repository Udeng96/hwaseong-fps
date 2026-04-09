package com.eseict.fps.config.db;

import com.eseict.common.config.ConfFileInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.eseict.fps")
public class BJDataConfig {


    private static final Logger _logger = LoggerFactory.getLogger(BJDataConfig.class);

    @Primary
    @Bean(name="DataSource")
    public DataSource dataSource(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(ConfFileInfo.get("db.bj.driver"));
        dataSource.setUrl(ConfFileInfo.get("db.bj.url"));
        dataSource.setUsername(ConfFileInfo.get("db.bj.username"));
        dataSource.setPassword(ConfFileInfo.get("db.bj.password"));

        _logger.info("####################################################################################################################");
        _logger.info("## sensor DataSource Info.");
        _logger.info("Driver   : {}", ConfFileInfo.get("db.bj.driver"));
        _logger.info("URL      : {}", ConfFileInfo.get("db.bj.url"));
        _logger.info("USERNAME : {}", ConfFileInfo.get("db.bj.username"));
        _logger.info("PASSWORD : {}", ConfFileInfo.get("db.bj.password"));
        _logger.info("####################################################################################################################");

        return dataSource;
    }

    @Primary
    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(EntityManagerFactoryBuilder builder) {
        LocalContainerEntityManagerFactoryBean entityManagerFactory = builder.dataSource(dataSource()).packages("com.eseict.bj.domain").build();
        HibernateJpaVendorAdapter jpaAdapter = new HibernateJpaVendorAdapter();
        entityManagerFactory.setJpaVendorAdapter(jpaAdapter);
        entityManagerFactory.setJpaProperties(jpaHibernateProperties());
        entityManagerFactory.setPackagesToScan("");
        return entityManagerFactory;
    }

    @Primary
    @Bean(name = "transactionManager")
    @Autowired
    public JpaTransactionManager jpaTransactionManager(@Qualifier(value = "entityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactoryBean){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactoryBean.getObject());
        return transactionManager;
    }

    private Properties jpaHibernateProperties(){
        Properties props = new Properties();
        props.setProperty("hibernate.dialect", ConfFileInfo.get("db.bj.dialect"));
        props.setProperty("hibernate.hbm2ddl.auto", ConfFileInfo.get("db.bj.ddl.auto"));
        props.setProperty("hibernate.show_sql", "false");
        props.setProperty("hibernate.format_sql", "true");
        props.setProperty("hibernate.temp.use_jdbc_metadata_defaults","false");
        return props;
    }

}
