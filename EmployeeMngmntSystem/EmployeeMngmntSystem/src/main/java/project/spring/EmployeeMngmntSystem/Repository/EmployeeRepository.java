package project.spring.EmployeeMngmntSystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.spring.EmployeeMngmntSystem.Entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
