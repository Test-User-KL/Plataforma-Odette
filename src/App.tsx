import { useState } from "react";
import "./App.css";

type Tab = {
  id: number;
  title: string;
};

export default function App() {
  const [tabs] = useState<Tab[]>([
    { id: 1, title: "Principal" },
  ]);

  const [activeTabId, setActiveTabId] = useState<number>(1);

  function handleNewTab() {
    console.log("Futuro: criar nova aba");
  }

  return (
    <>
		<header className="tab-header">
			<button id="new-tab" onClick={handleNewTab} className="new-tab-button">
				<i className="fas fa-plus"></i>
			</button>
			<nav className="tab-nav">
				{tabs.map((tab) => (
					<button
					key={tab.id}
					className={
						"tab-button" +
						(tab.id === activeTabId ? " tab-button--active" : "")
					}
					onClick={() => setActiveTabId(tab.id)}
					>
					{tab.title}
					</button>
				))}
			</nav>
		</header>

		<main className="tab-content">
			{activeTabId === 1 && (
			<div>
				<h1>Conteúdo da aba principal</h1>
				<p>Aqui vai o app, painel, etc.</p>
			</div>
			)}
		</main>
	</>
  );
}
