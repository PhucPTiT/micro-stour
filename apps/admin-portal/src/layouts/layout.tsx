import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";

export function ShellLayout() {
    return (
        <SidebarProvider>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 fixed top-0 left-0 right-0  bg-background/80 backdrop-blur border-b z-11">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <AppSidebar />
            <SidebarInset>
                <main className="flex-1 p-4 lg:p-6 pt-20! transition-[padding-top] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:pt-16!">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
