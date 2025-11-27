export type TabView = "home" | "subjects" | "settings" | "account";

export type Tab = {
    id: number;
    title: string;
    iconClass: string;
    view: TabView;
};
