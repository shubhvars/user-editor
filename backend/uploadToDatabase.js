/**
 * Script to upload all manual content and images to database
 * This uploads images to Cloudinary and inserts content into MongoDB
 */

require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Content Schema
const contentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General', trim: true },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

contentSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

const Content = mongoose.model('Content', contentSchema);

// Image folder path (relative to backend folder)
const IMAGE_FOLDER = path.join(__dirname, '..', 'admin-portal', 'public', 'images', 'manual');

// Upload image to Cloudinary
async function uploadImage(imagePath, imageName) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'erpica-manual',
      public_id: imageName.replace(/\.[^/.]+$/, ''), // Remove extension
      resource_type: 'image'
    });
    console.log(`✓ Uploaded: ${imageName}`);
    return result.secure_url;
  } catch (error) {
    console.error(`✗ Failed to upload ${imageName}:`, error.message);
    return null;
  }
}

// Upload all images and get URL mapping
async function uploadAllImages() {
  console.log('\n📸 Uploading images to Cloudinary...\n');

  const imageMap = {};
  const files = fs.readdirSync(IMAGE_FOLDER).filter(f =>
    f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.jpg')
  );

  console.log(`Found ${files.length} images to upload\n`);

  for (const file of files) {
    const filePath = path.join(IMAGE_FOLDER, file);
    const url = await uploadImage(filePath, file);
    if (url) {
      imageMap[file] = url;
    }
  }

  console.log(`\n✅ Uploaded ${Object.keys(imageMap).length} images\n`);
  return imageMap;
}

