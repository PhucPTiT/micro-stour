"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@workspace/ui/components/sidebar";
import { TerminalSquareIcon } from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

// This is sample data.
const data = {
    user: {
        name: "admin",
        email: "admin@example.com",
        avatar: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: <TerminalSquareIcon />,
            isActive: true,
            items: [
                {
                    title: "Tenant Management",
                    url: "/tenant-management/a",
                },
                {
                    title: "Company Management",
                    url: "/company-management/b",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <div
                className="
                flex h-16 shrink-0 items-center gap-2 px-4 transition-[height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
            "
            />
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
