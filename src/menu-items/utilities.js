// assets
import {
  AppstoreAddOutlined,
  FileFilled,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import PersonIcon from '@mui/icons-material/Person';
// icons
const icons = {
  PersonIcon,
  FileFilled,
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - manager ||============================== //

const manager = {
  id: 'manager',
  title: 'Manager',
  type: 'group',
  children: [
    {
      id: 'Manager-user',
      title: 'Maneger User',
      type: 'item',
      url: '/ListUser',
      icon: icons.PersonIcon
    },
    {
      id: 'Manager-file',
      title: 'Maneger File',
      type: 'item',
      url: '/AllFiles',
      icon: icons.FileFilled
    },
    {
      id: 'Manager-package',
      title: 'Maneger Package',
      type: 'item',
      url: '/Package',
      icon: icons.BgColorsOutlined
    }
  ]
};

export default manager;
