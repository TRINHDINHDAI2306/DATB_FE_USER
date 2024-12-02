import { lazy } from "react";
import { ROUTES } from "../constants/route";
// pages
const Home = lazy(() => import("../page/HomePage"));
const Tours = lazy(() => import("../page/User/Diem-den/Tours"));
const CreateTour = lazy(() => import("../page/User/Tour/CreateTour"));
const TourAll = lazy(() => import("../page/User/Tour/tourAll"));
const Pay = lazy(() => import("../page/User/Thanh-toan/pay"));
const HdvAll = lazy(() => import("../page/User/HDV/hdvAll"));
const Dulich = lazy(() => import("../page/User/Diem-den/provinceDetails"));
const Personal = lazy(() => import("../page/User/PersonalPage/Personal"));
const News = lazy(() => import("../page/User/Tin-Tuc/News"));
const NewsDetail = lazy(() => import("../page/User/Tin-Tuc/NewsDetail"));
const TourDetail = lazy(() => import("../page/User/Tour/TourDetail"));
const Introduce = lazy(() => import("../page/introduce"));
const MyTrip = lazy(() => import("../page/User/PersonalPage/MyTrip"));
const Signin = lazy(() => import("../page/Auth/SignIn"));
const Signup = lazy(() => import("../page/Auth/SignUp"));
const Onboarding = lazy(() => import("../page/Onboarding"));
const Chat = lazy(() => import("../page/Chat/index.js"));
const newPost = lazy(() => import("../page/User/blog/NewPost.js"));
const setting = lazy(() => import("../page/User/PersonalPage/setting"));
const myPage = lazy(() => import("../page/Kenh_HDV/index"));
const addTour = lazy(() => import("../page/Kenh_HDV/QL_Tour/AddTour.js"));
const doanhthu = lazy(() => import("../page/Kenh_HDV/DoanhThu/index"));
const taikhoannganhang = lazy(() =>
  import("../page/Kenh_HDV/DoanhThu/BankAcc")
);
// const addVoucher = lazy(() => import("../page/Kenh_HDV/Voucher/AddVoucher"));
const DsTour = lazy(() => import("../page/Kenh_HDV/QL_Tour/index"));
const QlVoucher = lazy(() => import("../page/Kenh_HDV/Voucher/index"));
const Danhgia = lazy(() => import("../page/Kenh_HDV/QL_Tour/danhgia"));
const CaidatHdv = lazy(() => import("../page/Kenh_HDV/General/setting"));
const Donhang = lazy(() => import("../page/Kenh_HDV/QL_Tour/donhang"));
const tourfilter = lazy(() => import("../page/User/Tour/tourFilter"));
const Quenmk = lazy(() => import("../page/Auth/forgotpasswprd"));
const chitiet = lazy(() => import("../page/Kenh_HDV/QL_Tour/detailTour"));
const chitietOrder = lazy(() => import("../page/Kenh_HDV/QL_Tour/detailOrder"));
const activeTK = lazy(() => import("../page/Auth/activeAcc"));
const UpdatePay = lazy(() => import("../page/User/Thanh-toan/updatePay"));
const listPost = lazy(() => import("../page/User/Tin-Tuc/ListPost"));
const EditPost = lazy(() => import("../page/User/Tin-Tuc/EditPost"));
const ChatHdv = lazy(() => import("../page/Kenh_HDV/Chat/index"));
const yeucau = lazy(() => import("../page/Kenh_HDV/QL_Tour/yeucau"));

/**
 * define main pages routes
 */