// Generate content with Cloudinary URLs
function generateContent(imageMap) {
  const IMG = (name) => imageMap[name] || `/images/manual/${name}`;

  return [
    {
      title: "What is ERPICA?",
      category: "Introduction",
      order: 1,
      isPublished: true,
      content: `
        <p>ERPICA enables organizations to manage their HR and project operations through a unified platform. It supports the complete employee lifecycle from onboarding to retirement or resignation and includes robust features for asset management, payroll, attendance and other essential administrative processes.</p>
      `
    },
    {
      title: "What is HRMS?",
      category: "Introduction",
      order: 2,
      isPublished: true,
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
      title: "Creating a New Account",
      category: "Getting Started",
      order: 3,
      isPublished: true,
      content: `
        <h3>Registration Steps</h3>
        <ol>
          <li>Open the Sign Up page: Create New Account</li>
          <li>Fill in all required details (company email, password, company info, address, contact, and currency)</li>
          <li>Review the information and click <strong>Sign Up</strong> to complete registration</li>
        </ol>
        <img src="${IMG('page5_img1.png')}" alt="Registration Form" />

        <h3>Email Verification & Account Activation</h3>
        <p>Once you sign up, a verification link will be sent to your email. Open it, verify your account and then proceed to complete your company details.</p>
        <img src="${IMG('page6_img1.png')}" alt="Email Verification" />

        <h3>Sign In to Your Account</h3>
        <p>After your account is verified, return to the portal and sign in using your registered email address and password to access and manage your company details.</p>
      `
    },
    {
      title: "Roles in ERPICA",
      category: "Getting Started",
      order: 4,
      isPublished: true,
      content: `
        <h3>Owner</h3>
        <p>The Owner is the person who creates the company account in ERPICA for the first time. Only the Owner can purchase a subscription and has full control over the system. The Owner can assign Admins to manage employees, assets, Business Locations, and other company operations.</p>
        <img src="${IMG('page7_img1.png')}" alt="Owner Role" />

        <h3>Admin</h3>
        <p>An Admin is appointed by the Owner. Admins have full operational control similar to the Owner, including managing employees, business locations, assets, and departments. However, subscription purchase and management are exclusively handled by the Owner.</p>
        
        <h3>Employee</h3>
        <p>An Employee is a member of the organization working in an official role. Employees can access ERPICA based on the permissions given to them. They can view their tasks, attendance, leave details, payroll information, and other features allowed by the Owner or Admin.</p>

        <h3>Set Up Your Account</h3>
        <p>ERPICA offers dedicated dashboards to simplify both employee and organizational management.</p>
        <img src="${IMG('page8_img1.png')}" alt="Dashboard Overview" />
        <img src="${IMG('page8_img2.png')}" alt="HRMS Dashboard" />
      `
    },
    {
      title: "Config Settings",
      category: "Configuration",
      order: 5,
      isPublished: true,
      content: `
        <p>From the Config Settings page, you can manage all essential company setup including subscription, company settings, password updates, policies, notices, and departments.</p>

        <h3>Manage Subscription</h3>
        <p>The Manage Subscription page allows users to view their current subscription and plans, upgrade or downgrade plans, access billing details, and use a pricing calculator to estimate subscription costs.</p>
        <img src="${IMG('page9_img1.png')}" alt="Manage Subscription" />

        <h3>Company Settings</h3>
        <p>Fill in all company details for future reference and system configuration.</p>
        <img src="${IMG('page10_img1.png')}" alt="Company Settings" />

        <h3>Update Password</h3>
        <p>You can update your password by entering your current password and setting a new password from the company settings page.</p>
        <img src="${IMG('page10_img2.png')}" alt="Update Password" />

        <h3>Company Policies</h3>
        <p>All company related policies such as HR guidelines, leave policies and other organizational rules can be published or unpublished from this section.</p>
        <img src="${IMG('page11_img1.png')}" alt="Company Policies" />

        <h3>Company Notices</h3>
        <p>Company notices are official messages shared by the organization to inform employees about important updates, announcements, or instructions.</p>
        <ul>
          <li>Company holidays and office closures</li>
          <li>Policy updates or changes</li>
          <li>New joining announcements</li>
          <li>Internal transfers or promotions</li>
          <li>Maintenance or system downtime alerts</li>
        </ul>
        <img src="${IMG('page12_img1.png')}" alt="Company Notices" />
      `
    },
    {
      title: "Departments",
      category: "Organization Structure",
      order: 6,
      isPublished: true,
      content: `
        <p>In a company, a department is a specific group or unit that handles a particular function or area of work.</p>

        <h3>Common Departments</h3>
        <ul>
          <li><strong>Human Resources</strong> – Hiring, payroll, employee policies</li>
          <li><strong>Accounts</strong> – Budgeting, payments, salaries</li>
          <li><strong>Sales</strong> – Selling products or services</li>
          <li><strong>Operations</strong> – Day-to-day business activities</li>
          <li><strong>IT / Tech</strong> – Systems, software, data support</li>
        </ul>

        <h3>How to Add Departments</h3>
        <ol>
          <li>Visit Department Tab in Config Setting Dashboard</li>
          <li>Click on <strong>Add New Department</strong></li>
          <li>Mention the department code and department name</li>
          <li>Click <strong>Submit</strong></li>
        </ol>
        <img src="${IMG('page13_img1.png')}" alt="Departments Management" />
        <img src="${IMG('page16_img1.png')}" alt="Department List" />

        <h3>Assign Departments to Business Locations</h3>
        <img src="${IMG('page17_img1.png')}" alt="Assign Department" />
        <img src="${IMG('page18_img1.png')}" alt="Department Assignment" />
        <img src="${IMG('page18_img2.png')}" alt="View Assigned Departments" />
      `
    },
    {
      title: "Business Locations",
      category: "Organization Structure",
      order: 7,
      isPublished: true,
      content: `
        <p>A <strong>Business Location</strong> refers to a specific work location, unit, or assignment within a company. It can be a physical site, department, client project, or any designated place where employees are deployed.</p>

        <h3>How to Create a Business Location</h3>
        <p>The Owner can create a Business Location by entering the required location details along with the Owner's email address in the form.</p>
        <img src="${IMG('page14_img1.png')}" alt="Create Business Location" />
        <img src="${IMG('page14_img2.png')}" alt="Business Location Form" />

        <h3>Check Created Business Locations</h3>
        <img src="${IMG('page14_img3.png')}" alt="Business Locations Dashboard" />
      `
    },
    {
      title: "Creating Employees",
      category: "Employee Management",
      order: 8,
      isPublished: true,
      content: `
        <p>Employees can be created by the Owner, Admin, or any authorized employee who has permission.</p>

        <h3>Steps for Creating a New Employee</h3>
        <ol>
          <li>Go to <strong>HRMS → Employee</strong> from the left menu</li>
          <li>Click the <strong>+ Add Employee</strong> button</li>
          <li>Fill in details: Name, Employee Code, Business Location, Mobile, Email, Password</li>
          <li>Click <strong>Submit</strong></li>
        </ol>
        <img src="${IMG('page20_img1.png')}" alt="Add Employee Form" />

        <h3>Bulk Employee Creation</h3>
        <p>ERPICA provides a <strong>Bulk Employee Upload</strong> option for uploading large amounts of employee data at once.</p>
        <img src="${IMG('page21_img1.png')}" alt="Bulk Upload Option" />
        <img src="${IMG('page21_img2.png')}" alt="Bulk Upload Template" />
        <img src="${IMG('page22_img1.png')}" alt="Employee Transfer" />
      `
    },
    {
      title: "Employee Details & Permissions",
      category: "Employee Management",
      order: 9,
      isPublished: true,
      content: `
        <p>View registered employees business-location wise and check detailed employee information.</p>
        <img src="${IMG('page23_img1.png')}" alt="Employee Details View" />

        <h3>Employee Information Includes</h3>
        <ul>
          <li>Employee Information & Address</li>
          <li>Emergency Contact Details</li>
          <li>Education & Experience Details</li>
          <li>Bank Details</li>
          <li>Aadhaar & PAN Details</li>
          <li>Transfer Employee</li>
          <li>Add Permissions</li>
        </ul>

        <h3>Add Permissions</h3>
        <p>Assign employee access module-wise. Permissions can be set as <strong>Read Only</strong> or <strong>Read & Write</strong>.</p>
        <img src="${IMG('page26_img1.png')}" alt="Permissions Settings" />
      `
    },
    {
      title: "Assets",
      category: "Asset Management",
      order: 10,
      isPublished: true,
      content: `
        <p>Assets are items owned by a company that have value and are used for business operations.</p>

        <h3>Common Examples of Assets</h3>
        <ul>
          <li>Computer/Laptop/Monitors, Mobile phones, Vehicles</li>
          <li>Computer Software, Printers, Scanners</li>
          <li>Tools and devices, Office furniture</li>
        </ul>
        <img src="${IMG('page27_img1.jpeg')}" alt="Assets Overview" />
        <img src="${IMG('page27_img2.png')}" alt="Assets List" />

        <h3>Dashboard</h3>
        <p>Quick snapshot of all company assets - assigned, available, expired, under maintenance or disposed.</p>
        <img src="${IMG('page28_img1.png')}" alt="Asset Dashboard" />
        <img src="${IMG('page29_img1.png')}" alt="Asset Details" />
        <img src="${IMG('page29_img2.png')}" alt="Asset Actions" />

        <h3>Editing Asset Details</h3>
        <img src="${IMG('page30_img1.png')}" alt="Edit Asset" />
        <img src="${IMG('page30_img2.png')}" alt="Asset Status" />
        <img src="${IMG('page31_img1.png')}" alt="Asset History" />
        <img src="${IMG('page32_img1.png')}" alt="Asset View" />

        <h3>Asset Type & Add Asset</h3>
        <img src="${IMG('page33_img1.png')}" alt="Asset Types" />
        <img src="${IMG('page34_img1.jpeg')}" alt="Add Asset" />
        <img src="${IMG('page35_img1.png')}" alt="Asset Tickets" />
      `
    },
    {
      title: "Attendance Management",
      category: "Attendance",
      order: 11,
      isPublished: true,
      content: `
        <h3>Dashboard</h3>
        <p>Quick view of who is present, pending approval and unmarked attendance.</p>
        <img src="${IMG('page35_img2.png')}" alt="Attendance Dashboard" />
        <img src="${IMG('page36_img1.png')}" alt="Attendance Overview" />

        <h3>Mark Attendance</h3>
        <p>Employees follow rules set by owner. Location-based marking and camera capture can be enabled.</p>

        <h3>Attendance Rules & Policy</h3>
        <ul>
          <li><strong>Location Based:</strong> Attendance within assigned location</li>
          <li><strong>Approval Required:</strong> Manager approval needed</li>
          <li><strong>Photo Capture:</strong> Mandatory photo while marking</li>
        </ul>
        <img src="${IMG('page38_img1.png')}" alt="Attendance Policy" />
        <img src="${IMG('page39_img1.jpeg')}" alt="Location Radius" />
        <img src="${IMG('page39_img2.png')}" alt="Attendance Rules" />
        <img src="${IMG('page40_img1.png')}" alt="Working Hours" />
        <img src="${IMG('page40_img2.png')}" alt="Policy Update" />

        <h3>Approvals</h3>
        <img src="${IMG('page41_img1.png')}" alt="Attendance Approvals" />
      `
    },
    {
      title: "Expense Management",
      category: "Expenses",
      order: 12,
      isPublished: true,
      content: `
        <p>Company expenses are costs incurred by employees during business operations.</p>

        <h3>Common Examples</h3>
        <ul>
          <li>Travel and conveyance</li>
          <li>Food and accommodation</li>
          <li>Office rent and utilities</li>
          <li>Client meetings and events</li>
        </ul>

        <h3>Dashboard</h3>
        <img src="${IMG('page43_img1.png')}" alt="Expense Dashboard" />
        <img src="${IMG('page44_img1.png')}" alt="Expense Details" />
        <img src="${IMG('page45_img1.png')}" alt="Expense Approval" />

        <h3>Add Expenses</h3>
        <img src="${IMG('page46_img1.png')}" alt="Add Expense" />
        <img src="${IMG('page46_img2.png')}" alt="Subcategories" />
        <img src="${IMG('page47_img1.png')}" alt="Expense Categories" />
        <img src="${IMG('page47_img2.png')}" alt="Expense Submission" />

        <h3>Wallet Management</h3>
        <img src="${IMG('page48_img1.png')}" alt="Wallet Management" />
        <img src="${IMG('page48_img2.jpeg')}" alt="Wallet Details" />

        <h3>Employee Expense Summary</h3>
        <img src="${IMG('page49_img1.png')}" alt="Expense Summary" />
        <img src="${IMG('page49_img2.png')}" alt="Expense Report" />
        <img src="${IMG('page50_img1.png')}" alt="Wallet Deduction" />
      `
    },
    {
      title: "Leave Management",
      category: "Leave Management",
      order: 13,
      isPublished: true,
      content: `
        <p>Leaves are officially approved days off that employees can take with prior permission.</p>

        <h3>Common Types of Leaves</h3>
        <ul>
          <li><strong>Casual Leave (CL)</strong> – Short-term personal needs</li>
          <li><strong>Sick Leave (SL)</strong> – Health-related reasons</li>
          <li><strong>Earned Leave (EL/PL)</strong> – Accumulated leave</li>
          <li><strong>Maternity/Paternity Leave</strong></li>
          <li><strong>Compensatory Off</strong> – For working on holidays</li>
        </ul>

        <h3>Leave Balance</h3>
        <img src="${IMG('page52_img1.png')}" alt="Leave Balance" />

        <h3>Leave Requests</h3>
        <img src="${IMG('page53_img1.png')}" alt="Leave Requests" />

        <h3>Leave Policy</h3>
        <img src="${IMG('page54_img1.png')}" alt="Leave Policy" />
        <img src="${IMG('page55_img1.png')}" alt="Leave Settings" />
        <img src="${IMG('page56_img1.png')}" alt="Leave Types" />
        <img src="${IMG('page57_img1.png')}" alt="Leave Config" />
        <img src="${IMG('page58_img1.png')}" alt="Assign Policy" />
        <img src="${IMG('page58_img2.png')}" alt="Leave Assignment" />
      `
    },
    {
      title: "Task Manager",
      category: "Task Manager",
      order: 14,
      isPublished: true,
      content: `
        <p>Task Manager is where you add all important task details - description, plant, department, and tags.</p>

        <h3>Creating a Workspace</h3>
        <ol>
          <li>Click on <strong>Create Workspace</strong></li>
          <li>Enter Workspace Name and Description</li>
          <li>Submit</li>
        </ol>
        <img src="${IMG('page59_img1.png')}" alt="Create Workspace" />
        <img src="${IMG('page60_img1.png')}" alt="Workspace Form" />
        <img src="${IMG('page61_img1.png')}" alt="Workspace Created" />
        <img src="${IMG('page62_img1.png')}" alt="Add Tags" />
        <img src="${IMG('page62_img2.png')}" alt="Add Links" />

        <h3>Project Management</h3>
        <img src="${IMG('page63_img1.png')}" alt="Project Management" />

        <h3>Task Board</h3>
        <p>Task categories: Backlog, Todo, In Progress, Under Review, Completed.</p>
        <img src="${IMG('page65_img1.png')}" alt="Task Board" />
        <img src="${IMG('page65_img2.png')}" alt="Task Columns" />
        <img src="${IMG('page66_img1.png')}" alt="Task Details" />
        <img src="${IMG('page67_img1.png')}" alt="Subtasks" />
      `
    },
    {
      title: "Payroll",
      category: "Payroll",
      order: 15,
      isPublished: true,
      content: `
        <p>Payroll means calculating employee pay, subtracting deductions, and releasing salary on time.</p>

        <h3>Define Batches</h3>
        <p>Divide payrolls by employment types - contract, trainees, new, existing employees.</p>
        <img src="${IMG('page68_img1.png')}" alt="Payroll Batches" />
        <img src="${IMG('page68_img2.png')}" alt="Batch Details" />
        <img src="${IMG('page69_img1.png')}" alt="Assign Batch" />

        <h3>Allowances</h3>
        <p>Create and control allowances added to employee salary.</p>
        <img src="${IMG('page70_img1.png')}" alt="Allowances" />
        <img src="${IMG('page71_img1.png')}" alt="Create Allowance" />

        <h3>Deductions</h3>
        <p>Amounts subtracted from salary including PF, company deductions, attendance adjustments.</p>
        <img src="${IMG('page73_img1.png')}" alt="Deductions" />
        <img src="${IMG('page74_img1.png')}" alt="Deduction Details" />

        <h3>Payroll Settings</h3>
        <img src="${IMG('page75_img1.png')}" alt="Payroll Settings" />
        <img src="${IMG('page76_img1.png')}" alt="Payslip Settings" />

        <h3>Run Payroll</h3>
        <img src="${IMG('page78_img1.png')}" alt="Run Payroll" />
        <img src="${IMG('page78_img2.png')}" alt="Payroll Summary" />
      `
    }
  ];
}

// Main function
async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  ERPICA User Manual - Database Upload');
  console.log('═══════════════════════════════════════════\n');

  try {
    // Connect to MongoDB
    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Upload images to Cloudinary
    const imageMap = await uploadAllImages();

    // Clear existing content
    console.log('🗑️  Clearing existing content...');
    await Content.deleteMany({});
    console.log('✅ Cleared existing content\n');

    // Generate content with Cloudinary URLs
    const contentData = generateContent(imageMap);

    // Insert content into database
    console.log('📝 Inserting content into database...\n');
    for (const item of contentData) {
      const content = new Content(item);
      await content.save();
      console.log(`✓ Added: ${item.title}`);
    }

    console.log('\n═══════════════════════════════════════════');
    console.log('  ✅ Upload Complete!');
    console.log(`  📸 Images: ${Object.keys(imageMap).length}`);
    console.log(`  📄 Sections: ${contentData.length}`);
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

main();
