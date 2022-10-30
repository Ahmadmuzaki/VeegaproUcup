import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/HookRegister";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Transaction
import Transaction from '../pages/Transaction/index'

// Bonus
import Bonus from '../pages/Bonus/index';

// Referral
import Referral from '../pages/Referral/Referral';

// Reward
import Reward from '../pages/Reward/index';

// Promo
import Promo from '../pages/Promo/index'
import Detail from '../pages/Promo/DetailComponent';

//Account
import Account from '../pages/Account/index';

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

const authProtectedRoutes = [

	{ path: "/detail/:id", component: Detail },
	{ path: "/account", component: Account },
	{ path: "/promo", component: Promo },
	{ path: "/reward", component: Reward },
	{ path: "/referral", component: Referral },
	{ path: "/bonus", component: Bonus },
	{ path: "/transaction", component: Transaction },
	{ path: "/dashboard", component: Dashboard },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	{ path: "/lock-screen", component: AuthLockScreen },

	// Authentication Inner
	{ path: "/auth-login", component: Login1 },
	{ path: "/auth-register", component: Register1 },
	{ path: "/auth-recoverpw", component: ForgetPwd1 },

];

export { authProtectedRoutes, publicRoutes };
