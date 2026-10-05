import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/i18n";
import { NAV_ITEMS, isNavItemActive } from "@/config/navigation";

export function AppSidebar() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();

  // Close the mobile drawer after navigating
  const closeOnMobile = () => isMobile && setOpenMobile(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link to="/home" onClick={closeOnMobile} />}
              tooltip={t.common.appName}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#DC4C2C] text-white">
                <BookOpen className="size-4 stroke-[2.5]" />
              </div>
              <span className="font-bold text-lg text-[#DC4C2C] tracking-tight">
                {t.common.appName}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.nav.sectionLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const label = t.nav[item.labelKey];
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={isNavItemActive(item, pathname)}
                      tooltip={label}
                      render={<Link to={item.to} onClick={closeOnMobile} />}
                    >
                      <item.icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {user && (
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm group-data-[collapsible=icon]:hidden">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F3EFE6] border border-[#E5DFD3] font-semibold text-[#DC4C2C]">
                  {user.name.charAt(0)}
                </div>
                <div className="grid leading-tight min-w-0">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-gray-500">
                    {user.email}
                  </span>
                </div>
              </div>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t.header.signOut}
              onClick={() => {
                signOut();
                navigate("/");
              }}
            >
              <LogOut />
              <span>{t.header.signOut}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
