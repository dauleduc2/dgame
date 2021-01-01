import Cart from "../components/Cart";
import HomePage from "../containers/HomePage/index";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import CommonCategory from "../components/Category/CommonCategory";
import signInPage from "../components/login";
import AssignmentIndSharpIcon from "@material-ui/icons/AssignmentIndSharp";
import signUpPage from "../components/register";
import SearchPage from "../components/SearchPage";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Wishlist from "../components/Wishlist";
import NotFoundPage from "../components/notFoundPage";
export const CONTENT_ROUTES = [
  {
    path: "/",
    exact: true,
    name: "Home Page",
    component: HomePage,
    icon: <HomeIcon />,
  },
  {
    path: "/cart",
    exact: true,
    name: "Cart",
    component: Cart,
    icon: <ShoppingCartIcon />,
  },
  {
    path: "/Wishlist",
    exact: true,
    name: "Wishlist",
    component: Wishlist,
    icon: <FavoriteIcon />,
  },
  {
    exact: true,
    name: "Category",
    icon: <CategoryIcon />,
  },
];
export const CATEGORY_ROUTES = [
  {
    path: "/category/horror",
    type: "Horror",
    exact: true,
    name: "Horror",
    component: CommonCategory,
  },
  {
    path: "/category/action",
    type: "Action",
    exact: true,
    name: "Action",
    component: CommonCategory,
  },
  {
    path: "/category/adventure",
    type: "Adventure",
    exact: true,
    name: "Adventure",
    component: CommonCategory,
  },
  {
    path: "/category/racing",
    type: "Racing",
    exact: true,
    name: "Racing",
    component: CommonCategory,
  },
];

export const routeNotInclideInSideBar = [
  {
    path: "/signIn",
    exact: true,
    name: "Sign in",
    component: signInPage,
  },
  {
    path: "/signUp",
    exact: true,
    name: "Sign up",
    component: signUpPage,
  },
  {
    path: "/search",
    exact: false,
    name: "search",
    component: SearchPage,
  },
];
