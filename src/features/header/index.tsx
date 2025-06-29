import { href, NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/model/routers";
import styles from "./header.module.scss";

export function AppHeader() {
    const location = useLocation();
    return (
        <div className={styles["navbar"]}>
            <div className={styles["navbar__content"]}>
                <section className={`${styles["start"]} ${styles["navbar-section"]}`}>
                    {/*<Link to={ROUTES.HOME}>ВЭДО</Link>*/}
                    <NavLink to={ROUTES.HOME} className={({ isActive }) => isActive ? styles["link_active"] : ""}>
                        ВЭДО
                    </NavLink>
                </section>

                <section className={styles["center"]}>
                    <section className={styles["navbar-section"]}>
                        <NavLink to={ROUTES.TASKS} className={({ isActive }) => isActive ? styles["link_active"] : ""}>Задачи</NavLink>
                    </section>
                    <section className={styles["navbar-section"]}>
                        <NavLink to={href(ROUTES.DOCS, { docstype: 'all' })} className={location.pathname.startsWith("/docs") ? styles["link_active"] : ""}>Документы</NavLink>
                    </section>
                    <section className={styles["navbar-section"]}>
                        <NavLink to={href(ROUTES.DOCINFO, { doctype: 'all' })} className={location.pathname.startsWith("/doc-info") ? styles["link_active"] : ""}>О документах</NavLink>
                    </section>
                    <section className={styles["navbar-section"]}>
                        <NavLink to={ROUTES.REGISTATIONUSER} className={({ isActive }) => isActive ? styles["link_active"] : ""}>Новый пользователь</NavLink>
                    </section>
                    <section className={styles["navbar-section"]}>
                        <NavLink to={href(ROUTES.BRANCHES, { branch: 'all' })} className={location.pathname.startsWith("/branches") ? styles["link_active"] : ""}>Филиалы</NavLink>
                    </section>
                    <section className={styles["navbar-section"]}>
                        <NavLink to={ROUTES.ADMINPANEL} className={({ isActive }) => isActive ? styles["link_active"] : ""}>Администрирование</NavLink>
                    </section>
                    {/*<section class="navbar-section">
                                <router-link :to="'/common-docs-info'" class="link">Общие сведения о системе&nbsp;</router-link>
                            </section>

                            <section class="navbar-section" ref="selectorContainerDocs">
                                <p>Типы документов ▼&nbsp;</p>

                                <transition name="fade">
                                    <div v-if="isDocs" class="wiki-list-body">   
                                        <div class="wiki-list scrollable">
                                            <router-link v-for="doc in docs" :to='{path: "/docinfo/" + `${doc.id}`}' class="link">{{ doc.id }}. {{ doc.name }}</router-link>
                                        </div>
                                    </div>
                                </transition>
                            </section>

                            <section class="navbar-section">
                                <router-link to="/admin" class="link">Администрирование&nbsp;</router-link>
                            </section>

                            <section class="navbar-section" ref="selectorContainerDepartments">
                                <p>Настройки филиалов ▼&nbsp;</p>

                                <transition name="fade">
                                    <div v-if="isDepartments" class="wiki-list-body">   
                                        <div class="wiki-list scrollable">
                                            <router-link v-for="dep in settingsDepartment" :to='{path: dep.path }' class="link">{{ dep.name }}</router-link>
                                        </div>
                                    </div>
                                </transition>
                            </section>*/}
                </section>

                <section className={styles["end"]}>
                    {/*<img src="@/assets/VEDO-ico.svg" alt="">*/}
                </section>
            </div>
        </div>
    );
}
