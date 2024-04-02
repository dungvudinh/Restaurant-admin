

class Employee 
{
    receptionistView(req, res)
    {
        res.render('employee/receptionist', {layout:'noSidebar'});
    }
    cashierView(req, res)
    {
        res.render('employee/cashier', {layout:'noSidebar'});
    }

}

module.exports = new Employee;