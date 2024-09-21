"use client";

import { 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenu, 
    NavbarMenuItem, 
    NavbarMenuToggle,
    Link,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Breadcrumbs,
    BreadcrumbItem,
    Input,
    Badge,
    Avatar,
} from "@nextui-org/react"
import { Icon } from "@iconify/react"
import { AcmeIcon } from "@/components/Icons/Acme"
import NotificationCard from "@/components/Layout/Nav/NotificationCard"
import { useAppStore } from "@/context/state";
import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect } from "react";
import WorldCoinWidgetData from "@/components/Auth/WorldCoinWidgetData";

const Nav = () => {
  const { isDynamicAuth, isWorldCoinAuth, handleLogout } = useAppStore();
  const isLoggedIn = useIsLoggedIn();
  const router = useTransitionRouter();

  useEffect(() => {
    if (isLoggedIn || !isDynamicAuth) return;
    
    handleLogout();
    router.push("/");
  }, [isLoggedIn]);

  return (
    <Navbar
        isBordered
        classNames={{
          item: "data-[active=true]:text-primary",
          wrapper: "px-4 sm:px-6",
        }}
        height="64px"
      >
        <NavbarBrand className="cursor-pointer" onClick={() => { router.push("/dashboard") }}>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden hidden" />
          <AcmeIcon />
          <p className="font-bold text-inherit">HodlHabits</p>
        </NavbarBrand>
        {/* <Breadcrumbs className="hidden sm:flex" radius="full">
          <BreadcrumbItem>Apps</BreadcrumbItem>
          <BreadcrumbItem>iOS App</BreadcrumbItem>
          <BreadcrumbItem>TestFlight</BreadcrumbItem>
        </Breadcrumbs> */}

        {/* Right Menu */}
        <NavbarContent className="ml-auto h-12 max-w-fit items-center gap-0" justify="end">
          {/* <NavbarItem className="mr-2 hidden lg:flex">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-content2 dark:bg-content1",
              }}
              labelPlacement="outside"
              placeholder="Search..."
              radius="full"
              startContent={
                <Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />
              }
            />
          </NavbarItem> */}
          {/* Mobile search */}
          {/* <NavbarItem className="lg:hidden">
            <Button isIconOnly radius="full" variant="light">
              <Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />
            </Button>
          </NavbarItem> */}
          {/* Theme change */}
          {/* <NavbarItem className="hidden lg:flex">
            <Button isIconOnly radius="full" variant="light">
              <Icon className="text-default-500" icon="solar:sun-linear" width={24} />
            </Button>
          </NavbarItem> */}
          {/* Settings */}
          {/* <NavbarItem className="hidden lg:flex">
            <Button isIconOnly radius="full" variant="light">
              <Icon className="text-default-500" icon="solar:settings-linear" width={24} />
            </Button>
          </NavbarItem> */}
          {/* Notifications */}
          {/* <NavbarItem className="flex">
            <Popover offset={12} placement="bottom-end">
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="overflow-visible"
                  radius="full"
                  variant="light"
                >
                  <Badge color="danger" content="5" showOutline={false} size="md">
                    <Icon className="text-default-500" icon="solar:bell-linear" width={22} />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                <NotificationCard className="w-full shadow-none" />
              </PopoverContent>
            </Popover>
          </NavbarItem> */}
          {/* User Menu */}
          <NavbarItem className="px-2">
            {/* <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="mt-1 h-8 w-8 transition-transform">
                  <Badge color="success" content="" placement="bottom-right" shape="circle">
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29526708c" />
                  </Badge>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2" textValue="johndoe@example.com">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">johndoe@example.com</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" textValue="logout">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            {
              isDynamicAuth &&
              <DynamicWidget /> 
            }

            {
              isWorldCoinAuth &&
              <WorldCoinWidgetData />
            }
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive>
            <Link aria-current="page" className="w-full" color="primary" href="#">
              Deployments
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Analytics
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Team
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Settings
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
  )
}

export default Nav