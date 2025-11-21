import React, { useState } from "react";
import "./App.css";

type Tab = {
	id: number;
	title: string;
};

export default function App() {
	const [tabs, setTabs] = useState<Tab[]>([
		{ id: 1, title: "Nova Aba" },
	]);
	const [activeTabId, setActiveTabId] = useState<number>(1);
	const [draggedTabId, setDraggedTabId] = useState<number | null>(null);

	function handleNewTab() {
		const newTab: Tab = {
		id: Date.now(),
		title: "Nova Aba",
		};

		setTabs((prev) => [...prev, newTab]);
		setActiveTabId(newTab.id);
	}

	function handleCloseTab(id: number) {
		if (tabs.length === 1) return;

		setTabs((prevTabs) => {
		const index = prevTabs.findIndex((t) => t.id === id);
		if (index === -1) return prevTabs;

		const newTabs = [...prevTabs];
		newTabs.splice(index, 1);

		if (activeTabId === id) {
			const newActive =
			newTabs[index - 1]?.id ?? newTabs[index]?.id ?? newTabs[0].id;
			setActiveTabId(newActive);
		}

		return newTabs;
		});
	}

	function handleDragStart(
		e: React.DragEvent<HTMLDivElement>,
		id: number
	) {
		setDraggedTabId(id);
		e.dataTransfer.effectAllowed = "move";
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	function handleDrop(targetId: number) {
		if (draggedTabId === null || draggedTabId === targetId) return;

		setTabs((prevTabs) => {
		const newTabs = [...prevTabs];
		const fromIndex = newTabs.findIndex((t) => t.id === draggedTabId);
		const toIndex = newTabs.findIndex((t) => t.id === targetId);

		if (fromIndex === -1 || toIndex === -1) return prevTabs;

		const [moved] = newTabs.splice(fromIndex, 1);
		newTabs.splice(toIndex, 0, moved);

		return newTabs;
		});

		setDraggedTabId(null);
	}

	const activeTab = tabs.find((t) => t.id === activeTabId);

	function renderActiveTabContent() {
		let fadeOrder = 0;
		const nextFadeStyle = (): React.CSSProperties =>
			({ "--fade-order": fadeOrder++ } as React.CSSProperties);
		const fadeIn = (className: string) => ({
			className: `${className} animate-fade-in`,
			style: nextFadeStyle(),
		});

		return (
			<div key={activeTabId} className="new-tab-page">
				<section id="my-week" className="my-week">
					<h1 {...fadeIn("")}>Aulas do Dia</h1>
					<div className="current-previous-next-class">
						<div {...fadeIn("current-class")}>
							<p>Aula em Andamento - Disciplina:</p>
							<h2>Tema da Aula</h2>
							<div className="files">
								<div className="file">
									<i className={'fa-regular fa-file'}></i>
									<p>Arquivo</p>
								</div>
								Esta aula não possui anexos.
							</div>
						</div>
						<div {...fadeIn("previous-class")}>
							<p>Aula Anterior:</p>
							<h5>Disciplina</h5>
						</div>
						<div {...fadeIn("next-class")}>
							<p>Próxima Aula:</p>
							<h5>Disciplina</h5>
						</div>
					</div>

					<hr {...fadeIn("")}/>

					<h2 {...fadeIn("")}>Todas as Aulas</h2>
				</section>

				<section id="my-tasks" className="my-tasks">
					<h1 {...fadeIn("")}>Suas Tarefas</h1>
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque vitae quae placeat aspernatur eligendi laudantium iure voluptatibus perferendis provident quibusdam veritatis doloribus numquam, mollitia ut rem repudiandae, blanditiis voluptatum corporis culpa ipsam? Suscipit sed minima facilis asperiores quae at impedit voluptates recusandae consectetur praesentium, distinctio temporibus est et iste repellat quod odit enim. Blanditiis quos expedita porro minus explicabo distinctio, ad recusandae, ullam officia suscipit sed amet voluptatum? Tenetur quidem esse ipsam fugit. Aspernatur corporis sequi molestiae, laboriosam ea nostrum voluptatem veniam nesciunt aliquam et aliquid ducimus earum est recusandae amet inventore praesentium a fugiat asperiores aperiam dolores dolore explicabo facilis enim? Soluta animi tenetur, earum molestias quaerat ex, blanditiis quas saepe deleniti aut vel eligendi, ab ipsam doloremque qui. Saepe aliquid excepturi repudiandae aspernatur eveniet libero quas distinctio placeat iste laudantium. Dolor veritatis voluptates officia repellendus dolorem exercitationem maxime odio, qui rerum ipsam, repellat voluptate, adipisci quas non perferendis hic doloremque libero dolorum? Earum nostrum exercitationem neque tempore, quas ratione numquam, nisi ipsa fuga temporibus cumque veniam, perspiciatis unde! Reprehenderit, dignissimos corrupti maxime maiores quaerat delectus rem, ut esse harum sequi at, voluptas quo aperiam pariatur sed vero nostrum itaque ad error architecto fuga quae et. Molestiae, eum aspernatur tempore ad, labore tempora corrupti suscipit aperiam vel tenetur eligendi maxime dicta laudantium unde earum nulla. Atque qui recusandae nostrum natus, consequuntur deserunt totam. Magnam, a explicabo laboriosam laudantium ipsum, aliquam repellat accusantium odio quibusdam tempore architecto, debitis ipsa minima quo numquam illo. Ratione culpa voluptates magnam sequi accusantium molestias corrupti repellendus ex sed corporis, quisquam aliquam rerum ipsam sit aperiam tempora consectetur laudantium vitae quasi ipsum architecto nobis assumenda! Illo asperiores repellendus possimus laboriosam odio molestias dolorem reprehenderit magnam, ex cumque exercitationem neque corrupti alias, adipisci sequi, dignissimos voluptate laborum delectus maiores quod sit dolore! Nobis architecto repellat dolore nam quam sint reprehenderit, minima nemo sapiente! Adipisci et fugiat reprehenderit quod pariatur rerum voluptatum praesentium quis enim dolores illum id cupiditate, animi tempora nesciunt quia libero cumque minima aperiam incidunt. Vel ad facilis reprehenderit praesentium. Nulla ea distinctio vero quidem commodi similique assumenda molestias voluptates repellendus inventore. Optio deserunt eius illum nesciunt sunt est, culpa dolore consequuntur ab necessitatibus quo nisi ullam doloremque dolorem, omnis corporis odio? Accusamus cumque dolor dolorum? Exercitationem optio, ipsum commodi animi suscipit labore repudiandae corporis dolorum vel nisi autem cum nihil voluptatem nemo praesentium dolor recusandae similique maiores quasi veritatis doloribus? Iure quaerat maxime obcaecati quas ipsam consectetur quam iusto vel nisi, doloribus ab nesciunt facere veniam accusamus exercitationem eligendi dolorem dolorum consequatur beatae sint vero ea, quidem aliquid. Ea consequatur, iure, in ullam praesentium natus libero quasi mollitia amet alias neque fugiat non sint architecto pariatur rerum expedita odit. Consequuntur adipisci, provident ipsum maxime iusto quam, repellendus quis asperiores dolorem obcaecati placeat porro reprehenderit minima hic qui eos perspiciatis aut officiis illo dignissimos soluta error minus. Itaque obcaecati doloremque quidem, doloribus assumenda voluptates reiciendis, ullam sequi minima asperiores excepturi quaerat unde et officiis quod laudantium rem velit labore adipisci deleniti dignissimos, facere accusantium! Ex atque adipisci consequatur quod exercitationem labore dicta amet ab, et temporibus optio ratione sunt beatae aliquam iure enim minima possimus, doloribus fuga aperiam doloremque blanditiis molestiae mollitia velit. Sunt labore voluptates illo voluptate, doloremque aliquid corrupti recusandae cupiditate. Vero, veniam recusandae dolore obcaecati velit doloribus vel esse incidunt eligendi sequi perspiciatis sint, cum reprehenderit voluptatibus sed officia nostrum a alias praesentium illo. Eos consectetur nostrum repudiandae cumque ut suscipit itaque quas atque non maxime repellat ex doloribus eveniet, optio architecto facilis saepe a dolorum rem temporibus quam velit tenetur maiores! Tempore a, dolor sit, placeat repudiandae commodi voluptatum assumenda earum dolorem, culpa ipsa vel? Qui vero ipsam molestiae incidunt sed quos, ducimus impedit assumenda totam, amet architecto voluptatem vel dolor iure minima maxime maiores, inventore eligendi. Debitis optio dicta consectetur at tempora rem quam numquam quas commodi impedit, consequatur vitae, repudiandae veniam, illo cupiditate eius? Animi, unde officia enim ut atque tempora consequatur aut? Exercitationem accusantium totam aliquam quia sapiente explicabo corporis nobis voluptates quod, aperiam sint illo quidem, ipsam dolorum omnis quis vitae facere accusamus iste eligendi? Possimus non ipsam eligendi soluta omnis? Accusantium reiciendis dolorem quaerat, voluptatem asperiores, nam veritatis facilis porro eaque non excepturi, at recusandae ullam eius eveniet quo eos? Velit sed ex eveniet cum quas impedit officia fugit, non qui. Ipsum officiis deserunt similique ipsa obcaecati laboriosam iure at maiores odit laudantium reiciendis non molestias, nobis saepe repudiandae. Perspiciatis quaerat obcaecati at illum in? Voluptatem qui facere eos a illo tempora non vero laborum delectus, rerum, est placeat pariatur ullam consequuntur autem expedita fugit commodi dolores ducimus. Pariatur ut, possimus doloribus expedita quasi laudantium optio enim quod hic et at, fuga quos omnis aliquid non reiciendis inventore modi delectus voluptatibus porro, consequatur necessitatibus veniam dolor sunt? Iste, omnis! Quos ex nostrum fugit provident voluptatum assumenda temporibus voluptate hic repellat reiciendis obcaecati earum eius rem, aut vero maiores inventore distinctio eveniet quod quis quia atque officiis! Odio optio qui aliquid iste ullam saepe nihil maiores earum impedit, veniam repellendus reprehenderit, autem magni illum ea nobis inventore deleniti quod. In neque vel aspernatur molestias quasi cum velit nihil dolor temporibus eos voluptate aperiam sequi facere molestiae deserunt nesciunt corporis harum, odio itaque sunt ipsum maxime iusto placeat repellendus! Eos dolorum explicabo necessitatibus animi ab libero natus provident quo facere non odit est quae molestiae cupiditate fuga accusantium inventore rerum, dolorem a quaerat voluptas blanditiis. Ad, voluptatibus quia veniam fuga similique accusamus ab aliquam nesciunt autem quam quibusdam adipisci sint iste distinctio minus quis, libero assumenda fugiat asperiores harum deleniti? Vel, tenetur, ex ducimus sint, quis impedit iste error a perspiciatis fuga tempora libero recusandae eaque suscipit minus. Aut, magnam totam minima officiis temporibus asperiores nemo, ad ducimus vitae debitis dolor corrupti recusandae similique itaque veniam nihil perspiciatis minus? Ad in fuga cupiditate ipsa! Aliquam enim ratione iusto eaque et at hic nihil veniam veritatis nesciunt, nobis libero temporibus cupiditate quia eligendi aperiam alias fugiat impedit! Neque nostrum architecto dignissimos illum inventore odit? Harum totam mollitia non.</p>
				</section>

				<footer className="home-nav">
					<nav>
						<a href="#my-week">
							<i className="fa-regular fa-clock"></i>
							Aulas
						</a>
						<a href="#my-tasks">
							<i className="fa-solid fa-clipboard-list"></i>
							Tarefas
						</a>
						<a href="#my-calendar">
							<i className="fa-regular fa-calendar"></i>
							Calendário
						</a>
						<a href="#my-subjects">
							<i className="fa-solid fa-graduation-cap"></i>
							Disciplinas
						</a>
					</nav>
				</footer>
			</div>
		);
	}

	return (
		<>
			<header className="tab-header">
				<button
					id="new-tab"
					onClick={handleNewTab}
					className="new-tab-button"
					title="Nova aba"
				>
					<i className="fa-solid fa-plus"></i>
				</button>

				<nav className="tab-nav">
					{tabs.map((tab, index) => {
						const isActive = tab.id === activeTabId;
						const nextTabIsActive = tabs[index + 1]?.id === activeTabId;
						const isLast = index === tabs.length - 1;

						const shouldShowSeparator =
						!isActive && !nextTabIsActive && !isLast;

						return (
							<React.Fragment key={tab.id}>
								<div
									className={
										"tab-button" + (isActive ? " active-tab" : "")
									}
									onClick={() => setActiveTabId(tab.id)}
									draggable
									onDragStart={(e) => handleDragStart(e, tab.id)}
									onDragOver={handleDragOver}
									onDrop={() => handleDrop(tab.id)}
								>
									<span className="tab-title">{tab.title}</span>
									<span
										className="close-tab"
										title="Fechar aba"
										onClick={(e) => {
										e.stopPropagation();
										handleCloseTab(tab.id);
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
			</header>

			<main className="tab-content">
				{activeTab && renderActiveTabContent()}
			</main>
		</>
	);
}
