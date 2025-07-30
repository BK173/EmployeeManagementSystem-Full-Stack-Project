package project.spring.EmployeeMngmntSystem.Mapper;

import project.spring.EmployeeMngmntSystem.Dto.EmployeeDto;
import project.spring.EmployeeMngmntSystem.Entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto MapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }
    public static Employee MapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
