import Vue from 'vue'
import { 
    Button, 
    Menu, 
    Submenu, 
    MenuItemGroup, 
    MenuItem,
    Input,
    Table,
    TableColumn,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Col,
    DatePicker,
    TimePicker,
    Dialog,
    Tree,
    MessageBox,
    Message,
    Upload,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    PageHeader, 
    Select,
    Option,
    Avatar,
} from 'element-ui'

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(PageHeader);
Vue.use(Select);
Vue.use(Option);
Vue.use(Avatar);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;