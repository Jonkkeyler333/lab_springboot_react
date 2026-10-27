package com.uis.tallerSR.service;

import com.uis.tallerSR.dto.ProductCreateDto;
import com.uis.tallerSR.dto.ProductUpdateDto;
import com.uis.tallerSR.model.Product;
import com.uis.tallerSR.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private ProductRepository productRepository;

    public ProductService (ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(ProductCreateDto productCreateDto) {
        Product product = new Product();
        product.setName(productCreateDto.getName());
        product.setDescription(productCreateDto.getDescription());
        product.setPrice(productCreateDto.getPrice());
        product.setStock(productCreateDto.getStock());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Optional<Product> updateProduct(String id, ProductUpdateDto productUpdateDto) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            if (productUpdateDto.getName() != null) {
                product.setName(productUpdateDto.getName());
            }
            if (productUpdateDto.getDescription() != null) {
                product.setDescription(productUpdateDto.getDescription());
            }
            if (productUpdateDto.getPrice() != null) {
                product.setPrice(productUpdateDto.getPrice());
            }
            if (productUpdateDto.getStock() != null) {
                product.setStock(productUpdateDto.getStock());
            }
            return Optional.of(productRepository.save(product));
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteProduct(String id) {
        return productRepository.findById(id).map(product -> {
            productRepository.delete(product);
            return true;
        }).orElse(false);
    }

}
