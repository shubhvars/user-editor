// ERPICA User Manual - Structured Data with Images
// This file contains all content from the ERPICA User Manual PDF

const IMG_BASE = '/images/manual';

export const manualData = {
  title: "ERPICA User Manual",
  subtitle: "Complete Guide for HR Management System",
  sections: [
    {
      id: "what-is-erpica",
      category: "Introduction",
      title: "What is ERPICA?",
      order: 1,
      content: `
        <p>ERPICA enables organizations to manage their HR and project operations through a unified platform. It supports the complete employee lifecycle from onboarding to retirement or resignation and includes robust features for asset management, payroll, attendance and other essential administrative processes.</p>
      `
    },
    {
      id: "what-is-hrms",
      category: "Introduction",
      title: "What is HRMS?",
      order: 2,
      content: `
        <p>A Human Resource Management System is a software solution that helps organizations manage and automate their HR processes. It brings all HR functions into one digital platform so companies can handle employee information, workflows and administrative tasks more efficiently.</p>
        <h3>Key Features of HRMS</h3>
        <ul>
          <li><strong>Employee records</strong> - Centralized employee database</li>
          <li><strong>Onboarding and offboarding</strong> - Streamlined processes</li>
          <li><strong>Attendance and leave tracking</strong> - Real-time monitoring</li>
          <li><strong>Payroll processing</strong> - Automated salary calculations</li>
          <li><strong>Performance management</strong> - Reviews and appraisals</li>
          <li><strong>Asset tracking</strong> - Company asset management</li>
          <li><strong>Expenses Tracking</strong> - Expense claims and reimbursements</li>
          <li><strong>Recruitment support</strong> - Hiring workflows</li>
          <li><strong>Reports and analytics</strong> - Data-driven insights</li>
        </ul>
      `
    },
    {
      id: "create-account",
      category: "Getting Started",
      title: "Creating a New Account",
      order: 3,
      content: `
        <h3>Registration Steps</h3>
        <ol>
          <li>Open the Sign Up page: Create New Account</li>
          <li>Fill in all required details (company email, password, company info, address, contact, and currency)</li>
          <li>Review the information and click <strong>Sign Up</strong> to complete registration</li>
        </ol>
        <img src="${IMG_BASE}/page5_img1.png" alt="Registration Form" class="manual-image" />

        <h3>Email Verification & Account Activation</h3>
        <p>Once you sign up, a verification link will be sent to your email. Open it, verify your account and then proceed to complete your company details.</p>
        <img src="${IMG_BASE}/page6_img1.png" alt="Email Verification" class="manual-image" />

        <h3>Sign In to Your Account</h3>
        <p>After your account is verified, return to the portal and sign in using your registered email address and password to access and manage your company details.</p>
      `
    },
    {
      id: "roles",
      category: "Getting Started",
      title: "Roles in ERPICA",
      order: 4,
      content: `
        <h3>Owner</h3>
        <p>The Owner is the person who creates the company account in ERPICA for the first time. Only the Owner can purchase a subscription and has full control over the system. The Owner can assign Admins to manage employees, assets, Business Locations, and other company operations.</p>
        <img src="${IMG_BASE}/page7_img1.png" alt="Owner Role" class="manual-image" />

        <h3>Admin</h3>
        <p>An Admin is appointed by the Owner. Admins have full operational control similar to the Owner, including managing employees, business locations, assets, and departments. However, subscription purchase and management are exclusively handled by the Owner.</p>
        
        <h3>Employee</h3>
        <p>An Employee is a member of the organization working in an official role. Employees can access ERPICA based on the permissions given to them. They can view their tasks, attendance, leave details, payroll information, and other features allowed by the Owner or Admin.</p>

        <h3>Set Up Your Account</h3>
        <p>ERPICA offers dedicated dashboards to simplify both employee and organizational management.</p>
        <img src="${IMG_BASE}/page8_img1.png" alt="Dashboard Overview" class="manual-image" />
        <img src="${IMG_BASE}/page8_img2.png" alt="HRMS Dashboard" class="manual-image" />
      `
    },
    {
      id: "config-settings",
      category: "Configuration",
      title: "Config Settings",
      order: 5,
      content: `
        <p>From the Config Settings page, you can manage all essential company setup including subscription, company settings, password updates, policies, notices, and departments.</p>

        <h3>Manage Subscription</h3>
        <p>The Manage Subscription page allows users to view their current subscription and plans, upgrade or downgrade plans, access billing details, and use a pricing calculator to estimate subscription costs.</p>
        <img src="${IMG_BASE}/page9_img1.png" alt="Manage Subscription" class="manual-image" />

        <h3>Company Settings</h3>
        <p>Fill in all company details for future reference and system configuration.</p>
        <img src="${IMG_BASE}/page10_img1.png" alt="Company Settings" class="manual-image" />

        <h3>Update Password</h3>
        <p>You can update your password by entering your current password and setting a new password from the company settings page.</p>
        <img src="${IMG_BASE}/page10_img2.png" alt="Update Password" class="manual-image" />

        <h3>Company Policies</h3>
        <p>All company related policies such as HR guidelines, leave policies and other organizational rules can be published or unpublished from this section. Once published, these policies become visible to all employees.</p>
        <img src="${IMG_BASE}/page11_img1.png" alt="Company Policies" class="manual-image" />

        <h3>Company Notices</h3>
        <p>Company notices are official messages shared by the organization to inform employees about important updates, announcements, or instructions.</p>
        <p><strong>Common examples of company notices:</strong></p>
        <ul>
          <li>Company holidays and office closures</li>
          <li>Policy updates or changes</li>
          <li>New joining announcements</li>
          <li>Internal transfers or promotions</li>
          <li>Maintenance or system downtime alerts</li>
          <li>Compliance or safety instructions</li>
          <li>Office events, trainings, or town halls</li>
        </ul>
        <img src="${IMG_BASE}/page12_img1.png" alt="Company Notices" class="manual-image" />
      `
    },
    {
      id: "departments",
      category: "Organization Structure",
      title: "Departments",
      order: 6,
      content: `
        <p>In a company, a department is a specific group or unit that handles a particular function or area of work. Each department has its own responsibilities, goals, and expertise, but all departments work together to run the company smoothly.</p>

        <h3>Common Departments</h3>
        <ul>
          <li><strong>Human Resources</strong> – Hiring, payroll, employee policies, performance management</li>
          <li><strong>Accounts</strong> – Budgeting, payments, salaries, financial reporting</li>
          <li><strong>Sales</strong> – Selling products or services, client acquisition</li>
          <li><strong>Business Development</strong> – Branding, promotions, social media, campaigns</li>
          <li><strong>Operations</strong> – Day-to-day business activities</li>
          <li><strong>IT / Tech</strong> – Systems, software, data, and tech support</li>
          <li><strong>Admin</strong> – Office management, documentation, coordination</li>
          <li><strong>Service</strong> – Engineers & Project Manager</li>
        </ul>

        <h3>How to Add Departments</h3>
        <ol>
          <li>Visit Department Tab in Config Setting Dashboard</li>
          <li>Click on <strong>Add New Department</strong></li>
          <li>Mention the department code and department name</li>
          <li>Click <strong>Submit</strong></li>
        </ol>
        <img src="${IMG_BASE}/page13_img1.png" alt="Departments Management" class="manual-image" />

        <h3>Department List View</h3>
        <p>After submission, departments will appear in a list format where you can manage them.</p>
        <img src="${IMG_BASE}/page16_img1.png" alt="Department List" class="manual-image" />

        <h3>How to Assign Departments to Business Locations</h3>
        <ol>
          <li>Click on <strong>Assign Department</strong></li>
          <li>A popup will appear</li>
          <li>Select a Business Location & the department to assign</li>
        </ol>
        <img src="${IMG_BASE}/page17_img1.png" alt="Assign Department" class="manual-image" />
        <img src="${IMG_BASE}/page18_img1.png" alt="Department Assignment Popup" class="manual-image" />
        <img src="${IMG_BASE}/page18_img2.png" alt="View Assigned Departments" class="manual-image" />
      `
    },
    {
      id: "business-locations",
      category: "Organization Structure",
      title: "Business Locations",
      order: 7,
      content: `
        <p>In ERPICA, a <strong>Business Location</strong> refers to a specific work location, unit, or assignment within a company. It can be a physical site, department, client project, or any designated place where employees are deployed.</p>

        <p>A Business Location can be a manufacturing unit, production site, warehouse, service center, office branch, or any single premises where business operations take place.</p>

        <h3>How to Create a Business Location</h3>
        <p>The Owner can create a Business Location by entering the required location details along with the Owner's email address in the form and submitting it.</p>
        <img src="${IMG_BASE}/page14_img1.png" alt="Create Business Location" class="manual-image" />
        <img src="${IMG_BASE}/page14_img2.png" alt="Business Location Form" class="manual-image" />

        <h3>Check Created Business Locations</h3>
        <p>Once created, the Business Locations will appear in the dashboard for management and assignment.</p>
        <img src="${IMG_BASE}/page14_img3.png" alt="Business Locations Dashboard" class="manual-image" />
      `
    },
    {
      id: "employee-management",
      category: "Employee Management",
      title: "Creating Employees",
      order: 8,
      content: `
        <p>Employees can be created by the Owner, Admin, or any authorized employee who has permission to create employees, using the Employee tab in the HRMS Dashboard.</p>

        <h3>Steps for Creating a New Employee</h3>
        <ol>
          <li>Go to <strong>HRMS → Employee</strong> from the left menu</li>
          <li>Click the <strong>+ Add Employee</strong> button on the top right</li>
          <li>The Add New Employee popup will open. Fill in the details:
            <ul>
              <li><strong>Name:</strong> Enter the employee's full name</li>
              <li><strong>Employee Code:</strong> Add a unique employee ID</li>
              <li><strong>Business Location:</strong> Select the business location</li>
              <li><strong>Mobile:</strong> Enter a valid mobile number</li>
              <li><strong>Email:</strong> Enter the official email ID</li>
              <li><strong>Password:</strong> Set a login password for the employee</li>
            </ul>
          </li>
          <li>Once all mandatory fields are filled, click <strong>Submit</strong></li>
        </ol>
        <img src="${IMG_BASE}/page20_img1.png" alt="Add Employee Form" class="manual-image" />

        <h3>Bulk Employee Creation</h3>
        <p>ERPICA also provides a <strong>Bulk Employee Upload</strong> option, which allows you to upload large amounts of employee data at once.</p>
        <img src="${IMG_BASE}/page21_img1.png" alt="Bulk Upload Option" class="manual-image" />
        <img src="${IMG_BASE}/page21_img2.png" alt="Bulk Upload Template" class="manual-image" />
        <img src="${IMG_BASE}/page22_img1.png" alt="Employee Transfer" class="manual-image" />
      `
    },
    {
      id: "employee-details",
      category: "Employee Management",
      title: "Employee Details & Permissions",
      order: 9,
      content: `
        <p>From the Employee tab, you can view registered employees business-location wise and check detailed employee information.</p>
        <img src="${IMG_BASE}/page23_img1.png" alt="Employee Details View" class="manual-image" />

        <h3>Employee Information Includes</h3>
        <ul>
          <li><strong>Employee Information</strong> - Basic details and address information</li>
          <li><strong>Emergency Contact Details</strong> - Emergency contact information</li>
          <li><strong>Education Details</strong> - Education history with documents</li>
          <li><strong>Experience Details</strong> - Work experience with documents</li>
          <li><strong>Bank Details</strong> - Account information for salary</li>
          <li><strong>Aadhaar & PAN Details</strong> - Identity documents for verification</li>
          <li><strong>Update Password</strong> - Change employee password</li>
          <li><strong>Transfer Employee</strong> - Transfer between locations/departments</li>
          <li><strong>Add Permissions</strong> - Assign module access</li>
        </ul>

        <h3>Add Permissions</h3>
        <p>From Add Permissions, you can assign employee access module-wise such as Attendance, Leave, Expenses, and more. For each feature, permissions can be set as <strong>Read Only</strong> or <strong>Read & Write</strong>.</p>
        <img src="${IMG_BASE}/page26_img1.png" alt="Permissions Settings" class="manual-image" />
      `
    },
    {
      id: "assets",
      category: "Asset Management",
      title: "Assets",
      order: 10,
      content: `
        <p>Assets are items owned by a company that have value and are used for business operations.</p>

        <h3>Common Examples of Assets</h3>
        <ul>
          <li>Computer/Laptop/Monitors with accessories, Mobile phones, Vehicles</li>
          <li>Computer Software, including Virus protection</li>
          <li>Labeling equipment, Copier, Printer, Scanner</li>
          <li>Telephone, Internet, Projector</li>
          <li>Tools and devices, Stamps and Postage</li>
          <li>Office furniture</li>
        </ul>
        <img src="${IMG_BASE}/page27_img1.jpeg" alt="Assets Overview" class="manual-image" />
        <img src="${IMG_BASE}/page27_img2.png" alt="Assets List" class="manual-image" />

        <h3>Dashboard</h3>
        <p>This section gives you a quick snapshot of all company assets. You can see how many assets are assigned, available, expired, under maintenance or disposed.</p>
        <img src="${IMG_BASE}/page28_img1.png" alt="Asset Dashboard Summary" class="manual-image" />
        <img src="${IMG_BASE}/page29_img1.png" alt="Asset Dashboard" class="manual-image" />
        <img src="${IMG_BASE}/page29_img2.png" alt="Asset Details" class="manual-image" />

        <h3>Editing Asset Details</h3>
        <p>These options are available for the owner to set the current status of the asset.</p>
        <img src="${IMG_BASE}/page30_img1.png" alt="Edit Asset" class="manual-image" />
        <img src="${IMG_BASE}/page30_img2.png" alt="Asset Status Options" class="manual-image" />

        <h3>Asset Actions</h3>
        <ul>
          <li>Once assigned to an employee, cannot reassign until transferred</li>
          <li>When unassigning, mention the return date</li>
          <li>For maintenance, repair, transfer - provide relevant dates</li>
        </ul>
        <img src="${IMG_BASE}/page31_img1.png" alt="Asset Actions" class="manual-image" />
        <img src="${IMG_BASE}/page31_img2.png" alt="Asset History" class="manual-image" />
        <img src="${IMG_BASE}/page32_img1.png" alt="Asset Status View" class="manual-image" />

        <h3>Asset Type</h3>
        <p>Mention the type of assets you have (software/equipment/device).</p>
        <img src="${IMG_BASE}/page33_img1.png" alt="Asset Types" class="manual-image" />

        <h3>Add Asset</h3>
        <img src="${IMG_BASE}/page34_img1.jpeg" alt="Add Asset Form" class="manual-image" />
        <img src="${IMG_BASE}/page34_img2.png" alt="Asset Description" class="manual-image" />

        <h3>Tickets</h3>
        <p>This section shows all asset transfer requests for the selected plant.</p>
        <img src="${IMG_BASE}/page35_img1.png" alt="Asset Tickets" class="manual-image" />
      `
    },
    {
      id: "attendance",
      category: "Attendance",
      title: "Attendance Management",
      order: 11,
      content: `
        <h3>Dashboard</h3>
        <p>The Attendance dashboard gives you a quick and clear view of who is present, pending for approval and who hasn't marked their attendance yet.</p>
        <img src="${IMG_BASE}/page35_img2.png" alt="Attendance Dashboard" class="manual-image" />
        <img src="${IMG_BASE}/page36_img1.png" alt="Attendance Overview" class="manual-image" />

        <h3>Mark Attendance</h3>
        <p>To mark attendance, the employee needs to follow the rules set by the owner. If location based marking is enabled, the employee must be within the assigned radius.</p>
        <p>If the owner has enabled the camera requirement, the employee will need to open the camera before submitting attendance.</p>

        <h3>Holidays</h3>
        <p>Company holidays are days when the office is closed. These are used for attendance and leave calculations.</p>
        <p><strong>Common types:</strong></p>
        <ul>
          <li>National holidays (Republic Day, Independence Day)</li>
          <li>Festival holidays (Diwali, Holi, Eid)</li>
          <li>Company-declared holidays</li>
          <li>Regional or state-specific holidays</li>
        </ul>

        <h3>Attendance Rules & Policy</h3>
        <p>Owner can control settings like:</p>
        <ul>
          <li><strong>Location Based:</strong> Attendance can only be marked within assigned location</li>
          <li><strong>Approval Required:</strong> Attendance needs manager approval</li>
          <li><strong>Photo Capture Required:</strong> Mandatory photo while marking</li>
          <li><strong>Select Location on Map:</strong> Set exact location for attendance</li>
        </ul>
        <img src="${IMG_BASE}/page38_img1.png" alt="Attendance Policy Settings" class="manual-image" />
        <img src="${IMG_BASE}/page39_img1.jpeg" alt="Location Radius Setting" class="manual-image" />
        <img src="${IMG_BASE}/page39_img2.png" alt="Attendance Rules" class="manual-image" />
        <img src="${IMG_BASE}/page40_img1.png" alt="Working Hours Settings" class="manual-image" />
        <img src="${IMG_BASE}/page40_img2.png" alt="Attendance Policy Update" class="manual-image" />

        <h3>Approvals</h3>
        <p>The owner can mark an employee's attendance manually without photo verification.</p>
        <img src="${IMG_BASE}/page41_img1.png" alt="Attendance Approvals" class="manual-image" />
      `
    },
    {
      id: "expenses",
      category: "Expenses",
      title: "Expense Management",
      order: 12,
      content: `
        <p>Company expenses are costs incurred by employees or the organization while carrying out business operations.</p>

        <h3>Common Examples</h3>
        <ul>
          <li>Travel and conveyance</li>
          <li>Food and accommodation during official travel</li>
          <li>Office rent and utilities</li>
          <li>Internet and phone bills</li>
          <li>Stationery and office supplies</li>
          <li>Client meetings and events</li>
          <li>Reimbursements to employees</li>
        </ul>

        <h3>Dashboard</h3>
        <p>The Expense Management Dashboard provides a complete overview of all employee expenses.</p>
        <img src="${IMG_BASE}/page43_img1.png" alt="Expense Dashboard" class="manual-image" />
        <img src="${IMG_BASE}/page44_img1.png" alt="Expense Details" class="manual-image" />
        <img src="${IMG_BASE}/page45_img1.png" alt="Expense Approval" class="manual-image" />

        <h3>Add Expenses</h3>
        <ol>
          <li>Click on Expense Policy</li>
          <li>Select the Plant</li>
          <li>Click on Custom Form Builder</li>
          <li>Fill out all the details about the expense type</li>
          <li>Submit the form</li>
        </ol>
        <img src="${IMG_BASE}/page46_img1.png" alt="Add Expense Form" class="manual-image" />
        <img src="${IMG_BASE}/page46_img2.png" alt="Add Subcategories" class="manual-image" />
        <img src="${IMG_BASE}/page47_img1.png" alt="Expense Categories" class="manual-image" />
        <img src="${IMG_BASE}/page47_img2.png" alt="Expense Submission" class="manual-image" />

        <h3>Wallet Management</h3>
        <p>Shows the remaining amount and pending requests by employees.</p>
        <img src="${IMG_BASE}/page48_img1.png" alt="Wallet Management" class="manual-image" />
        <img src="${IMG_BASE}/page48_img2.jpeg" alt="Wallet Details" class="manual-image" />

        <h3>Employee Expense Summary</h3>
        <img src="${IMG_BASE}/page49_img1.png" alt="Expense Summary" class="manual-image" />
        <img src="${IMG_BASE}/page49_img2.png" alt="Expense Report" class="manual-image" />
        <img src="${IMG_BASE}/page50_img1.png" alt="Wallet Deduction" class="manual-image" />
        <img src="${IMG_BASE}/page50_img2.png" alt="Expense Details View" class="manual-image" />
      `
    },
    {
      id: "leave-management",
      category: "Leave Management",
      title: "Leave Management",
      order: 13,
      content: `
        <p>Leaves are officially approved days off that employees can take from work with prior permission.</p>

        <h3>Common Types of Leaves</h3>
        <ul>
          <li><strong>Casual Leave (CL)</strong> – Short-term personal needs</li>
          <li><strong>Sick Leave (SL)</strong> – Health-related reasons</li>
          <li><strong>Earned or Privilege Leave (EL/PL)</strong> – Accumulated leave</li>
          <li><strong>Maternity Leave / Paternity Leave</strong></li>
          <li><strong>Compensatory Off</strong> – For working on holidays</li>
          <li><strong>Unpaid Leave (LWP)</strong> – When paid leave is exhausted</li>
        </ul>

        <h3>Leave Balance</h3>
        <p>Leave balance is the number of leave days an employee still has available.</p>
        <img src="${IMG_BASE}/page52_img1.png" alt="Leave Balance" class="manual-image" />

        <h3>Leave Requests</h3>
        <p>The Leave Requests section helps employers easily view, track and take action on all employee leave applications.</p>
        <img src="${IMG_BASE}/page53_img1.png" alt="Leave Requests" class="manual-image" />

        <h3>Leave Policy</h3>
        <p>Leave Policy is a set of company rules that define how, when, and how much leave employees can take.</p>
        <img src="${IMG_BASE}/page54_img1.png" alt="Leave Policy Overview" class="manual-image" />
        <img src="${IMG_BASE}/page55_img1.png" alt="Leave Policy Settings" class="manual-image" />
        <img src="${IMG_BASE}/page56_img1.png" alt="Leave Types" class="manual-image" />
        <img src="${IMG_BASE}/page57_img1.png" alt="Leave Configuration" class="manual-image" />
        <img src="${IMG_BASE}/page58_img1.png" alt="Assign Leave Policy" class="manual-image" />
        <img src="${IMG_BASE}/page58_img2.png" alt="Leave Assignment" class="manual-image" />
      `
    },
    {
      id: "task-manager",
      category: "Task Manager",
      title: "Task Manager",
      order: 14,
      content: `
        <p>Task Manager is the place where you can add all important details related to any task. You can specify the task description, select the plant, choose the department, and add relevant tags.</p>

        <h3>Creating a Workspace</h3>
        <ol>
          <li>Click on <strong>Create Workspace</strong></li>
          <li>Enter the Workspace Name</li>
          <li>Add a brief Description</li>
          <li>Submit it</li>
        </ol>
        <img src="${IMG_BASE}/page59_img1.png" alt="Create Workspace" class="manual-image" />
        <img src="${IMG_BASE}/page60_img1.png" alt="Workspace Form" class="manual-image" />
        <img src="${IMG_BASE}/page61_img1.png" alt="Workspace Created" class="manual-image" />
        <img src="${IMG_BASE}/page62_img1.png" alt="Add Tags" class="manual-image" />
        <img src="${IMG_BASE}/page62_img2.png" alt="Add Links" class="manual-image" />

        <h3>Project Management</h3>
        <p>Each project card shows project name, description, status, members, and created date.</p>
        <img src="${IMG_BASE}/page63_img1.png" alt="Project Management" class="manual-image" />

        <h3>Task Board</h3>
        <p>The Task Detail board visually displays every task category: Backlog, Todo, In Progress, Under Review, Completed.</p>
        <img src="${IMG_BASE}/page65_img1.png" alt="Task Board Overview" class="manual-image" />
        <img src="${IMG_BASE}/page65_img2.png" alt="Task Board Columns" class="manual-image" />
        <img src="${IMG_BASE}/page66_img1.png" alt="Task Details" class="manual-image" />
        <img src="${IMG_BASE}/page67_img1.png" alt="Task Subtasks" class="manual-image" />
      `
    },
    {
      id: "payroll",
      category: "Payroll",
      title: "Payroll",
      order: 15,
      content: `
        <p>Payroll means calculating how much each employee should be paid, subtracting any deductions, and then releasing their salary on time. It also includes keeping records, generating payslips, handling taxes, and making sure all compliance rules are followed.</p>

        <h3>Define Batches</h3>
        <p>In batches, you can divide different types of payrolls based on employment types (contract employees, trainees, new employees, existing employees).</p>
        <img src="${IMG_BASE}/page68_img1.png" alt="Payroll Batches" class="manual-image" />
        <img src="${IMG_BASE}/page68_img2.png" alt="Batch Details" class="manual-image" />
        <img src="${IMG_BASE}/page69_img1.png" alt="Assign to Batch" class="manual-image" />

        <h3>Allowances</h3>
        <p>This section lets you create and control different types of allowances added to employee salary.</p>
        <img src="${IMG_BASE}/page70_img1.png" alt="Allowances List" class="manual-image" />
        <img src="${IMG_BASE}/page71_img1.png" alt="Create Allowance" class="manual-image" />
        <p><strong>Allowance configuration includes:</strong></p>
        <ul>
          <li>Allowance Code – A short code (HRA, TA, SA)</li>
          <li>Allowance Name – Full name like House Rent Allowance</li>
          <li>Calculation Type – Fixed Amount or Percentage</li>
          <li>Taxable – Whether it affects taxable income</li>
          <li>PF / ESI / PT Applicable – Contribution calculations</li>
          <li>LOP Dependent – Reduction based on loss of pay</li>
        </ul>

        <h3>Deductions</h3>
        <p>Deductions are amounts subtracted from an employee's salary including Provident Fund, company-specific deductions, or adjustments.</p>
        <img src="${IMG_BASE}/page73_img1.png" alt="Deductions List" class="manual-image" />
        <img src="${IMG_BASE}/page74_img1.png" alt="Deduction Details" class="manual-image" />

        <h3>Payroll Settings</h3>
        <p>Define the start and end of the pay period along with the exact day employees get paid.</p>
        <img src="${IMG_BASE}/page75_img1.png" alt="Payroll Settings" class="manual-image" />

        <h3>Payslip Settings</h3>
        <p>Customize how your company's payslips look including company name, logo, address.</p>
        <img src="${IMG_BASE}/page76_img1.png" alt="Payslip Settings" class="manual-image" />

        <h3>Email Settings</h3>
        <p>Customize the emails that go out with payslips including automatic email sending toggle, email subject, and email body with dynamic variables.</p>

        <h3>Run Payroll</h3>
        <img src="${IMG_BASE}/page78_img1.png" alt="Run Payroll" class="manual-image" />
        <img src="${IMG_BASE}/page78_img2.png" alt="Payroll Summary" class="manual-image" />
      `
    }
  ]
};

export default manualData;
