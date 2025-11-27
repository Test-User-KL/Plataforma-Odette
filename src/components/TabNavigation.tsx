import React from "react";
import type { DragEvent } from "react";
import type { Tab } from "../types/tabs";

type TabNavigationProps = {
    tabs: Tab[];
    activeTabId: number;
    onSelect: (tabId: number) => void;
    onClose: (tabId: number) => void;
    onDragStart: (event: DragEvent<HTMLDivElement>, tabId: number) => void;
    onDragOver: (event: DragEvent<HTMLDivElement>) => void;
    onDrop: (tabId: number) => void;
};

export default function TabNavigation({
    tabs,
    activeTabId,
    onSelect,
    onClose,
    onDragStart,
    onDragOver,
    onDrop,
}: TabNavigationProps) {
    return (
        <nav className="tab-nav">
            {tabs.map((tab, index) => {
                const isActive = tab.id === activeTabId;
                const nextTabIsActive = tabs[index + 1]?.id === activeTabId;
                const isLast = index === tabs.length - 1;

                const shouldShowSeparator = !isActive && !nextTabIsActive && !isLast;

                return (
                    <React.Fragment key={tab.id}>
                        <div
                            className={"tab-button" + (isActive ? " active-tab" : "")}
                            onClick={() => onSelect(tab.id)}
                            draggable
                            onDragStart={(e) => onDragStart(e, tab.id)}
                            onDragOver={onDragOver}
                            onDrop={() => onDrop(tab.id)}
                        >
                            <div className="tab-text">
                                <i className={tab.iconClass}></i>
                                <span className="tab-title">{tab.title}</span>
                            </div>
                            <span
                                className="close-tab"
                                title="Fechar aba"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose(tab.id);
                                }}
                            >
                                <i className="fa fa-times"></i>
                            </span>
                        </div>

                        <div
                            className="tab-separator"
                            style={{ opacity: shouldShowSeparator ? 1 : 0 }}
                        ></div>
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
