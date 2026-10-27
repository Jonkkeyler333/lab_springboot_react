package com.uis.tallerSR.config;

import jakarta.validation.Validator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.mapping.event.ValidatingEntityCallback;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;


@Configuration
public class MongoValidationConfig {

    @Bean
    public ValidatingEntityCallback validatingEntityCallback(Validator validator) {
        return new ValidatingEntityCallback(validator);
    }

    @Bean
    public LocalValidatorFactoryBean localValidatorFactoryBean() {
        return new LocalValidatorFactoryBean();
    }

}
