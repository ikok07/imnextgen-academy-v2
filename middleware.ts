import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {Routes} from "@/app/_utils/nav/routes";
import {NextRequest, NextResponse} from "next/server";

function redirectMiddleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    if (url.pathname === "/dashboard") {
        url.pathname = Routes.dashboard.classroom.base;
        return NextResponse.redirect(url);
    }
}

const isPublicRoute = createRouteMatcher(["/", "/auth(.*)", "/api(.*)"])

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }

    return redirectMiddleware(req);
})

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg).*)"
    ],
}