const RoutePage = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: Tours,
  },
  {
    path: ROUTES.INTRODUCE,
    exact: true,
    component: Introduce,
  },
  {
    path: ROUTES.SIGNIN,
    exact: true,
    component: Signin,
  },
  {
    path: ROUTES.SIGNUP,
    exact: true,
    component: Signup,
  },
  {
    path: ROUTES.TOUR,
    exact: true,
    component: Home,
  },
  {
    path: ROUTES.CHAT,
    exact: true,
    component: Chat,
    authen: true,
  },
  {
    path: ROUTES.NEWPOST,
    exact: true,
    component: newPost,
    authen: true,
  },
  {
    path: ROUTES.CREATETOUR,
    exact: true,
    component: CreateTour,
    authen: true,
  },
  {
    path: ROUTES.LISTPOST,
    exact: true,
    component: listPost,
    authen: true,
  },
  {
    path: ROUTES.PAY,
    exact: true,
    authen: true,
    component: Pay,
  },
  {
    path: ROUTES.TOURALL,
    exact: true,
    component: TourAll,
  },
  {
    path: ROUTES.HDVALL,
    exact: true,
    component: HdvAll,
  },
  {
    path: ROUTES.DULICH,
    exact: true,
    component: Dulich,
  },
  {
    path: ROUTES.PERSONAL,
    exact: true,
    component: Personal,
  },
  {
    path: ROUTES.NEWS,
    exact: true,
    component: News,
  },
  {
    path: ROUTES.TOURDETAIL,
    exact: true,
    component: TourDetail,
  },
  {
    path: ROUTES.NEWSDETAIL,
    exact: true,
    component: NewsDetail,
  },
  {
    path: ROUTES.MYTRIP,
    exact: true,
    component: MyTrip,
    authen: true,
  },
  {
    path: ROUTES.EDITPOST,
    exact: true,
    component: EditPost,
    authen: true,
  },
  {
    path: ROUTES.ONBOARDING,
    exact: true,
    component: Onboarding,
  },
  {
    path: ROUTES.SETTING,
    exact: true,
    component: setting,
  },
  {
    path: ROUTES.MYPAGE,
    exact: true,
    component: myPage,
    authen: true,
    roles: ["TOURGUIDE"],
  },
  {
    path: ROUTES.ADDTOUR,
    exact: true,
    component: addTour,
    authen: true,
    roles: ["TOURGUIDE"],
  },
  {
    path: ROUTES.DOANHTHU,
    exact: true,
    component: doanhthu,
    authen: true,
    roles: ["TOURGUIDE"],
  },
  {
    path: ROUTES.BANKACC,
    exact: true,
    component: taikhoannganhang,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  // {
  //   path: ROUTES.ADDVOUCHER,
  //   exact: true,
  //   component: addVoucher,
  // },
  {
    path: ROUTES.DSTOUR,
    exact: true,
    component: DsTour,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  {
    path: ROUTES.CHATHDV,
    exact: true,
    component: ChatHdv,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  {
    path: ROUTES.QLVOUCHER,
    exact: true,
    component: QlVoucher,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  {
    path: ROUTES.THIETLAP,
    exact: true,
    component: CaidatHdv,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  {
    path: ROUTES.DANHGIA,
    exact: true,
    component: Danhgia,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  {
    path: ROUTES.DONHANG,
    exact: true,
    component: Donhang,
    roles: ["TOURGUIDE"],
    authen: true,
  },
  {
    path: ROUTES.TIMKIEMTOUR,
    exact: true,
    component: tourfilter,
  },
  {
    path: ROUTES.QUENMATKHAU,
    exact: true,
    component: Quenmk,
    authen: true,
  },
  {
    path: ROUTES.CHITIETTOUR,
    exact: true,
    component: chitiet,
    roles: ["TOURGUIDE"],
  },
  {
    path: ROUTES.CHITIETORDER,
    exact: true,
    component: chitietOrder,
    roles: ["TOURGUIDE"],
  },
  {
    path: ROUTES.YEUCAUCHUYENDI,
    exact: true,
    component: yeucau,
    roles: ["TOURGUIDE"],
  },
  {
    path: ROUTES.ACTIVETK,
    exact: true,
    component: activeTK,
  },
  {
    path: ROUTES.UPDATEPAY,
    exact: true,
    component: UpdatePay,
  },
];
export default RoutePage;
