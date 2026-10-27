package com.uis.tallerSR.controller;

import com.uis.tallerSR.dto.ProductCreateDto;
import com.uis.tallerSR.dto.ProductUpdateDto;
import com.uis.tallerSR.model.Product;
import com.uis.tallerSR.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAll(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable String id){
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Product> create(@Valid @RequestBody ProductCreateDto newProduct){
        return ResponseEntity.ok(productService.createProduct(newProduct));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable String id, @Valid @RequestBody ProductUpdateDto updatedProduct){
        return productService.updateProduct(id, updatedProduct)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
