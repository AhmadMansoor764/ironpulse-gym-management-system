import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaUserFriends,
  FaReceipt,
  FaUser,
  FaBell,
  FaCalendarAlt,
  FaCommentAlt,
  FaSearch,
  FaDumbbell,
} from "react-icons/fa";

const navigation = [
  {
    name: "Dashboard",
    path: "/layout/dashboard",
    icon: FaThLarge,
  },
  {
    name: "Members",
    path: "/layout/members",
    icon: FaUserFriends,
  },
  {
    name: "Expenses",
    path: "/layout/expenses",
    icon: FaReceipt,
  },
  {
    name: "Profile",
    path: "/layout/profile",
    icon: FaUser,
  },
];

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to logout");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111111] text-white">
      {/* =====================================================
          DESKTOP SIDEBAR
          ===================================================== */}

      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-50
          hidden
          w-[270px]
          border-r
          border-[#292929]
          bg-[#191919]
          lg:flex
          lg:flex-col
        "
      >
        {/* LOGO */}

        <div className="px-[18px] pt-[18px]">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-start gap-3 text-left"
          >
            {/* Logo Icon */}

            <div
              className="
                mt-1
                flex
                h-[28px]
                w-[28px]
                shrink-0
                items-center
                justify-center
                text-[#c6ff00]
              "
            >
              <FaDumbbell className="text-[25px]" />
            </div>

            {/* Logo Text */}

            <div>
              <h1
                className="
                  text-[22px]
                  font-black
                  leading-[22px]
                  tracking-[-1px]
                  text-[#c6ff00]
                "
              >
                IRONPULSE
              </h1>

              <p
                className="
                  mt-[3px]
                  text-[13px]
                  font-semibold
                  tracking-[0.4px]
                  text-[#d4d6b7]
                "
              >
                Elite Performance
              </p>
            </div>
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="mt-8 px-[15px]">
          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    group
                    flex
                    h-[40px]
                    w-full
                    items-center
                    gap-4
                    rounded-[9px]
                    px-[18px]
                    text-left
                    transition-all
                    duration-200

                    ${
                      active
                        ? "bg-[#c6ff00] text-[#111111]"
                        : "text-[#d4d6b7] hover:bg-[#252525] hover:text-white"
                    }
                  `}
                >
                  <Icon
                    className={`
                      shrink-0
                      text-[18px]
                      transition-transform
                      duration-200
                      group-hover:scale-105

                      ${active ? "text-[#111111]" : "text-[#d4d6b7]"}
                    `}
                  />

                  <span
                    className={`
                      text-[15px]
                      font-semibold
                      tracking-[0.2px]
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* SPACER */}

        <div className="flex-1" />

        {/* ADD MEMBER */}

        <div className="px-[15px]">
          <button
            onClick={() => navigate("/layout/addmember")}
            className="
              flex
              h-[40px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-[9px]
              bg-[#c6ff00]
              text-[14px]
              font-bold
              tracking-[0.2px]
              text-[#111111]
              transition-all
              duration-200
              hover:brightness-105
              active:scale-[0.98]
            "
          >
            <span className="text-[20px] leading-none">+</span>
            Add New Member
          </button>
        </div>

        {/* DIVIDER */}

        <div className="mx-[15px] my-7 border-t border-[#292929]" />

        {/* BOTTOM SIDEBAR ACTIONS */}

        <div className="mb-5 px-[15px]">
          <button
            onClick={handleLogout}
            className="
              mt-1
              flex
              h-[40px]
              w-full
              items-center
              gap-4
              rounded-[9px]
              px-[18px]
              text-[#d4d6b7]
              transition
              hover:bg-[#252525]
              hover:text-white
            "
          >
            <span className="text-[20px]">↪</span>

            <span className="text-[15px] font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN APPLICATION AREA
          ===================================================== */}

      <div className="min-h-screen lg:ml-[270px]">
        {/* ===================================================
    HEADER
    =================================================== */}
        <header
          className="
    sticky
    top-0
    z-40
    h-[64px]
    border-b
    border-[#292929]
    bg-[#111111]/95
    backdrop-blur-xl
    lg:hidden
  "
        >
          <div
            className="
      flex
      h-full
      items-center
      justify-between
      px-5
    "
          >
            {/* MOBILE LOGO / NAME */}

            <button
              onClick={() => navigate("/layout/dashboard")}
              className="
        flex
        items-center
        gap-3
      "
            >
              <div
                className="
          flex
          h-[34px]
          w-[34px]
          items-center
          justify-center
          rounded-full
          border
          border-[#343434]
          bg-[#1d1d1d]
        "
              >
                <FaDumbbell className="text-[16px] text-[#c6ff00]" />
              </div>

              <span
                className="
          text-[25px]
          font-extrabold
          tracking-[-1px]
        "
              >
                IronPulse
              </span>
            </button>

            {/* PROFILE */}

            <button
              onClick={() => navigate("/layout/profile")}
              aria-label="Open profile"
              className="
        flex
        h-10
        w-10
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-[#343434]
        bg-[#1d1d1d]
        transition
        hover:border-[#c6ff00]
        active:scale-95
      "
            >
              <FaUser className="text-[16px] text-[#d4d6b7]" />
            </button>
          </div>
        </header>
        {/* ===================================================
            PAGE CONTENT
            =================================================== */}
        <main className="min-w-0 pb-[92px] lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          ===================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-[100]
          h-[76px]
          border-t
          border-[#393939]
          bg-[#171717]/98
          px-2
          backdrop-blur-xl
          lg:hidden
        "
      >
        <div
          className="
            mx-auto
            grid
            h-full
            w-full
            grid-cols-4
            items-center
          "
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="
                  relative
                  flex
                  h-full
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  overflow-hidden
                "
              >
                {/* ACTIVE PILL */}

                {active && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-[8px]
                      h-[42px]
                      w-[72px]
                      -translate-x-1/2
                      rounded-full
                      bg-[#c6ff00]
                    "
                  />
                )}

                {/* ICON */}

                <Icon
                  className={`
                    relative
                    z-10
                    text-[18px]
                    transition-all
                    duration-200

                    ${active ? "text-black" : "text-[#d4d6b7]"}
                  `}
                />

                {/* LABEL */}

                <span
                  className={`
                    relative
                    z-10
                    max-w-full
                    truncate
                    px-1
                    text-[10px]
                    leading-none

                    ${
                      active
                        ? "font-bold text-black"
                        : "font-medium text-[#d4d6b7]"
                    }
                  `}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default DashboardLayout;
