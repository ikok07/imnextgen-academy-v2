export const Routes = {
    home: "/",
    account: {
        setup: "/account/setup"
    },
    auth: {
        base: "/auth",
        signIn: () => `${Routes.auth.base}/sign-in`,
        signUp: () => `${Routes.auth.base}/sign-up`,
    },
    dashboard: {
        base: "/dashboard",
        classroom: {
            base: "/dashboard/classroom",
            module: (id: string) => `${Routes.dashboard.classroom.base}/module/${id}`,
        },
        events: {
            base: () => `${Routes.dashboard.base}/events`
        },
        shop: {
            base: () => `${Routes.dashboard.base}/shop`,
            payment: (productIds: string[], hasSubscription: boolean) => `${Routes.dashboard.shop.base()}/payment?productIds=${productIds}&hasSubscription=${hasSubscription}`,
            paymentSuccess: () => `${Routes.dashboard.shop.base()}/payment-success`,
            creditSuccess: () => `${Routes.dashboard.shop.base()}/credit-success`,
        },
        admin: {
            base: () => `${Routes.dashboard.base}/admin`,
            users: () => `${Routes.dashboard.admin.base()}/users`,
            media: () => `${Routes.dashboard.admin.base()}/media`,
            module: (moduleId: string) => `${Routes.dashboard.admin.media()}/module/${moduleId}`,
            section: (moduleId: string, sectionId: string) => `${Routes.dashboard.admin.module(moduleId)}/section/${sectionId}`,
            video: (moduleId: string, sectionId: string, videoId: string) => `${Routes.dashboard.admin.section(moduleId, sectionId)}/video/${videoId}`,
        }
    }
}