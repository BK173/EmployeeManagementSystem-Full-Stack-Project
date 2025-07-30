package project.spring.EmployeeMngmntSystem.Service;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.spring.EmployeeMngmntSystem.Dto.EmployeeDto;
import project.spring.EmployeeMngmntSystem.Entity.Employee;
import project.spring.EmployeeMngmntSystem.Exception.ResourceNotFoundException;
import project.spring.EmployeeMngmntSystem.Mapper.EmployeeMapper;
import project.spring.EmployeeMngmntSystem.Repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class EmployeeServiceImp implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.MapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.MapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isEmpty()) {
            throw new RuntimeException("employee id is not found");
        }
        Employee emp_id = employee.get();
        return EmployeeMapper.MapToEmployeeDto(emp_id);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> getAllEmployees = employeeRepository.findAll();
        return getAllEmployees.stream().map((employee) -> EmployeeMapper.MapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updatedEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee Id is not Exist:"+employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updated = employeeRepository.save(employee);
        return EmployeeMapper.MapToEmployeeDto(updated);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee Id is not Exist:"+employeeId)
        );
        employeeRepository.deleteById(employeeId);
    }
}