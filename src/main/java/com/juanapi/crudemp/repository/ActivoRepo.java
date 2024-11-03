package com.juanapi.crudemp.repository;

import com.juanapi.crudemp.model.Activo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivoRepo extends JpaRepository<Activo, Long> {

}
