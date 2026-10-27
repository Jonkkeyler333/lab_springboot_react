package com.uis.tallerSR.repository;

import com.uis.tallerSR.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository  extends MongoRepository<Product,String> {
}
