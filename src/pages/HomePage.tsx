export default function HomePage() {
    return (
        <div id="home" className="home-page page">
            <section id="my-week" className="my-week">
                <div className="summary">
                    <h1>Suas Aulas</h1>
                    <button className="special show-schedule">
                        <i className="fa-solid fa-calendar"></i>
                        Programação Semanal
                        </button>
                    <div className="current-previous-next-class">
                        <div className="current-class">
                            <div className="texts">
                                <p>Atual (Disciplina - Professor):</p>
                                <h2>Esta aula não possui tema</h2>
                            </div>
                            <div className="files">
                                <h6>Arquivos</h6>
                                <ul className="files-list list">
                                    <li>
                                        <button>
                                            <i className="bi bi-file-earmark"></i>
                                            Arquivo
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="bi bi-file-earmark"></i>
                                            Arquivo
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="bi bi-file-earmark"></i>
                                            Arquivo
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="bi bi-file-earmark"></i>
                                            Arquivo
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="bi bi-file-earmark"></i>
                                            Arquivo
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="shortcuts">
                                <h6>Atalhos</h6>
                                <ul className="shortcuts-list list">
                                    <li>
                                        <button>
                                            <i className="bi bi-book"></i>
                                            Disciplina
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="bi bi-clipboard"></i>
                                            Tarefas
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="bi bi-journal"></i>
                                            Caderno
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="previous-class first-layer-element">
                            <p>Anterior:</p>
                            <h5>Disciplina</h5>
                        </div>
                        <div className="next-class first-layer-element">
                            <p>Próxima:</p>
                            <h5>Disciplina</h5>
                        </div>
                    </div>
                </div>	

                <hr/>

                <h2>Agenda de Hoje</h2>
                <div className="all-classes">
                    <div className="class first-layer-element">
                        <div>
                            <div className="class-time">
                                <i className="bi bi-clock"></i>
                                <p>X:XX - X:XX</p>
                            </div>
                            <p className="class-subject">Disciplina</p>
                        </div>
                        <div>
                            <h5>O tema da aula ainda não foi definido</h5>
                            <p>Prof. Nome</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="my-tasks" className="my-tasks">
                <h1>Suas Tarefas</h1>
            </section>

            <section id="my-subjects">
                <h1>Suas Disciplinas</h1>
            </section>
        </div>
    );
}
