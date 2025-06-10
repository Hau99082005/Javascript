// import { InputComponentProps } from "@/components/FormElements/InputComponent/page";

export const navOptions = [
    {
        id: "home",
        label: "Trang chủ",
        path: "/",
    },
    {
        id: "all-products",
        label: "Tất Cả Sản Phẩm",
        path: "/categories/all-products",
    },
    {
        id: "economy",
        label: "Kinh Tế",
        path: "/categories/economy",
    },
    {
        id: "skills",
        label: "Tâm Lý - Kỹ Năng Sống",
        path: "/categories/skills",
    },
       {
        id: "raise-children",
        label: "Nuôi Dạy Con",
        path: "/categories/raise-children",
    },
    {
        id: "children-books",
        label: "Sách thiếu nhi",
        path: "/categories/children-books"
    },
    {
        id: "biography",
        label: "Tiểu sử - Hồi Ký",
        path: "/categories/biography"
    },
    {
        id: "textbook",
        label: "Giáo khoa - tham khảo",
        path: "/categories/textbook",
    },
    {
        id: "foreign-language-books",
        label: "Sách Học Ngoại Ngữ",
        path: "categories/foreign-language-books"
    }
];



export const adminNavOptions = [
    {
        id: "admin",
        label: "Add  New Admin",
        path: "/admin-view/all-product",
    },
    {
        id: "adminNewProduct",
        label: "Add New Admin",
        path: "/admin-view/all-product",
    },
];


export const registrationFormControls = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Nhập vào tên của bạn',
        label: 'Họ Tên',
        componentType: 'input',
    },
       {
        id: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Nhập vào Email của bạn',
        componentType: 'input',
    },
       {
        id: 'password',
        type: 'password',
        label: 'Mật Khẩu',
        placeholder: 'Nhập vào mật khẩu của bạn',
        componentType: 'input',
    },
    {
        id: 'role',
        type: '',
        placeholder: '',
        label: 'Vai trò',
        componentType: 'select',
        options: [
            {
                id: 'admin',
                label: 'Admin',
            },
            {
                id: 'customer',
                label: 'Khách Hàng',
            },
        ],
    },
];


export const loginFormControls = [
    {
        id: "email",
        type: "email",
        placeholder: "Nhập email của bạn",
        componentType: "input",
        label: "Email",
    },
    {
        id: "password",
        type: "password",
        placeholder: "Nhập mật khẩu của bạn",
        componentType: "input",
        label: "Mật khẩu",
    },
];